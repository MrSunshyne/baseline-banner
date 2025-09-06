export { default as BaselineChecker } from './BaselineChecker'
export type { BaselineCheckerProps } from './BaselineChecker'

// Re-export types and functions from core
export type { 
  WebFeatureId, 
  WebPlatformFeature, 
  BaselineInfo 
} from '@baseline-banner/core'

export {
  fetchBaselineData,
  getBaselineStatus,
  formatDate
} from '@baseline-banner/core'
