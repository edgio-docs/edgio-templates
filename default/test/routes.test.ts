import routes from '../src/routes'
import { runRoute, backendHost } from '@layer0/core/test-utils'
import nock from 'nock'

describe('routes', () => {
  describe('home', () => {
    beforeEach(() => {
      const body = `<!DOCTYPE html><html><body>Test</body></html>`

      nock(`https://${backendHost('origin')}`)
        .get('/')
        .reply(200, body)
    })
    it('should cache the homepage at the edge and service worker, but not the browser', async () => {
      const result = await runRoute(routes, '/')
      expect(result).toBeCachedByTheEdgeFor(3600)
      expect(result).not.toBeServedStale()
      expect(result).not.toBeCachedByTheBrowser()
      expect(result).toBeCachedByTheServiceWorkerFor(3600)
    })

    it('should return content from the origin', async () => {
      const result = await runRoute(routes, '/')

      // Our route transforms the response to inject a script so only match
      // the HTML body
      expect(result).toHaveBody(/<!DOCTYPE html><html>.*<body>Test<\/body><\/html>/)
    })
  })

  describe('collections', () => {
    beforeEach(() => {
      const body = `<!DOCTYPE html><html><body>Test</body></html>`

      nock(`https://${backendHost('origin')}`)
        .get('/collections/c1')
        .reply(200, body)
    })

    it('should cache the collections page at the edge and service worker, but not the browser', async () => {
      const result = await runRoute(routes, '/collections/c1')
      expect(result).toBeCachedByTheEdgeFor(3600)
      expect(result).not.toBeServedStale()
      expect(result).not.toBeCachedByTheBrowser()
      expect(result).toBeCachedByTheServiceWorkerFor(3600)
    })

    it('should return content from the origin', async () => {
      const result = await runRoute(routes, '/collections/c1')

      // Our route transforms the response to inject a script so only match
      // the HTML body
      expect(result).toHaveBody(/<!DOCTYPE html><html>.*<body>Test<\/body><\/html>/)
    })
  })

  describe('product', () => {
    beforeEach(() => {
      const body = `<!DOCTYPE html><html><body>Test</body></html>`

      nock(`https://${backendHost('origin')}`)
        .get('/products/p1')
        .reply(200, body)
    })
    it('should cache the product page at the edge and service worker, but not the browser', async () => {
      const result = await runRoute(routes, '/products/p1')
      expect(result).toBeCachedByTheEdgeFor(3600)
      expect(result).not.toBeServedStale()
      expect(result).not.toBeCachedByTheBrowser()
      expect(result).toBeCachedByTheServiceWorkerFor(3600)
    })

    it('should return content from the origin', async () => {
      const result = await runRoute(routes, '/products/p1')

      // Our route transforms the response to inject a script so only match
      // the HTML body
      expect(result).toHaveBody(/<!DOCTYPE html><html>.*<body>Test<\/body><\/html>/)
    })
  })

  describe('fallback', () => {
    it('should fallback and proxy to the origin', async () => {
      nock(`https://${backendHost('origin')}`)
        .get('/unknown')
        .reply(200)

      const result = await runRoute(routes, '/unknown')

      expect(result).toHaveBody('')
    })
  })
})
