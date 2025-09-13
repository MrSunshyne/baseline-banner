import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import BaselineChecker from '../BaselineChecker'
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

describe('BaselineChecker (React)', () => {
  const mockFetchBaselineData = fetchBaselineData as any

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render loading state initially', () => {
    mockFetchBaselineData.mockImplementation(() => new Promise(() => {}))

    render(<BaselineChecker featureName="flexbox" />)

    expect(screen.getByText('Loading compatibility data...')).toBeTruthy()
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

    render(<BaselineChecker featureName="flexbox" />)

    await waitFor(() => {
      expect(screen.getByText('CSS Flexible Box Layout')).toBeTruthy()
      expect(screen.getByText('Widely available')).toBeTruthy()
      expect(screen.getByText(/A CSS layout method for arranging elements/)).toBeTruthy()
      expect(screen.getByText('Available since: September 2015')).toBeTruthy()
      expect(screen.getByText('Widely available since: March 2017')).toBeTruthy()
    })

    // Check CSS classes
    const checker = screen.getByText('CSS Flexible Box Layout').closest('.baseline-checker')
    expect(checker).not.toBeNull()
    expect(screen.getByText('Widely available').closest('.baseline-badge')?.classList.contains('high')).toBe(true)
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

    render(<BaselineChecker featureName="container-queries" />)

    await waitFor(() => {
      expect(screen.getByText('CSS Container Queries')).toBeTruthy()
      expect(screen.getByText('Newly available')).toBeTruthy()
      expect(screen.getByText('Available since: September 2022')).toBeTruthy()
      expect(screen.queryByText(/Widely available since/)).toBeNull()
    })

    expect(screen.getByText('Newly available').closest('.baseline-badge')?.classList.contains('low')).toBe(true)
  })

  it('should render error state when feature not found', async () => {
    mockFetchBaselineData.mockResolvedValue(null)

    render(<BaselineChecker featureName={"non-existent" as any} />)

    await waitFor(() => {
      expect(screen.getByText('Feature "non-existent" not found')).toBeTruthy()
    })

    expect(screen.getByText('Feature "non-existent" not found').closest('.error-message')).not.toBeNull()
  })

  it('should apply custom className', async () => {
    const mockFeature: WebPlatformFeature = {
      feature_id: 'flexbox',
      name: 'CSS Flexbox',
      baseline: { status: 'widely', high_date: '2017-03-01', low_date: '2015-09-01' }
    }

    mockFetchBaselineData.mockResolvedValue(mockFeature)

    render(<BaselineChecker featureName="flexbox" className="custom-class" />)

    await waitFor(() => {
      expect(screen.getByText('CSS Flexbox')).toBeTruthy()
    })

    const checker = screen.getByText('CSS Flexbox').closest('.baseline-checker')
    expect(checker?.classList.contains('custom-class')).toBe(true)
  })

  it('should have correct HTML structure', async () => {
    const mockFeature: WebPlatformFeature = {
      feature_id: 'flexbox',
      name: 'CSS Flexbox',
      description: 'Flexible layouts',
      baseline: { status: 'widely', high_date: '2017-03-01', low_date: '2015-09-01' }
    }

    mockFetchBaselineData.mockResolvedValue(mockFeature)

    const { container } = render(<BaselineChecker featureName="flexbox" />)

    await waitFor(() => {
      expect(screen.getByText('CSS Flexbox')).toBeTruthy()
    })

    // Check the expected HTML structure matches Vue component
    const checker = container.querySelector('.baseline-checker')
    expect(checker).not.toBeNull()
    
    const featureInfo = checker?.querySelector('.feature-info')
    expect(featureInfo).not.toBeNull()

    const header = featureInfo?.querySelector('.feature-header')
    expect(header).not.toBeNull()

    const name = header?.querySelector('.feature-name')
    expect(name?.textContent).toBe('CSS Flexbox')

    const badge = header?.querySelector('.baseline-badge')
    expect(badge?.classList.contains('high')).toBe(true)
    expect(badge?.textContent).toBe('Widely available')
  })
})
