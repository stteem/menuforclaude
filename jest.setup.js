// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import 'whatwg-fetch'
import { TextEncoder, TextDecoder } from 'util';

// Mock the Response constructor which is needed for MSW
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock BroadcastChannel for MSW
global.BroadcastChannel = jest.fn().mockImplementation(() => ({
  postMessage: jest.fn(),
  close: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  onmessage: null,
  onmessageerror: null
}));

// Mocking some Next.js features
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, priority, fill, style, className, width, height, ...props }) => {
    // Forward only standard HTML attributes to img element
    return (
      <img 
        src={src} 
        alt={alt} 
        width={width}
        height={height}
        className={className}
        style={style}
        data-testid="mock-image"
        data-priority={priority?.toString()}
        data-fill={fill?.toString()}
        {...props}
      />
    );
  },
}))

// Mock environment variables
process.env.NODE_ENV = 'test';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});