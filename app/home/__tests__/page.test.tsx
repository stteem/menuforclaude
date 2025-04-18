import React from 'react';
import { render } from '@testing-library/react';
import HomePage from '../page';

// Mock the ThemeToggle component
jest.mock('@/components/theme-toggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle Mock</div>
}));

// Mock the Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock the Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('HomePage', () => {
  beforeAll(() => {
    // Mock environment variables
    process.env.NODE_ENV = 'test';
  });

  it('matches snapshot in development environment', () => {
    process.env.NODE_ENV = 'development';
    const { container } = render(<HomePage />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot in production environment', () => {
    process.env.NODE_ENV = 'production';
    const { container } = render(<HomePage />);
    expect(container).toMatchSnapshot();
  });

  it('renders the correct login URL in development environment', () => {
    process.env.NODE_ENV = 'development';
    const { getAllByRole } = render(<HomePage />);
    const loginLinks = getAllByRole('link', { name: /login/i });
    expect(loginLinks[0]).toHaveAttribute('href', 'http://app.localhost:3000/login');
  });

  it('renders the correct login URL in production environment', () => {
    process.env.NODE_ENV = 'production';
    const { getAllByRole } = render(<HomePage />);
    const loginLinks = getAllByRole('link', { name: /login/i });
    expect(loginLinks[0]).toHaveAttribute('href', 'https://app.kpaly.com/login');
  });

  it('renders all main sections correctly', () => {
    const { container } = render(<HomePage />);
    
    // Check for header
    expect(container.querySelector('header')).toBeInTheDocument();
    
    // Check for hero section
    expect(container.querySelector('section')).toBeInTheDocument();
    
    // Check for Footer
    expect(container.querySelector('footer')).toBeInTheDocument();
  });
});