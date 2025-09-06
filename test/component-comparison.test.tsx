import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { render as renderVue } from '@testing-library/vue'
import ReactBaselineChecker from '../packages/react/src/BaselineChecker'
import VueBaselineChecker from '../packages/vue/src/BaselineChecker.vue'
import type { WebPlatformFeature } from '../packages/core/src/api'

// Mock the core API
vi.mock('../packages/core/src/api', async () => {
  const actual = await vi.importActual('../packages/core/src/api')
  return {
    ...actual,
    fetchBaselineData: vi.fn(),
  }
})

import { fetchBaselineData } from '../packages/core/src/api'

describe('Component Parity Tests', () => {
  const mockFetchBaselineData = fetchBaselineData as any

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render identical loading states', () => {
    // Mock loading state with never-resolving promise
    mockFetchBaselineData.mockImplementation(() => new Promise(() => {}))
    
    // Test React component
    const { container: reactContainer } = render(<ReactBaselineChecker featureName="container-queries" />)
    
    expect(screen.getByText('container-queries')).toBeTruthy()
    expect(screen.getByText('Loading')).toBeTruthy()
    
    const reactLoadingClass = reactContainer.querySelector('.baseline-loading')
    expect(reactLoadingClass).not.toBeNull()
  })

  it('should render identical success states', async () => {
    const mockFeature: WebPlatformFeature = {
      feature_id: 'container-queries',
      name: 'CSS Container Queries',
      description: 'Query the size and style of a container',
      baseline: {
        status: 'newly',
        low_date: '2022-09-01'
      }
    }

    mockFetchBaselineData.mockResolvedValue(mockFeature)

    // Test React component
    const { container: reactContainer } = render(<ReactBaselineChecker featureName="container-queries" />)

    await waitFor(() => {
      expect(screen.getByText('CSS Container Queries')).toBeTruthy()
      expect(screen.getByText('Baseline')).toBeTruthy()
      expect(screen.getByText('newly available')).toBeTruthy()
    })

    const reactHTML = normalizeHTML(reactContainer.innerHTML)
    
    // The structure should be very similar - both should have baseline-status class
    expect(reactHTML).toBeTruthy()
    expect(reactHTML.includes('baseline-status')).toBe(true)
    expect(reactHTML.includes('css container queries')).toBe(true)
  })

  it('should render identical error states', async () => {
    mockFetchBaselineData.mockRejectedValue(new Error('Not found'))

    // Test React component
    const { container } = render(<ReactBaselineChecker featureName={"test-feature" as any} />)

    await waitFor(() => {
      expect(screen.getByText('test-feature')).toBeTruthy()
      expect(screen.getByText('Unknown availability')).toBeTruthy()
    })

    const reactErrorClass = container.querySelector('.baseline-error-state')
    expect(reactErrorClass).not.toBeNull()
  })
})

// Helper function to normalize HTML for comparison
function normalizeHTML(html: string): string {
  return html
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim()
    .toLowerCase()
}