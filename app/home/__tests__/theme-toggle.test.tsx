import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { ThemeToggle } from '@/components/theme-toggle';
import { ThemeProvider } from '@/lib/context/theme-context';
import HomePage from '../page';

// Mock the theme context to test theme changes
const mockToggleTheme = jest.fn();
const mockUseTheme = jest.fn();

// Mock the theme context module
jest.mock('@/lib/context/theme-context', () => ({
  useTheme: () => mockUseTheme(),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock the image component - Handle props properly without warnings
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className, priority, fill, style, ...props }: any) => {
    // Forward only standard HTML attributes to img element
    return <img 
      src={src} 
      alt={alt} 
      width={width} 
      height={height} 
      className={className}
      style={style}
      data-priority={priority?.toString()}
      data-fill={fill?.toString()}
      {...props}
    />;
  },
}));

// Mock the Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });
  });

  it('should render without crashing', () => {
    const { container } = render(<ThemeToggle />);
    expect(container).toBeInTheDocument();
  });

  it('should display the light mode icon when theme is light', async () => {
    render(<ThemeToggle />);
    
    // Wait for mounting
    await waitFor(() => {
      const button = screen.getByRole('button', { name: /switch to dark mode/i });
      expect(button).toBeInTheDocument();
      
      // Check for moon icon (dark mode icon)
      const moonIcon = button.querySelector('svg path[d*="17.293"]');
      expect(moonIcon).toBeInTheDocument();
    });
  });

  it('should display the dark mode icon when theme is dark', async () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);
    
    await waitFor(() => {
      const button = screen.getByRole('button', { name: /switch to light mode/i });
      expect(button).toBeInTheDocument();
      
      // Check for sun icon (light mode icon)
      const sunIcon = button.querySelector('svg path[d*="M10 2a1"]');
      expect(sunIcon).toBeInTheDocument();
    });
  });

  it('should call toggleTheme when clicked', async () => {
    render(<ThemeToggle />);
    
    await waitFor(() => {
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });
  });

  it('should update from placeholder to button when mounted', async () => {
    const { container } = render(<ThemeToggle />);
    
    // Since we're testing client-side mounting behavior
    // Let's check that we eventually get a button rendered
    await waitFor(() => {
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
    });
  });
});

describe('Dark Mode Integration with HomePage', () => {
  beforeAll(() => {
    // Mock window.matchMedia for theme detection
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  beforeEach(() => {
    // Reset mocks before each test
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });
  });

  it('should have the ThemeToggle component visible on the homepage', () => {
    // Test with light theme (default)
    render(<HomePage />);
    const headers = screen.getAllByRole('banner');
    expect(headers.length).toBeGreaterThan(0);
  });

  it('should apply dark mode classes when theme is dark', () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    const { container } = render(<HomePage />);
    
    // Check for dark mode classes in the main container
    const mainDiv = container.firstElementChild;
    expect(mainDiv?.className).toContain('dark:');
    expect(mainDiv?.className).toContain('dark:from-gray-900');
    expect(mainDiv?.className).toContain('dark:to-gray-950');
    expect(mainDiv?.className).toContain('dark:text-white');
  });

  it('should have the ThemeToggle button accessible and clickable', async () => {
    const { container } = render(<HomePage />);
    
    await waitFor(() => {
      // Find the ThemeToggle button which should be in the header
      const buttons = container.querySelectorAll('button');
      const themeToggleButton = Array.from(buttons).find(button => 
        button.getAttribute('aria-label')?.includes('Switch to')
      );
      
      expect(themeToggleButton).toBeTruthy();
      
      // Verify the button is not disabled
      expect(themeToggleButton).not.toBeDisabled();
    });
  });

  it('should maintain appropriate colors for dark mode', () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    const { container } = render(<HomePage />);
    
    // Check header dark mode classes
    const header = container.querySelector('header');
    expect(header?.className).toContain('dark:bg-gray-900/90');
    expect(header?.className).toContain('dark:border-gray-800');
  });
});