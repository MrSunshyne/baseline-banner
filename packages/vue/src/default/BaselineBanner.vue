<template>
  <div class="baseline-checker" data-theme="default">
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
        <div v-if="baselineStatus.dates.availableSince" class="availability-date">Available since: {{ formatDate(baselineStatus.dates.availableSince) }}</div>
        <div v-if="baselineStatus.dates.widelyAvailableSince" class="availability-date">Widely available since: {{ formatDate(baselineStatus.dates.widelyAvailableSince) }}</div>
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
}

const props = defineProps<Props>()

// Reactive state
const feature = ref<WebPlatformFeature | null>(null)
const pending = ref(false)
const error = ref<Error | null>(null)

// Computed baseline status
const baselineStatus = computed(() => getBaselineStatus(feature.value))

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
