import { skipWaiting, clientsClaim } from 'workbox-core'
import { Prefetcher } from '@xdn/prefetch/sw'

skipWaiting()
clientsClaim()

new Prefetcher().route()
