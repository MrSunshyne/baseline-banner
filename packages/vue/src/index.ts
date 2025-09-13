import type { App } from 'vue'
import BaselineChecker from './BaselineChecker.vue'
import BaselineBanner from './default/BaselineBanner.vue'
import BaselineBannerMDN from './mdn/BaselineBanner.vue'
// Import shared styles
import '@baseline-banner/styles'

// Re-export types from core
export type { WebFeatureId, BaselineStatus, WebPlatformFeature } from '@baseline-banner/core'

// Export the components
export { BaselineChecker, BaselineBanner, BaselineBannerMDN }

// Export MDN theme sub-components
export { default as BaselineBadgeMDN } from './mdn/BaselineBadge.vue'
export { default as BaselineYearMDN } from './mdn/BaselineYear.vue'
export { default as BrowserStatusMDN } from './mdn/BrowserStatus.vue'

// Plugin for global registration
export default {
  install(app: App) {
    app.component('BaselineChecker', BaselineChecker)
    app.component('BaselineBanner', BaselineBanner)
    app.component('BaselineBannerMDN', BaselineBannerMDN)
  }
}
