import { skipWaiting, clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import { Prefetcher } from '@xdn/prefetch/sw'
import DeepFetchPlugin from '@xdn/prefetch/sw/DeepFetchPlugin'

declare const self: any;

skipWaiting()
clientsClaim()
precacheAndRoute(self.__WB_MANIFEST || [])

new Prefetcher({
  plugins: [
    new DeepFetchPlugin([
      {
        selector: 'cx-media > img',
        maxMatches: 2,
        as: 'image',
        attribute: 'src'
      }
    ])
  ]
}).route()
