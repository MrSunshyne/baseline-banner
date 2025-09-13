// Main exports
export { 
  fetchBaselineData, 
  getBaselineStatus, 
  formatDate,
  featuredBrowsers,
} from './api.js'

export type { 
  WebFeatureId 
} from './types.js'

export type {
  BaselineInfo,
  WebPlatformFeature,
  APIResponse,
  BaselineStatus,
  BrowserImplementation,
  BrowserIdentifier,
} from './api.js'

export {
  definitions
} from './definitions.js'