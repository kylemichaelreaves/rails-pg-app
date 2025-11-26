// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/vitest';
import {setupServer} from 'msw/node'
import {handlers} from './testUtils'
import {afterAll, afterEach, beforeAll} from 'vitest'

export const server = setupServer(...handlers)

// Establish API mocking before all tests.
beforeAll(() => server.listen())
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    constructor() {
    }

    disconnect() {
    }

    observe() {
    }

    unobserve() {
    }
} as any;

