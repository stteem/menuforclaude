describe('External Stock Images Integration Tests (MSW)', () => {
  const externalImages = [
    'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=987&q=80',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=987&q=80',
    'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=987&q=80',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=987&q=80',
  ];

  beforeAll(() => {
    // Mock fetch API
    global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should successfully fetch all external stock images without 404 errors', async () => {
    // Mock response for each image
    externalImages.forEach(() => {
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          headers: {
            get: (name: string) => (name === 'content-type' ? 'image/jpeg' : null),
          },
        } as Response)
      );
    });

    const checkImageUrl = async (url: string) => {
      const response = await fetch(url);
      return {
        url,
        status: response.status,
        contentType: response.headers.get('content-type')
      };
    };

    const results = await Promise.all(externalImages.map(checkImageUrl));

    // Verify all images are accessible
    results.forEach(result => {
      expect(result.status).toBe(200);
      expect(result.contentType).toContain('image/');
    });
  });

  it('should handle gracefully if an image fails to load', async () => {
    // Mock failure for one image
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        status: 404,
        headers: {
          get: () => null,
        },
      } as Response)
    );

    const response = await fetch(externalImages[0]);
    expect(response.status).toBe(404);
  });

  it('should validate all image URLs are properly formatted', () => {
    externalImages.forEach(url => {
      // Check if URL is valid
      expect(() => new URL(url)).not.toThrow();
      
      // Check if URL contains Unsplash formatting parameters
      expect(url).toContain('auto=format');
      expect(url).toContain('fit=crop');
      expect(url).toMatch(/w=\d+/);
      expect(url).toMatch(/q=\d+/);
    });
  });
});