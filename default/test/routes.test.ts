import routes from '../src/routes'
import { runRoute, backendHost } from '@layer0/core/test-utils'
import nock from 'nock'

describe('routes', () => {
  describe('home', () => {
    it('should cache the homepage at the edge and service worker, but not the browser', async () => {
      const result = await runRoute(routes, '/')
      expect(result).toBeCachedByTheEdgeFor(3600)
      expect(result).toBeServedStale()
      expect(result).not.toBeCachedByTheBrowser()
      expect(result).toBeCachedByTheServiceWorkerFor(3600)
    })

    it('should return content from the origin', async () => {
      const result = await runRoute(routes, '/')
      const body = `<!DOCTYPE html><html><body>Test</body></html>`

      nock(`https://${backendHost('origin')}`)
        .get('/')
        .reply(200, body)

      expect(result).toHaveBody(body)
    })
  })
})
