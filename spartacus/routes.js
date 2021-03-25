// This file was automatically added by layer0 deploy.
// You should commit this file to source control.

const { Router } = require("@layer0/core/router");
const createAngularPlugin = require("@layer0/angular/router/createAngularPlugin");

const PAGE_TTL = 60 * 60 * 24;
const FAR_FUTURE_TTL = 60 * 60 * 24 * 365 * 10;

module.exports = (app) => {
  const { angularMiddleware } = createAngularPlugin(app);
  return new Router()
    .match("/rest/v2/:path*", ({ cache, proxy }) => {
      cache({
        browser: {
          maxAgeSeconds: PAGE_TTL,
          serviceWorkerSeconds: PAGE_TTL,
        },
        edge: {
          maxAgeSeconds: PAGE_TTL,
          staleWhileRevalidateSeconds: PAGE_TTL,
        },
      });
      return proxy("commerce");
    })
    .match("/medias/:path*", ({ cache, proxy }) => {
      cache({
        browser: {
          maxAgeSeconds: PAGE_TTL,
          serviceWorkerSeconds: PAGE_TTL,
        },
        edge: {
          maxAgeSeconds: FAR_FUTURE_TTL,
          staleWhileRevalidateSeconds: 60 * 60 * 24,
        },
      });
      return proxy("commerce");
    })
    .match("/Open-Catalogue/:path*", ({ cache }) => {
      cache({
        browser: {
          maxAgeSeconds: PAGE_TTL,
          serviceWorkerSeconds: PAGE_TTL,
        },
        edge: {
          maxAgeSeconds: PAGE_TTL,
          staleWhileRevalidateSeconds: PAGE_TTL,
        },
      });
    })
    .match("/product/:path*", ({ cache }) => {
      cache({
        browser: {
          maxAgeSeconds: PAGE_TTL,
          serviceWorkerSeconds: PAGE_TTL,
        },
        edge: {
          maxAgeSeconds: PAGE_TTL,
          staleWhileRevalidateSeconds: PAGE_TTL,
        },
      });
    })
    .use(angularMiddleware);
};
