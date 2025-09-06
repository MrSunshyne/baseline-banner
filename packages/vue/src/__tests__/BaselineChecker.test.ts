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

    expect(screen.getByText('Loading compatibility data...')).toBeInTheDocument()
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

    render(BaselineChecker, {
      props: { featureName: 'flexbox' }
    })

    await waitFor(() => {
      expect(screen.getByText('CSS Flexible Box Layout')).toBeInTheDocument()
      expect(screen.getByText('Widely available')).toBeInTheDocument()
      expect(screen.getByText('A CSS layout method for arranging elements in one dimension')).toBeInTheDocument()
      expect(screen.getByText('Available since: September 2015')).toBeInTheDocument()
      expect(screen.getByText('Widely available since: March 2017')).toBeInTheDocument()
    })

    // Check CSS classes
    const checker = screen.getByText('CSS Flexible Box Layout').closest('.baseline-checker')
    expect(checker).toBeInTheDocument()
    expect(screen.getByText('Widely available').closest('.baseline-badge')).toHaveClass('high')
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

    render(BaselineChecker, {
      props: { featureName: 'container-queries' }
    })

    await waitFor(() => {
      expect(screen.getByText('CSS Container Queries')).toBeInTheDocument()
      expect(screen.getByText('Newly available')).toBeInTheDocument()
      expect(screen.getByText('Available since: September 2022')).toBeInTheDocument()
      expect(screen.queryByText(/Widely available since/)).not.toBeInTheDocument()
    })

    expect(screen.getByText('Newly available').closest('.baseline-badge')).toHaveClass('low')
  })

  it('should render error state when feature not found', async () => {
    mockFetchBaselineData.mockResolvedValue(null)

    render(BaselineChecker, {
      props: { featureName: 'non-existent' }
    })

    await waitFor(() => {
      expect(screen.getByText('Feature "non-existent" not found')).toBeInTheDocument()
    })

    expect(screen.getByText('Feature "non-existent" not found').closest('.error-message')).toBeInTheDocument()
  })

  it('should apply custom class', async () => {
    const mockFeature: WebPlatformFeature = {
      feature_id: 'flexbox',
      name: 'CSS Flexbox',
      baseline: { status: 'widely', high_date: '2017-03-01', low_date: '2015-09-01' }
    }

    mockFetchBaselineData.mockResolvedValue(mockFeature)

    render(BaselineChecker, {
      props: { 
        featureName: 'flexbox',
        class: 'custom-class'
      }
    })

    await waitFor(() => {
      expect(screen.getByText('CSS Flexbox')).toBeInTheDocument()
    })

    const checker = screen.getByText('CSS Flexbox').closest('.baseline-checker')
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
      expect(screen.getByText('CSS Flexbox')).toBeInTheDocument()
    })

    // Check the expected HTML structure
    const checker = container.querySelector('.baseline-checker')
    expect(checker).toBeInTheDocument()
    
    const featureInfo = checker?.querySelector('.feature-info')
    expect(featureInfo).toBeInTheDocument()

    const header = featureInfo?.querySelector('.feature-header')
    expect(header).toBeInTheDocument()

    const name = header?.querySelector('.feature-name')
    expect(name).toHaveTextContent('CSS Flexbox')

    const badge = header?.querySelector('.baseline-badge')
    expect(badge?.classList.contains('high')).toBe(true)
    expect(badge?.textContent).toBe('Widely available')
  })
})
