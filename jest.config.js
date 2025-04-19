/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest'],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^next/font/(.*)$': '<rootDir>/__mocks__/next/font/$1.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transformIgnorePatterns: [
    '/node_modules/(?!node-fetch)/',
  ],
  testMatch: [
    "**/__tests__/**/*.(test|spec).(ts|tsx|js)",
  ],
};

module.exports = config;