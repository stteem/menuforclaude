import { extractImageUrls } from './extract-image-urls';
import path from 'path';
import fs from 'fs';

// Mock the fs module
jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));

describe('extractImageUrls', () => {
  it('should extract Unsplash URLs from content', () => {
    // Setup mock data
    const mockContent = `
      <img src="https://images.unsplash.com/photo-123" />
      <img src="https://images.unsplash.com/photo-456" />
      <img src="https://example.com/other-image.jpg" />
    `;
    
    // Mock fs.readFileSync to return our mock content
    (fs.readFileSync as jest.Mock).mockReturnValue(mockContent);
    
    // Call the function with a fake path
    const filePath = path.join(process.cwd(), 'fake-file.tsx');
    const urls = extractImageUrls(filePath);
    
    // Verify the results
    expect(urls).toHaveLength(2);
    expect(urls).toContain('https://images.unsplash.com/photo-123');
    expect(urls).toContain('https://images.unsplash.com/photo-456');
    expect(urls).not.toContain('https://example.com/other-image.jpg');
  });
});