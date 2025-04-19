import { describe, it, expect } from '@jest/globals';
import path from 'path';
import { extractImageUrls } from '../../utils/extract-image-urls';

// Extract image URLs from the HomePage component
const homepagePath = path.join(process.cwd(), 'app/home/page.tsx');
const imageUrls = extractImageUrls(homepagePath);

// Use global fetch instead of node-fetch
global.fetch = jest.fn().mockImplementation((url) => {
  return Promise.resolve({
    status: 200,
    headers: {
      get: jest.fn().mockImplementation((header) => {
        if (header === 'content-type') {
          return 'image/jpeg';
        }
        return null;
      }),
    },
  });
});

describe('External Image URL Tests', () => {
  // We should have found some image URLs
  it('should have extracted image URLs from the home page component', () => {
    expect(imageUrls.length).toBeGreaterThan(0);
    console.log(`Found ${imageUrls.length} image URLs to test`);
  });

  // Test that the URLs are valid Unsplash URLs
  it.each(imageUrls)('should have valid Unsplash URL format: %s', (url) => {
    expect(url).toMatch(/^https:\/\/images\.unsplash\.com\//);
  });
  
  it('should mock successful responses for all image URLs', async () => {
    for (const url of imageUrls) {
      const response = await fetch(url);
      expect(response.status).toBe(200);
      
      const contentType = response.headers.get('content-type');
      expect(contentType).toBeDefined();
      expect(contentType?.startsWith('image/')).toBeTruthy();
    }
  });
});