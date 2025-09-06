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

  it('should render loading state', () => {
    render(BaselineChecker, {
      props: { featureName: 'container-queries' }
    })
    
    expect(screen.getByText('container-queries')).toBeTruthy()
    expect(screen.getByText('Loading')).toBeTruthy()
  })

  it('should render newly available feature correctly', async () => {
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
      expect(screen.getByText('CSS Container Queries')).toBeTruthy()
      expect(screen.getByText('Baseline')).toBeTruthy()
      expect(screen.getByText('newly available')).toBeTruthy()
    })

    const checker = container.querySelector('.baseline-status')
    expect(checker).not.toBeNull()
  })

  it('should render error state when feature not found', async () => {
    mockFetchBaselineData.mockResolvedValue(null)

    render(BaselineChecker, {
      props: { featureName: 'non-existent' }
    })

    await waitFor(() => {
      expect(screen.getByText('non-existent')).toBeTruthy()
      expect(screen.getByText('Unknown availability')).toBeTruthy()
    })
  })

  it('should render widely available feature correctly', async () => {
    const mockFeature: WebPlatformFeature = {
      feature_id: 'flexbox',
      name: 'CSS Flexbox Layout (Flexible Box)',
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
      expect(screen.getByText('CSS Flexbox Layout (Flexible Box)')).toBeTruthy()
      expect(screen.getByText('Baseline')).toBeTruthy()
      expect(screen.getByText('Widely available')).toBeTruthy()
    })

    const checker = container.querySelector('.baseline-status')
    expect(checker).not.toBeNull()
  })

  it('should have correct HTML structure', async () => {
    const mockFeature: WebPlatformFeature = {
      feature_id: 'flexbox',
      name: 'CSS Flexbox Layout (Flexible Box)',
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
      expect(screen.getByText('CSS Flexbox Layout (Flexible Box)')).toBeTruthy()
    })

    const baselineStatus = container.querySelector('.baseline-status')
    expect(baselineStatus).not.toBeNull()

    const content = baselineStatus?.querySelector('.baseline-content')
    expect(content).not.toBeNull()

    const name = content?.querySelector('.name')
    expect(name).not.toBeNull()
    expect(name?.textContent).toBe('CSS Flexbox Layout (Flexible Box)')

    const details = content?.querySelector('details')
    expect(details).not.toBeNull()

    const summary = details?.querySelector('summary')
    expect(summary).not.toBeNull()

    const baselineIcon = summary?.querySelector('.baseline-icon')
    expect(baselineIcon).not.toBeNull()
    expect(baselineIcon?.classList.contains('widely')).toBe(true)

    const badge = summary?.querySelector('.baseline-badge.widely')
    expect(badge).not.toBeNull()
    expect(badge?.textContent).toBe('Widely available')
  })
})