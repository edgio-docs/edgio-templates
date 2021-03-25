import 'zone.js/dist/zone-node';

import * as express from 'express';
import { join } from 'path';
import * as http from 'http'
import * as https from 'https'

import { createNamespace } from 'cls-hooked'
const ns = createNamespace('app')

const originalHttpRequest = http.request
const originalHttpsRequest = https.request

const upstreamTracker = (req, res, next) => {
  ns.bindEmitter(req)
  ns.bindEmitter(res)
  ns.run(() => {
    patchHttp()
    const requests = new Set()
    ns.set("requests", requests);
    next();
  });
};

const patchHttpModule = (module, orig) => {
  module.request = ns.bind(function(...args) {
    const requestsSet = ns.get('requests')
    if (requestsSet && args[0]) {
      let path
      const options = args[0]
      if (typeof options === 'string') {
        path = options
      } else {
        path = options.path
      }
      const newSet = requestsSet.add(path)
      ns.set('requests', newSet)
    }
    return orig(...args)
  })
}

const patchHttp = () => {
  patchHttpModule(http, originalHttpRequest)
  patchHttpModule(https, originalHttpsRequest)
}

// Express server
const app = express();
app.use(upstreamTracker);

const PORT = process.env.PORT || 4200;
const DIST_FOLDER = join(process.cwd(), 'dist/xdn-spartacus');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP,
  ngExpressEngine,
  provideModuleMap,
} = require('./dist/xdn-spartacus-server/main');

app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)],
  })
);

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

app.get(
  '*.*',
  express.static(DIST_FOLDER, {
    maxAge: '1y',
  })
);

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  const callback = (err, html) => {
    const requestsArray = Array.from(ns.get("requests"))
    let header = ''
    requestsArray.forEach(request => {
      header += (request + ';')
    })
    res.set('x-xdn-backend-requests', header)

    res.send(html)
  }
  res.render('index', { req }, ns.bind(callback));
});

export default app
