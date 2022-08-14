/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'global.d.ts',
    'src/alpine.ts'
  ],
  coverageProvider: 'v8',
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '@tests/(.*)$': '<rootDir>/tests/$1'
  },
  preset: 'ts-jest',
  roots: [
    '<rootDir>',
    'tests',
    'src'
  ],
  setupFilesAfterEnv: ['jest-extended/all'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/tests/**/*.spec.ts']
}
