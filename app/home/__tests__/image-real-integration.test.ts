// Real integration tests for external stock images
import 'isomorphic-fetch';

const externalImages = [
  'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=987&q=80',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=987&q=80',
  'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=987&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=987&q=80',
];

describe('External Stock Images Real Integration Tests', () => {
  // Set a longer timeout for network requests
  jest.setTimeout(15000);

  it('should successfully fetch all external stock images from Unsplash', async () => {
    const checkImageUrl = async (url: string) => {
      try {
        const response = await fetch(url);
        return {
          url,
          status: response.status,
          ok: response.ok,
          contentType: response.headers.get('content-type'),
          statusText: response.statusText
        };
      } catch (error) {
        return {
          url,
          status: -1,
          ok: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    };

    const results = await Promise.all(externalImages.map(checkImageUrl));

    // Log results for debugging
    console.log('External image status results:', results);

    // Verify all images are accessible
    results.forEach(result => {
      // Unsplash images should return 200 OK
      expect(result.status).toBe(200);
      expect(result.ok).toBe(true);
      expect(result.contentType).toContain('image/');
    });
  });

  it('should verify image cache headers are properly set', async () => {
    const response = await fetch(externalImages[0]);
    
    // Unsplash should have proper caching headers for performance
    expect(response.headers.get('cache-control')).toBeTruthy();
    expect(response.headers.get('etag') || response.headers.get('last-modified')).toBeTruthy();
  });

  it('should verify all images have proper size parameters', () => {
    externalImages.forEach(url => {
      const urlObj = new URL(url);
      expect(urlObj.searchParams.has('w')).toBe(true);
      expect(parseInt(urlObj.searchParams.get('w') || '0')).toBeGreaterThan(0);
    });
  });
});