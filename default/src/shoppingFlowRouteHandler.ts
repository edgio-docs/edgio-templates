import { CACHE_PAGES } from './cache'
import { RouteHandler } from '@layer0/core/router/Router'
import { injectBrowserScript } from '@layer0/starter'

const handler: RouteHandler = async ({ cache, removeUpstreamResponseHeader, proxy }) => {
  cache(CACHE_PAGES)
  removeUpstreamResponseHeader('set-cookie') // The presence of a set-cookie header would prevent the response from being cached, so ensure set-cookie headers are removed.
  proxy('origin', { transformResponse: injectBrowserScript }) // inject browser.ts into the document returned from the origin
}

export default handler
