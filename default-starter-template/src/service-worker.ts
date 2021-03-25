import { skipWaiting, clientsClaim } from 'workbox-core'
import { Prefetcher } from '@layer0/prefetch/sw'

skipWaiting()
clientsClaim()

new Prefetcher().route()
