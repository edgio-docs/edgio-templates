import { Router } from '@layer0/core/router'
import { starterRoutes } from '@layer0/starter'
import { CACHE_ASSETS } from './cache'
import shoppingFlowRouteHandler from './shoppingFlowRouteHandler'

export default new Router()
  .use(starterRoutes)
  // example routes for cacheable pages:
  .get('/', shoppingFlowRouteHandler)
  .get('/collections/:path*', shoppingFlowRouteHandler)
  .get('/products/:path*', shoppingFlowRouteHandler)
  // example route for cacheable assets:
  .match('/images/:path*', ({ cache, proxy }) => {
    cache(CACHE_ASSETS)
    return proxy('origin')
  })
  // fallback route for all other requests:
  .fallback(({ proxy }) => {
    proxy('origin')
  })
