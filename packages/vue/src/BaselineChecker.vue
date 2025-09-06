<template>
  <div class="baseline-status" :class="{ 'is-loading': pending, 'has-error': error || !feature }">
    <div v-if="pending" class="baseline-loading">
      <div class="baseline-spinner"></div>
      <span>Checking baseline status...</span>
    </div>
    
    <div v-else-if="error || !feature" class="baseline-error">
      <span>{{ error?.message || `Feature "${featureName}" not found` }}</span>
    </div>
    
    <div v-else class="baseline-content">
      <div class="baseline-icon" :class="baselineStatus.className" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="16" height="16">
          <circle v-if="baselineStatus.className === 'widely'" cx="8" cy="8" r="6" fill="currentColor"/>
          <circle v-else-if="baselineStatus.className === 'newly'" cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2"/>
          <path v-else-if="baselineStatus.className === 'limited'" d="M8 2L14 14H2L8 2Z" fill="currentColor"/>
          <circle v-else cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2,2"/>
        </svg>
      </div>
      
      <div class="baseline-info">
        <div class="baseline-label">
          <strong>Baseline</strong>
        </div>
        <div class="baseline-status-text" :class="baselineStatus.className">
          {{ getStatusText() }}
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
  type WebFeatureId,
  type WebPlatformFeature 
} from '@baseline-banner/core'

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

// Get clean status text
const getStatusText = () => {
  return baselineStatus.value.message
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
