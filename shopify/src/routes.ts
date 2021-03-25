import { Router } from '@layer0/core/router'
import { CACHE_ASSETS, CACHE_SERVICE_WORKER } from './cache'
import shoppingFlowRouteHandler from './shoppingFlowRouteHandler'

export default new Router()
  .get('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('dist/service-worker.js')
  })
  .match('/:path*', ({ setResponseHeader }) => {
    setResponseHeader('Access-Control-Allow-Origin', '*')
  })
  .get('/', shoppingFlowRouteHandler)
  .get('/collections/:path*', shoppingFlowRouteHandler)
  .get('/products/:path*', shoppingFlowRouteHandler)
  .get('/main.js', ({ serveStatic, cache }) => {
    cache(CACHE_ASSETS)
    return serveStatic('dist/browser.js')
  })
  .get('/install.js', ({ serveStatic, cache }) => {
    cache(CACHE_ASSETS)
    serveStatic('dist/install.js')
  })
  .get('/content/:path*', ({ proxy }) => {
    proxy('origin', { path: '/:path*' })
  })
  .fallback(({ proxy }) => {
    proxy('origin')
  })
