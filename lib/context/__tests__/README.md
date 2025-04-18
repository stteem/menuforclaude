# Theme Context Tests

This directory contains tests for the `theme-context.tsx` component that handles dark/light mode functionality.

## Test Files

1. `theme-context.test.tsx` - Tests for the ThemeProvider and useTheme hook
   - Tests system preference detection
   - Tests localStorage override
   - Tests theme toggling functionality
   - Tests error handling when hook is used outside provider
   
## Features Tested

- System dark mode preference detection
- localStorage persistence of theme preference
- Theme toggling between light and dark modes
- Document class updates (adding/removing 'dark' class)
- Error handling when using hook outside provider

## Running Tests

```bash
# Run tests
pnpm test lib/context/__tests__/theme-context.test.tsx
```

The tests mock `window.matchMedia` and `localStorage` to simulate different system preferences and stored values.