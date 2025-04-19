import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';
import 'whatwg-fetch';
import 'isomorphic-fetch';

// Polyfill for TextEncoder/TextDecoder in Node.js environment
// @ts-ignore - These types don't match exactly but the functionality works for tests
global.TextEncoder = TextEncoder;
// @ts-ignore - These types don't match exactly but the functionality works for tests
global.TextDecoder = TextDecoder;

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
  }),
}));

// Mock next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(
    ({ src, alt, width, height, className }) => {
      return {
        type: 'img',
        props: {
          src,
          alt,
          width,
          height,
          className,
          'data-testid': 'next-image',
        },
      };
    }
  ),
}));

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Mock environment variables
process.env = {
  ...process.env,
  NODE_ENV: 'test',
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock window.matchMedia
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