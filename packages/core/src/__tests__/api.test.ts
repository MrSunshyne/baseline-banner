import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchBaselineData, getBaselineStatus, formatDate } from '../api'
import type { WebPlatformFeature } from '../api'

describe('Core API Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchBaselineData', () => {
    it('should fetch and return feature data successfully', async () => {
      const mockFeature: WebPlatformFeature = {
        feature_id: 'flexbox',
        name: 'CSS Flexible Box Layout',
        description: 'A CSS layout method for arranging elements',
        baseline: {
          status: 'widely',
          high_date: '2017-03-01',
          low_date: '2015-09-01'
        }
      }

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ data: [mockFeature] })
      }

      global.fetch = vi.fn().mockResolvedValue(mockResponse)

      const result = await fetchBaselineData('flexbox')

      expect(result).toEqual(mockFeature)
      expect(fetch).toHaveBeenCalledWith('https://api.webstatus.dev/v1/features?q=id%3Aflexbox')
    })

    it('should return null when API request fails', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

      const result = await fetchBaselineData('flexbox')

      expect(result).toBeNull()
    })

    it('should return null when no data is found', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ data: [] })
      }

      global.fetch = vi.fn().mockResolvedValue(mockResponse)

      const result = await fetchBaselineData('non-existent-feature' as any)

      expect(result).toBeNull()
    })
  })

  describe('getBaselineStatus', () => {
    it('should return "Widely available" status for features with widely status', () => {
      const feature: WebPlatformFeature = {
        feature_id: 'flexbox',
        name: 'CSS Flexbox',
        baseline: {
          status: 'widely',
          high_date: '2017-03-01',
          low_date: '2015-09-01'
        }
      }

      const status = getBaselineStatus(feature)

      expect(status.message).toBe('Widely available')
      expect(status.className).toBe('high widely')
      expect(status.dates?.availableSince).toBe('2015-09-01')
      expect(status.dates?.widelyAvailableSince).toBe('2017-03-01')
    })

    it('should return "Newly available" for features with newly status', () => {
      const feature: WebPlatformFeature = {
        feature_id: 'container-queries',
        name: 'CSS Container Queries', 
        baseline: {
          status: 'newly',
          low_date: '2022-09-01'
        }
      }

      const status = getBaselineStatus(feature)

      expect(status.message).toBe('Newly available')
      expect(status.className).toBe('low newly')
      expect(status.dates?.availableSince).toBe('2022-09-01')
      expect(status.dates?.widelyAvailableSince).toBeUndefined()
    })

    it('should return "Status unknown" for features without baseline', () => {
      const feature: WebPlatformFeature = {
        feature_id: 'future-feature',
        name: 'Future CSS Feature'
      }

      const status = getBaselineStatus(feature)

      expect(status.message).toBe('Status unknown')
      expect(status.className).toBe('unknown')
      expect(status.dates).toBeUndefined()
    })

    it('should handle null feature input', () => {
      const status = getBaselineStatus(null)

      expect(status.message).toBe('Unknown')
      expect(status.className).toBe('unknown')
      expect(status.dates).toBeUndefined()
    })
  })

  describe('formatDate', () => {
    it('should format dates correctly', () => {
      expect(formatDate('2017-03-15')).toBe('March 2017')
      expect(formatDate('2022-01-01')).toBe('January 2022')
      expect(formatDate('2023-12-25')).toBe('December 2023')
    })

    it('should handle invalid dates', () => {
      expect(formatDate('invalid-date')).toBe('Invalid Date')
      expect(formatDate('')).toBe('')
    })
  })
})
