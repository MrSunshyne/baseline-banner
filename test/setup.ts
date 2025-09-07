import '@testing-library/jest-dom'
import { vi, beforeAll, afterAll } from 'vitest'

// Add globals for testing
declare global {
  namespace Vi {
    interface JestAssertion<T = any> {
      toBeInTheDocument(): T
    }
  }
}

// Mock fetch for API tests
global.fetch = vi.fn()

// Mock console.error to avoid noise in tests
const originalError = console.error
beforeAll(() => {
  console.error = vi.fn()
})

afterAll(() => {
  console.error = originalError
})
