import type { WebFeatureId } from './types.js'

export interface BaselineInfo {
  status: 'limited' | 'newly' | 'widely' | 'no_data'
  low_date?: string
  high_date?: string
}

export type BrowserIdentifier = 'chrome' | 'chrome_android' | 'edge' | 'firefox' | 'firefox_android' | 'safari' | 'safari_ios'

export interface BrowserImplementation {
  date: string
  status: 'available' | 'not_available' | 'no_data'
  version: string
}

export interface WebPlatformFeature {
  feature_id: string
  name: string
  description?: string
  baseline?: BaselineInfo
  browser_implementations?: {
    [key in BrowserIdentifier]: BrowserImplementation
  }
  spec?: {
    links?: Array<{
      url: string
      title: string
    }>
  }
}

export interface APIResponse {
  data: WebPlatformFeature[]
}

export interface BaselineStatus {
  message: string
  className: string
  isAvailable: boolean
  dates?: {
    availableSince?: string
    widelyAvailableSince?: string
    year?: string
  }
}

export const featuredBrowsers: BrowserIdentifier[] = ['chrome', 'edge', 'firefox', 'safari']

/**
 * Fetch baseline compatibility data for a web feature
 */
export async function fetchBaselineData(featureId: WebFeatureId): Promise<WebPlatformFeature | null> {
  try {
    const query = encodeURIComponent(`id:${featureId}`)
    const response = await fetch(`https://api.webstatus.dev/v1/features?q=${query}`)
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }
    
    const data: APIResponse = await response.json()
    return data.data?.[0] || null
  } catch (error) {
    console.error('Failed to fetch baseline data:', error)
    return null
  }
}

/**
 * Get baseline status information from feature data
 */
export function getBaselineStatus(feature: WebPlatformFeature | null): BaselineStatus {
  if (!feature) {
    return {
      message: 'Unknown',
      className: 'unknown',
      isAvailable: false
    }
  }

  const baselineStatus = feature.baseline?.status

  switch (baselineStatus) {
    case 'widely':
      return {
        message: 'Widely available',
        className: 'high widely',
        isAvailable: true,
        dates: {
          availableSince: feature.baseline?.low_date,
          widelyAvailableSince: feature.baseline?.high_date,
        }
      }
    case 'newly':
      return {
        message: 'Newly available',
        className: 'low newly',
        isAvailable: true,
        dates: {
          availableSince: feature.baseline?.low_date,
          year: formatDateToYear(feature.baseline?.low_date || '')
        }
      }
    case 'limited':
      return {
        message: 'Limited availability',
        className: 'limited',
        isAvailable: false
      }
    default:
      return {
        message: 'Status unknown',
        className: 'unknown',
        isAvailable: false
      }
  }
}

/**
 * Format date string to human-readable format
 */
export function formatDate(dateString: string): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  })
}


/**
 * Format date string to year only
 */
export function formatDateToYear(dateString: string): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric'
  })
}