import { skipWaiting, clientsClaim } from 'workbox-core'
import { Prefetcher, prefetch } from '@layer0/prefetch/sw'
import DeepFetchPlugin, { DeepFetchCallbackParam } from '@layer0/prefetch/sw/DeepFetchPlugin'
import cacheHost from './cacheHost'

skipWaiting()
clientsClaim()

new Prefetcher({
  cacheHost,
  plugins: [
    new DeepFetchPlugin([
      {
        selector: 'img.product-featured-media',
        maxMatches: 1,
        attribute: 'src',
        as: 'image',
      },
      {
        selector: 'img.grid-view-item__image',
        maxMatches: 4,
        attribute: 'src',
        as: 'image',
        callback: deepFetchResponsiveImages,
      },
    ]),
  ],
})
  .route()
  .cache(/^https:\/\/cdn\.shopify\.com\/.*/)

function deepFetchResponsiveImages({ $el, el, $ }: DeepFetchCallbackParam) {
  const urlTemplate = $el.attr('data-src')
  const dataWidths = $el.attr('data-widths')

  if (dataWidths && urlTemplate) {
    const widths = JSON.parse(dataWidths)

    for (let width of widths.slice(0, 2)) {
      const url = urlTemplate?.replace(/\{width\}/, width)
      prefetch(url, 'image')
    }
  }
}
