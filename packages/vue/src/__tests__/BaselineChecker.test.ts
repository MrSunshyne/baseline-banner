import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/vue'
import BaselineChecker from '../BaselineChecker.vue'
import type { WebPlatformFeature } from '../../../core/src/api'

// Mock the core API
vi.mock('../../../core/src/api', async () => {
  const actual = await vi.importActual('../../../core/src/api')
  return {
    ...actual,
    fetchBaselineData: vi.fn(),
  }
})

import { fetchBaselineData } from '../../../core/src/api'

describe('BaselineChecker (Vue)', () => {
  const mockFetchBaselineData = fetchBaselineData as any

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render loading state initially', () => {
    mockFetchBaselineData.mockImplementation(() => new Promise(() => {}))

    render(BaselineChecker, {
      props: { featureName: 'flexbox' }
    })

    expect(screen.getByText('Checking baseline status...')).toBeInTheDocument()
  })

  it('should render widely available feature correctly', async () => {
    const mockFeature: WebPlatformFeature = {
      feature_id: 'flexbox',
      name: 'CSS Flexible Box Layout',
      description: 'A CSS layout method for arranging elements in one dimension',
      baseline: {
        status: 'widely',
        high_date: '2017-03-01',
        low_date: '2015-09-01'
      }
    }

    mockFetchBaselineData.mockResolvedValue(mockFeature)

    const { container } = render(BaselineChecker, {
      props: { featureName: 'flexbox' }
    })

    await waitFor(() => {
      expect(screen.getByText('Baseline')).toBeInTheDocument()
      expect(screen.getByText('Widely available')).toBeInTheDocument()
    })

    // Check CSS classes
    const checker = container.querySelector('.baseline-status')
    expect(checker).toBeInTheDocument()
    expect(screen.getByText('Widely available').closest('.baseline-status-text')).toHaveClass('widely')
  })

  it('should render limited availability feature correctly', async () => {
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

    const { container } = render(BaselineChecker, {
      props: { featureName: 'container-queries' }
    })

    await waitFor(() => {
      expect(screen.getByText('Baseline')).toBeInTheDocument()
      expect(screen.getByText('Newly available')).toBeInTheDocument()
    })

    const checker = container.querySelector('.baseline-status')
    expect(checker).toBeInTheDocument()
    expect(screen.getByText('Newly available').closest('.baseline-status-text')).toHaveClass('newly')
  })

  it('should render error state when feature not found', async () => {
    mockFetchBaselineData.mockResolvedValue(null)

    render(BaselineChecker, {
      props: { featureName: 'non-existent' }
    })

    await waitFor(() => {
      expect(screen.getByText('Feature "non-existent" not found')).toBeInTheDocument()
    })

    expect(screen.getByText('Feature "non-existent" not found').closest('.baseline-error')).toBeTruthy()
  })

  it('should apply custom class', async () => {
    const mockFeature: WebPlatformFeature = {
      feature_id: 'flexbox',
      name: 'CSS Flexbox',
      baseline: { status: 'widely', high_date: '2017-03-01', low_date: '2015-09-01' }
    }

    mockFetchBaselineData.mockResolvedValue(mockFeature)

    const { container } = render(BaselineChecker, {
      props: {
        featureName: 'flexbox',
        class: 'custom-class'
      }
    })

    await waitFor(() => {
      expect(screen.getByText('Baseline')).toBeInTheDocument()
      expect(screen.getByText('Widely available')).toBeInTheDocument()
    })

    const checker = container.querySelector('.baseline-status')
    expect(checker).toHaveClass('custom-class')
  })

  it('should have correct HTML structure', async () => {
    const mockFeature: WebPlatformFeature = {
      feature_id: 'flexbox',
      name: 'CSS Flexbox',
      description: 'Flexible layouts',
      baseline: { status: 'widely', high_date: '2017-03-01', low_date: '2015-09-01' }
    }

    mockFetchBaselineData.mockResolvedValue(mockFeature)

    const { container } = render(BaselineChecker, {
      props: { featureName: 'flexbox' }
    })

    await waitFor(() => {
      expect(screen.getByText('Baseline')).toBeInTheDocument()
      expect(screen.getByText('Widely available')).toBeInTheDocument()
    })

    // Check the expected HTML structure
    const checker = container.querySelector('.baseline-status')
    expect(checker).toBeInTheDocument()
    
    const content = checker?.querySelector('.baseline-content')
    expect(content).toBeInTheDocument()

    const icon = content?.querySelector('.baseline-icon')
    expect(icon).toBeInTheDocument()
    expect(icon?.classList.contains('widely')).toBe(true)

    const info = content?.querySelector('.baseline-info')
    expect(info).toBeInTheDocument()

    const statusText = info?.querySelector('.baseline-status-text')
    expect(statusText?.classList.contains('widely')).toBe(true)
    expect(statusText?.textContent).toBe('Widely available')
  })
})
