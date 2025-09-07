<template>
  <div class="baseline-status">
    <div v-if="pending" class="baseline-loading">
      <h2 class="name">{{ featureName || 'Loading...' }}</h2>
      <div class="baseline-status-title">
        <div>
          <strong>Baseline</strong>
          <span class="baseline-badge loading">Loading</span>
        </div>
      </div>
    </div>
    
    <div v-else-if="error || !feature" class="baseline-error-state">
      <h2 class="name">{{ featureName || 'Unknown feature' }}</h2>
      <div class="baseline-status-title">
        <div>
          <baseline-icon support="no_data"></baseline-icon>
          <strong>Baseline</strong>
          <span class="baseline-badge no-data">Unknown availability</span>
        </div>
        <div class="baseline-status-browsers">
          <span class="support-no_data">
            <browser-icon name="chrome"></browser-icon>
            <support-icon status="no_data"></support-icon>
          </span>
          <span class="support-no_data">
            <browser-icon name="edge"></browser-icon>
            <support-icon status="no_data"></support-icon>
          </span>
          <span class="support-no_data">
            <browser-icon name="firefox"></browser-icon>
            <support-icon status="no_data"></support-icon>
          </span>
          <span class="support-no_data">
            <browser-icon name="safari"></browser-icon>
            <support-icon status="no_data"></support-icon>
          </span>
        </div>
      </div>
      <details>
        <summary>
          We currently don't have browser support information about this feature.
          <div class="open-icon">
            <svg viewBox="0 0 24 24" width="12" height="12">
              <path d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6-6-6l1.41-1.42z"/>
            </svg>
          </div>
        </summary>
      </details>
    </div>
    
    <div v-else class="baseline-content">
      <h2 class="name">{{ feature.name }}</h2>
      <details>
        <summary>
          <div class="baseline-status-title">
            <div>
              <baseline-icon :support="baselineStatus.className"></baseline-icon>
              <strong v-if="baselineStatus.className !== 'limited' && baselineStatus.className !== 'no_data'">Baseline</strong>
              <span class="baseline-badge" :class="baselineStatus.className">
                {{ getStatusTitle() }}
              </span>
              <span v-if="baselineStatus.className === 'newly' && baselineDate" class="baseline-year">{{ getYear() }}</span>
              <span v-if="baselineStatus.className === 'newly'" class="baseline-badge newly-badge">newly available</span>
            </div>
            <div class="baseline-status-browsers">
              <span :class="`support-${getSupportClass('chrome')}`">
                <browser-icon name="chrome"></browser-icon>
                <support-icon :status="getSupportClass('chrome')"></support-icon>
              </span>
              <span :class="`support-${getSupportClass('edge')}`">
                <browser-icon name="edge"></browser-icon>
                <support-icon :status="getSupportClass('edge')"></support-icon>
              </span>
              <span :class="`support-${getSupportClass('firefox')}`">
                <browser-icon name="firefox"></browser-icon>
                <support-icon :status="getSupportClass('firefox')"></support-icon>
              </span>
              <span :class="`support-${getSupportClass('safari')}`">
                <browser-icon name="safari"></browser-icon>
                <support-icon :status="getSupportClass('safari')"></support-icon>
              </span>
            </div>
          </div>
          <div class="open-icon">
            <svg viewBox="0 0 24 24" width="12" height="12">
              <path d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6-6-6l1.41-1.42z"/>
            </svg>
          </div>
        </summary>
        <div class="baseline-description">
          {{ getDescription() }}
          <div v-if="baselineStatus.className !== 'no_data'" class="learn-more">
            <a :href="`https://web.dev/baseline/${feature.feature_id || featureName}`" target="_blank">Learn more</a>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { 
  fetchBaselineData, 
  getBaselineStatus,
  type WebFeatureId,
  type WebPlatformFeature 
} from '@baseline-banner/core'
import BaselineIcon from './components/BaselineIcon.vue'
import BrowserIcon from './components/BrowserIcon.vue'
import SupportIcon from './components/SupportIcon.vue'

interface Props {
  featureName: WebFeatureId
}

const props = defineProps<Props>()

// Reactive state
const feature = ref<WebPlatformFeature | null>(null)
const pending = ref(false)
const error = ref<Error | null>(null)

// Computed baseline status
const baselineStatus = computed(() => getBaselineStatus(feature.value))

// Get clean status text for badge
const getStatusTitle = () => {
  switch (baselineStatus.value.className) {
    case 'widely':
      return 'Widely available'
    case 'newly': 
      return ''
    case 'limited':
      return 'Limited availability'
    default:
      return 'Unknown availability'
  }
}

// Get baseline date
const baselineDate = computed(() => {
  return feature.value?.baseline?.low_date ? 
    new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(new Date(feature.value.baseline.low_date)) : 
    ''
})

// Get year from baseline date
const getYear = () => {
  return baselineDate.value ? baselineDate.value.split(' ')[1] : ''
}

// Get description based on status
const getDescription = () => {
  const status = baselineStatus.value.className
  const date = baselineDate.value
  
  if (status === 'newly' && date) {
    return `Since ${date} this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.`
  } else if (status === 'widely' && date) {
    return `This feature is well established and works across many devices and browser versions. It's been available across browsers since ${date}.`
  } else if (status === 'limited') {
    return 'This feature is not Baseline because it does not work in some of the most widely-used browsers.'
  }
  
  return "We currently don't have browser support information about this feature."
}

// Get support class for browsers
const getSupportClass = (browser: string) => {
  const status = baselineStatus.value.className
  if (status === 'limited') {
    // For limited, we'd need individual browser data, but for now assume unavailable
    return 'unavailable'
  } else if (status === 'newly' || status === 'widely') {
    return 'available'
  }
  return 'no_data'
}

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


<!-- All styles are now in @baseline-banner/styles -->
