import { CACHE_PAGES } from './cache'
import { RouteHandler } from '@layer0/core/router/Router'

const handler: RouteHandler = async ({
  cache,
  removeResponseHeader,
  updateResponseHeader,
  proxy,
}) => {
  cache(CACHE_PAGES)
  removeResponseHeader('set-cookie')
  proxy('origin')
  updateResponseHeader('location', /https:\/\/moovdemo.myshopify.com\//gi, '/') // convert absolute redirects to origin to relative so that the user isn't transferred to the origin.
}

export default handler
