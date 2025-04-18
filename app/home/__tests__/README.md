# Home Page Tests

This directory contains tests for the `app/home/page.tsx` component.

## Test Files

1. `page.test.tsx` - Snapshot tests for the HomePage component
   - Tests render in both development and production environments
   - Verifies correct login URLs for different environments
   - Ensures main sections are rendered correctly

2. `image-integration.test.ts` - Integration tests for external stock images
   - Uses MSW (Mock Service Worker) to mock external image requests
   - Verifies that all external images return 200 status codes
   - Tests graceful error handling
   - Validates image URL formatting parameters

3. `image-real-integration.test.ts` - Real network integration tests
   - Actually fetches external stock images from Unsplash
   - Verifies image availability
   - Checks for proper caching headers
   - Validates URL parameters

4. `theme-toggle.test.tsx` - Tests for dark/light mode functionality
   - Tests ThemeToggle component rendering and interactions
   - Verifies correct icon display for light/dark modes
   - Tests theme switching functionality
   - Verifies dark mode classes are applied correctly
   - Tests integration with HomePage component

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run specific test files
pnpm test app/home/__tests__/page.test.tsx
pnpm test app/home/__tests__/image-integration.test.ts
pnpm test app/home/__tests__/image-real-integration.test.ts
pnpm test app/home/__tests__/theme-toggle.test.tsx
```

## Notes

- MSW is used to intercept network requests in tests
- The tests use Jest's snapshot feature for UI testing
- Real integration tests should be run sparingly as they make actual network requests
- Theme tests mock various browser APIs like `window.matchMedia` and `localStorage`