import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@/components/theme-toggle';

// Mock the useTheme hook from next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light', // default theme
    setTheme: jest.fn(),
  }),
}));

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('renders a loading state before mounting', () => {
    // Mock useState for unmounted state
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [false, jest.fn()]);
    
    render(<ThemeToggle />);
    
    // Check that the loading div is shown
    const loadingElement = screen.getByTestId('theme-toggle-loader');
    expect(loadingElement).toBeInTheDocument();
  });

  it('renders the light theme icon when theme is dark', () => {
    // Override the mock to return dark theme
    jest.spyOn(require('next-themes'), 'useTheme').mockImplementation(() => ({
      theme: 'dark',
      setTheme: jest.fn(),
    }));
    
    // Mock the mounting state
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [true, jest.fn()]);
    
    render(<ThemeToggle />);
    
    // Check that the toggle button is shown
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    expect(toggleButton).toBeInTheDocument();
    
    // In dark mode, we should see the sun icon (light mode toggle)
    const sunPath = document.querySelector('path[d^="M12 3v2.25m6.364"]');
    expect(sunPath).toBeInTheDocument();
  });

  it('renders the dark theme icon when theme is light', () => {
    // Override the mock to return light theme
    jest.spyOn(require('next-themes'), 'useTheme').mockImplementation(() => ({
      theme: 'light',
      setTheme: jest.fn(),
    }));
    
    // Mock the mounting state
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [true, jest.fn()]);
    
    render(<ThemeToggle />);
    
    // Check that the toggle button is shown
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    expect(toggleButton).toBeInTheDocument();
    
    // In light mode, we should see the moon icon (dark mode toggle)
    const moonPath = document.querySelector('path[d^="M21.752 15.002"]');
    expect(moonPath).toBeInTheDocument();
  });

  it('toggles the theme when clicked', () => {
    // Create a mock for setTheme function
    const setThemeMock = jest.fn();
    
    // Override the mock to include our mock function
    jest.spyOn(require('next-themes'), 'useTheme').mockImplementation(() => ({
      theme: 'light',
      setTheme: setThemeMock,
    }));
    
    // Mock the mounting state
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [true, jest.fn()]);
    
    render(<ThemeToggle />);
    
    // Find the toggle button and click it
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(toggleButton);
    
    // Check that setTheme was called with 'dark'
    expect(setThemeMock).toHaveBeenCalledWith('dark');
  });
});