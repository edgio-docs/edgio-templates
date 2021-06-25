import routes from '../routes';
import { runRoute, backendHost, appHost } from '@layer0/core/test-utils';
import nock from 'nock';

describe('routes', () => {
  describe('rest api', () => {
    beforeEach(() => {
      const body = `<!DOCTYPE html><html><body>Test</body></html>`;

      nock(`https://${backendHost('commerce')}`)
        .get('/rest/v2/foo')
        .reply(200, body);
    });
    it('should cache rest API requests at the edge, service worker, and the browser', async () => {
      const result = await runRoute(routes, '/rest/v2/foo');
      expect(result).toBeCachedByTheEdgeFor(60 * 60 * 24);
      expect(result).toBeServedStaleFor(60 * 60 * 24);
      expect(result).toBeCachedByTheBrowser(60 * 60 * 24);
      expect(result).toBeCachedByTheServiceWorkerFor(60 * 60 * 24);
    });
  });

  describe('medias', () => {
    beforeEach(() => {
      const body = `<style>body { color: red; }</style>`;

      nock(`https://${backendHost('commerce')}`)
        .get('/medias/style.css')
        .reply(200, body);
    });

    it('should cache the media assets at the edge and browser', async () => {
      const result = await runRoute(routes, '/medias/style.css');
      expect(result).toBeCachedByTheEdgeFor(60 * 60 * 24 * 365 * 10);
      expect(result).toBeServedStaleFor(60 * 60 * 24);
      expect(result).toBeCachedByTheBrowser(60 * 60 * 24);
      expect(result).not.toBeCachedByTheServiceWorker();
    });

    it('should return content from the origin', async () => {
      const result = await runRoute(routes, '/medias/style.css');

      expect(result).toHaveBody('<style>body { color: red; }</style>');
    });
  });

  describe('products', () => {
    beforeEach(() => {
      const body = `<!DOCTYPE html><html><body>Test</body></html>`;

      nock(`http://${appHost()}`).get('/products/p1').reply(200, body);
    });

    it('should cache the product page at the edge, but not the browser', async () => {
      const result = await runRoute(routes, '/products/p1');
      expect(result).toBeCachedByTheEdgeFor(60 * 60 * 24 * 365);
      expect(result).toBeServedStaleFor(60 * 60 * 24 * 365);
      expect(result).not.toBeCachedByTheBrowser();
      expect(result).not.toBeCachedByTheServiceWorker();
    });
  });
});
