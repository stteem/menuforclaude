import React from 'react';
import { render, act, renderHook } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../theme-context';

describe('ThemeProvider', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Clear document classes
    document.documentElement.classList.remove('dark');
    
    // Mock matchMedia to always return light theme by default
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false, // Default to light mode
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should use system preference when no theme in localStorage', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    // Test with system dark mode
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
      })),
    });

    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should use stored theme from localStorage over system preference', () => {
    localStorage.setItem('theme', 'light');
    
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should toggle theme and update localStorage and document classes', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });
    
    // Initial state should be light (based on default matchMedia mock)
    expect(result.current.theme).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    
    // Toggle to dark
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    // Toggle back to light
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.theme).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should throw error when useTheme is used outside of ThemeProvider', () => {
    // Attempt to use the hook without a provider
    let testError: any;
    
    // Create a component that uses the hook
    const TestComponent = () => {
      try {
        useTheme();
        return null;
      } catch (error) {
        testError = error;
        throw error;
      }
    };

    // Suppress console error for expected failure
    const consoleError = console.error;
    console.error = jest.fn();

    // Render the component and expect it to throw
    expect(() => {
      render(<TestComponent />);
    }).toThrow();

    // Check that the correct error was thrown
    expect(testError.message).toBe('useTheme must be used within a ThemeProvider');
    
    // Restore console.error
    console.error = consoleError;
  });
});