import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@/components/theme-toggle';

// We need to mock the useTheme hook for basic tests
jest.mock('next-themes', () => {
  const originalModule = jest.requireActual('next-themes');
  const mockSetTheme = jest.fn();
  
  return {
    ...originalModule,
    useTheme: jest.fn().mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
      themes: ['light', 'dark', 'system'],
    }),
    // Keep the actual ThemeProvider for integration tests
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="theme-provider">{children}</div>,
  };
});

describe('Theme Switching', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });
  
  it('ThemeToggle calls setTheme with correct theme when clicked', () => {
    // Mock useState to ensure component is "mounted"
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [true, jest.fn()]);
    
    // Get the mock function for setTheme
    const { useTheme } = require('next-themes');
    const mockUseTheme = useTheme as jest.Mock;
    const mockSetTheme = mockUseTheme().setTheme;
    
    // Set initial theme to light
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
      themes: ['light', 'dark', 'system'],
    });
    
    // Render the component
    const { unmount } = render(<ThemeToggle />);
    
    // Find the button and click it
    const button = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(button);
    
    // Verify setTheme was called with 'dark' (since initial theme is 'light')
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
    
    // Cleanup previous render
    unmount();
    
    // Update the mock to return 'dark' theme for a new test
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
      themes: ['light', 'dark', 'system'],
    });
    
    // Mock useState again for the new render
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [true, jest.fn()]);
    
    // Re-render with dark theme
    render(<ThemeToggle />);
    
    // Find the button in the new render and click it
    const darkModeButton = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(darkModeButton);
    
    // Verify setTheme was called with 'light' (since theme is now 'dark')
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });
  
  it('shows the right icon based on the current theme', () => {
    // Get the mock function
    const { useTheme } = require('next-themes');
    const mockUseTheme = useTheme as jest.Mock;
    
    // Test with light theme
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: jest.fn(),
      resolvedTheme: 'light',
      themes: ['light', 'dark', 'system'],
    });
    
    // Mock useState to ensure component is "mounted"
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [true, jest.fn()]);
    
    // Render in light mode
    const { unmount } = render(<ThemeToggle />);
    
    // In light mode, we should see the moon icon (dark mode toggle)
    const moonPath = document.querySelector('path[d^="M21.752 15.002"]');
    expect(moonPath).toBeInTheDocument();
    
    // Clean up
    unmount();
    
    // Test with dark theme
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: jest.fn(),
      resolvedTheme: 'dark',
      themes: ['light', 'dark', 'system'],
    });
    
    // Mock useState again for the new render
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [true, jest.fn()]);
    
    // Re-render with dark theme
    render(<ThemeToggle />);
    
    // In dark mode, we should see the sun icon (light mode toggle)
    const sunPath = document.querySelector('path[d^="M12 3v2.25m6.364"]');
    expect(sunPath).toBeInTheDocument();
  });
});