import type { App } from 'vue'
import BaselineChecker from './BaselineChecker.vue'

// Import shared styles
import '@baseline-banner/styles'

// Re-export types from core
export type { WebFeatureId, BaselineStatus, WebPlatformFeature } from '@baseline-banner/core'

// Export the component
export { BaselineChecker }

// Plugin for global registration
export default {
  install(app: App) {
    app.component('BaselineChecker', BaselineChecker)
  }
}
