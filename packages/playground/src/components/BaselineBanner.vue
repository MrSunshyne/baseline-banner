<template>
  <div class="baseline-banner" :class="themeClass">
    <div class="baseline-checker">
      <div v-if="pending" class="loading-message">Loading compatibility data...</div>
      
      <div v-else-if="error || !feature" class="error-message">
        {{ error?.message || `Feature "${featureName}" not found` }}
      </div>
      
      <div v-else-if="feature" class="feature-info">
        <div class="feature-header">
          <h3 class="feature-name">{{ feature.name }}</h3>
          <div class="baseline-badge" :class="baselineStatus.className">
            {{ baselineStatus.message }}
          </div>
        </div>
        
        <p v-if="feature.description" class="feature-description">
          {{ feature.description }}
        </p>
        
        <div v-if="baselineStatus.dates" class="availability-info">
          <div v-if="baselineStatus.dates.availableSince" class="availability-date">
            Available since: {{ formatDate(baselineStatus.dates.availableSince) }}
          </div>
          <div v-if="baselineStatus.dates.widelyAvailableSince" class="availability-date">
            Widely available since: {{ formatDate(baselineStatus.dates.widelyAvailableSince) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { 
  fetchBaselineData, 
  getBaselineStatus, 
  formatDate,
  type WebFeatureId,
  type WebPlatformFeature 
} from '@baseline-banner/core'

interface Props {
  featureName: WebFeatureId
  theme?: 'default' | 'dark' | 'minimal' | 'colorful'
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'default'
})

// Reactive state
const feature = ref<WebPlatformFeature | null>(null)
const pending = ref(false)
const error = ref<Error | null>(null)

// Computed baseline status
const baselineStatus = computed(() => getBaselineStatus(feature.value))

// Theme class computation
const themeClass = computed(() => `theme-${props.theme}`)

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

<style scoped>
/* Theme variations */
.baseline-banner.theme-dark .baseline-checker {
  background: #1f2937;
  color: #f9fafb;
  border-color: #374151;
}

.baseline-banner.theme-dark .feature-name {
  color: #f9fafb;
}

.baseline-banner.theme-dark .feature-description {
  color: #d1d5db;
}

.baseline-banner.theme-dark .availability-info {
  color: #9ca3af;
}

.baseline-banner.theme-minimal .baseline-checker {
  background: transparent;
  border: 1px solid #e5e7eb;
  box-shadow: none;
}

.baseline-banner.theme-colorful .baseline-checker {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.baseline-banner.theme-colorful .feature-name {
  color: white;
}

.baseline-banner.theme-colorful .feature-description {
  color: rgba(255, 255, 255, 0.9);
}

.baseline-banner.theme-colorful .availability-info {
  color: rgba(255, 255, 255, 0.8);
}

.baseline-banner.theme-colorful .baseline-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
