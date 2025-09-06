<template>
  <div class="baseline-checker">
    <div v-if="pending" class="loading-message">
      Loading feature data...
    </div>
    
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

<style scoped>
.baseline-checker {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  background: #f8fafc;
}

.error-message {
  color: #ef4444;
  font-weight: 500;
  text-align: center;
  padding: 1rem;
}

.loading-message {
  color: #6b7280;
  font-weight: 500;
  text-align: center;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.loading-message::after {
  content: '';
  width: 16px;
  height: 16px;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #6b7280;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.feature-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature-name {
  margin: 0;
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
}

.baseline-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.baseline-badge.high {
  background-color: #dcfce7;
  color: #15803d;
  border: 1px solid #22c55e;
}

.baseline-badge.low {
  background-color: #fef3c7;
  color: #d97706;
  border: 1px solid #f59e0b;
}

.baseline-badge.limited {
  background-color: #fee2e2;
  color: #dc2626;
  border: 1px solid #ef4444;
}

.baseline-badge.unknown {
  background-color: #f1f5f9;
  color: #64748b;
  border: 1px solid #94a3b8;
}

.feature-description {
  color: #4b5563;
  margin: 0.5rem 0;
  line-height: 1.5;
}

.availability-info {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.availability-date {
  margin-bottom: 0.25rem;
}
</style>
