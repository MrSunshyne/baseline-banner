<template>
  <div class="baseline-banner" data-theme="mdn">
    <div class="baseline-checker" :class="baselineStatus.className">
      <div v-if="pending" class="loading-message">Loading compatibility data...</div>
      
      <div v-else-if="error || !feature" class="error-message">
        {{ error?.message || `Feature "${featureName}" not found` }}
      </div>
      
      <div v-else-if="feature" class="feature-info">

        <div>
          <template v-if="feature.baseline?.status">
            <BaselineBadge :year="baselineStatus.dates?.year" :label="baselineStatus.message" :status="feature.baseline?.status"/>
          </template>
        </div>

        <details class="feature-details">
          <summary class="feature-header">
            <div class="header-group">
              <template v-if="feature.baseline?.status">
                <BaselineYear :year="baselineStatus.dates?.year" :label="baselineStatus.message" :status="feature.baseline?.status"/>
              </template>

              <template v-if="feature.browser_implementations && feature.baseline?.status && showBrowsers">
                <div class="feature-browsers-support" >
                  <template v-for="browser in featuredBrowsers" :key="browser"> 
                    <BrowserStatus 
                      :browser-name="browser as BrowserIdentifier" 
                      :browser-status="(feature.browser_implementations as any)?.[browser]?.status ?? 'not_available'" 
                      :baseline-status="feature.baseline?.status"
                    />
                  </template>
                </div>
              </template>
            </div>
          </summary>

          <div class="feature-description" v-if="description">
              {{ description }}
          </div>
          
          <div v-if="baselineStatus.dates" class="availability-info">
            <div v-if="baselineStatus.dates.availableSince" class="availability-date">
              Available since: {{ formatDate(baselineStatus.dates.availableSince) }}
            </div>
            <div v-if="baselineStatus.dates.widelyAvailableSince" class="availability-date">
              Widely available since: {{ formatDate(baselineStatus.dates.widelyAvailableSince) }}
            </div>
          </div>
        </details>
      </div>

      <div v-if="feature && showDebug">
        <pre class="feature-debug">
          {{ feature }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { 
  fetchBaselineData,
  definitions,
  getBaselineStatus,
  formatDate,
  featuredBrowsers,
  type WebFeatureId,
  type WebPlatformFeature,
  type BrowserIdentifier
} from '@baseline-banner/core'
import BrowserStatus from './BrowserStatus.vue'
import BaselineBadge from './BaselineBadge.vue'
import BaselineYear from './BaselineYear.vue'

interface Props {
  featureName: WebFeatureId
  theme?: 'default' | 'dark' | 'minimal' | 'colorful'
  showDebug?: boolean
  showBrowsers?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'default',
  showDebug: false,
  showBrowsers: true
})

// Reactive state
const feature = ref<WebPlatformFeature | null>(null)
const pending = ref(false)
const error = ref<Error | null>(null)

// Computed baseline status
const baselineStatus = computed(() => getBaselineStatus(feature.value))

const description = computed(() => {
  if (feature.value?.baseline?.status) {
    return definitions[feature.value.baseline.status].message
  }
  return undefined
})

// Fetch data when featureName changes
watchEffect(async () => {
  pending.value = true
  error.value = null
  
  try {
    feature.value = await fetchBaselineData(props.featureName)
  } catch (err) {
    error.value = err instanceof Error ? err : new Error('Failed to fetch baseline data')
    feature.value = null
  } finally {
    pending.value = false
  }
})
</script>
