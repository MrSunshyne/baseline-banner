import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render as renderReact, waitFor } from '@testing-library/react'
import { render as renderVue } from '@testing-library/vue'
import React from 'react'
import { default as ReactComponent } from '../packages/react/src/BaselineChecker'
import VueComponent from '../packages/vue/src/BaselineChecker.vue'
import type { WebPlatformFeature } from '../packages/core/src/api'

// Mock the core API for consistent testing
vi.mock('../packages/core/src/api', async () => {
  const actual = await vi.importActual('../packages/core/src/api')
  return {
    ...actual,
    fetchBaselineData: vi.fn(),
  }
})

import { fetchBaselineData } from '../packages/core/src/api'

describe('Component Markup Comparison', () => {
  const mockFetchBaselineData = fetchBaselineData as any

  beforeEach(() => {
    vi.clearAllMocks()
  })

  const normalizeHTML = (html: string) => {
    return html
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/>\s+</g, '><') // Remove whitespace between tags
      .replace(/<!--.*?-->/g, '') // Remove comments
      .trim()
  }

  const testFeatures: Array<{ name: string; feature: WebPlatformFeature | null }> = [
    {
      name: 'widely available feature',
      feature: {
        feature_id: 'flexbox',
        name: 'CSS Flexible Box Layout',
        description: 'A CSS layout method for arranging elements',
        baseline: {
          status: 'widely',
          high_date: '2017-03-01',
          low_date: '2015-09-01'
        }
      }
    },
    {
      name: 'limited availability feature',
      feature: {
        feature_id: 'container-queries',
        name: 'CSS Container Queries',
        description: 'Query the size and style of containers',
        baseline: {
          status: 'newly',
          low_date: '2022-09-01'
        }
      }
    },
    {
      name: 'unavailable feature',
      feature: {
        feature_id: 'future-feature',
        name: 'Future CSS Feature',
        description: 'A feature not yet available'
      }
    },
    {
      name: 'not found feature',
      feature: null
    }
  ]

  testFeatures.forEach(({ name, feature }) => {
    it(`should produce identical markup for ${name}`, async () => {
      mockFetchBaselineData.mockResolvedValue(feature)

      // Render React component
      const { container: reactContainer } = renderReact(
        <ReactComponent featureName="test-feature" />
      )

      // Render Vue component  
      const { container: vueContainer } = renderVue(VueComponent, {
        props: { featureName: 'test-feature' }
      })

      // Wait for both components to finish loading
      await waitFor(() => {
        if (feature) {
          expect(reactContainer.textContent).toContain(feature.name || 'Loading...')
          expect(vueContainer.textContent).toContain(feature.name || 'Loading...')
        } else {
          expect(reactContainer.textContent).toContain('Feature "test-feature" not found')
          expect(vueContainer.textContent).toContain('Feature "test-feature" not found')
        }
      })

      // Compare normalized HTML structure
      const reactHTML = normalizeHTML(reactContainer.innerHTML)
      const vueHTML = normalizeHTML(vueContainer.innerHTML)

      expect(reactHTML).toBe(vueHTML)
    })
  })

  it('should produce identical markup with custom className/class', async () => {
    const mockFeature: WebPlatformFeature = {
      feature_id: 'flexbox',
      name: 'CSS Flexbox',
      baseline: { status: 'widely', high_date: '2017-03-01', low_date: '2015-09-01' }
    }

    mockFetchBaselineData.mockResolvedValue(mockFeature)

    // Render with custom class
    const { container: reactContainer } = renderReact(
      <ReactComponent featureName="flexbox" className="custom-test-class" />
    )

    const { container: vueContainer } = renderVue(VueComponent, {
      props: { featureName: 'flexbox', class: 'custom-test-class' }
    })

    await waitFor(() => {
      expect(reactContainer.textContent).toContain('CSS Flexbox')
      expect(vueContainer.textContent).toContain('CSS Flexbox')
    })

    // Both should have the custom class
    expect(reactContainer.querySelector('.custom-test-class')).not.toBeNull()
    expect(vueContainer.querySelector('.custom-test-class')).not.toBeNull()

    // Compare HTML structure
    const reactHTML = normalizeHTML(reactContainer.innerHTML)
    const vueHTML = normalizeHTML(vueContainer.innerHTML)

    expect(reactHTML).toBe(vueHTML)
  })

  it('should have identical CSS class structure', async () => {
    const mockFeature: WebPlatformFeature = {
      feature_id: 'grid',
      name: 'CSS Grid Layout',
      description: 'Two-dimensional grid-based layout system',
      baseline: {
        status: 'widely',
        high_date: '2020-03-01',
        low_date: '2017-03-01'
      }
    }

    mockFetchBaselineData.mockResolvedValue(mockFeature)

    const { container: reactContainer } = renderReact(
      <ReactComponent featureName="grid" />
    )

    const { container: vueContainer } = renderVue(VueComponent, {
      props: { featureName: 'grid' }
    })

    await waitFor(() => {
      expect(reactContainer.textContent).toContain('CSS Grid Layout')
      expect(vueContainer.textContent).toContain('CSS Grid Layout')
    })

    // Check that both have the same CSS classes in the same structure
    const reactClasses = {
      baselineChecker: reactContainer.querySelector('.baseline-checker')?.className,
      featureInfo: reactContainer.querySelector('.feature-info')?.className,
      featureHeader: reactContainer.querySelector('.feature-header')?.className,
      featureName: reactContainer.querySelector('.feature-name')?.className,
      baselineBadge: reactContainer.querySelector('.baseline-badge')?.className,
      featureDescription: reactContainer.querySelector('.feature-description')?.className,
      availabilityInfo: reactContainer.querySelector('.availability-info')?.className,
    }

    const vueClasses = {
      baselineChecker: vueContainer.querySelector('.baseline-checker')?.className,
      featureInfo: vueContainer.querySelector('.feature-info')?.className,
      featureHeader: vueContainer.querySelector('.feature-header')?.className,
      featureName: vueContainer.querySelector('.feature-name')?.className,
      baselineBadge: vueContainer.querySelector('.baseline-badge')?.className,
      featureDescription: vueContainer.querySelector('.feature-description')?.className,
      availabilityInfo: vueContainer.querySelector('.availability-info')?.className,
    }

    // All class structures should match
    expect(reactClasses).toEqual(vueClasses)
  })

  it('should render identical loading states', () => {
    mockFetchBaselineData.mockImplementation(() => new Promise(() => {}))

    const { container: reactContainer } = renderReact(
      <ReactComponent featureName="loading-test" />
    )

    const { container: vueContainer } = renderVue(VueComponent, {
      props: { featureName: 'loading-test' }
    })

    // Both should show loading
    expect(reactContainer.textContent).toContain('Loading compatibility data...')
    expect(vueContainer.textContent).toContain('Loading compatibility data...')

    // HTML should be identical
    const reactHTML = normalizeHTML(reactContainer.innerHTML)
    const vueHTML = normalizeHTML(vueContainer.innerHTML)

    expect(reactHTML).toBe(vueHTML)
  })
})
