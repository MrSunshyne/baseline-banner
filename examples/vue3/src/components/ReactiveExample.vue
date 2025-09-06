<template>
  <section class="section">
    <h2>Reactive Feature Checker</h2>
    <p>
      This example shows how to create a reactive feature input with dynamic checking:
    </p>

    <div style="margin: 2rem 0;">
      <h3>Enter CSS Feature Names:</h3>
      <p style="color: #64748b; font-size: 0.9rem;">
        Try: flexbox, grid, css-nesting, css-container-queries, custom-properties
      </p>
      
      <div class="input-group">
        <input 
          v-model="featureInput"
          @keyup.enter="addFeature"
          type="text" 
          class="feature-input"
          placeholder="e.g., flexbox"
        />
        <button @click="addFeature" class="add-button" :disabled="!featureInput.trim()">
          Add Feature
        </button>
      </div>

      <div v-if="reactiveFeatures.length > 0" class="feature-list">
        <h4>Current Features:</h4>
        <div class="feature-tags">
          <span 
            v-for="(feature, index) in reactiveFeatures" 
            :key="index"
            class="feature-tag"
          >
            {{ feature }}
            <button @click="removeFeature(index)" class="remove-btn">×</button>
          </span>
        </div>
        
        <button @click="clearFeatures" class="clear-button">
          Clear All
        </button>
      </div>

      <div style="margin: 2rem 0;">
        <h4>Live Baseline Check:</h4>
        <div v-if="reactiveFeatures.length > 0" class="reactive-features">
          <BaselineChecker 
            v-for="feature in reactiveFeatures" 
            :key="feature"
            :feature-name="feature"
          />
        </div>
        <div v-else class="empty-state">
          Add some features above to see the baseline check!
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">{{ reactiveFeatures.length }}</div>
          <div class="stat-label">Features</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ watchCount }}</div>
          <div class="stat-label">Updates</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { BaselineChecker } from '@baseline-banner/vue'
import type { WebFeatureId } from '@baseline-banner/vue'

const featureInput = ref('')
const reactiveFeatures = ref<WebFeatureId[]>(['flexbox'])
const watchCount = ref(0)

// Watch for changes in features array
watch(reactiveFeatures, () => {
  watchCount.value++
}, { deep: true })

const addFeature = () => {
  const feature = featureInput.value.trim() as WebFeatureId
  if (feature && !reactiveFeatures.value.includes(feature)) {
    reactiveFeatures.value.push(feature)
    featureInput.value = ''
  }
}

const removeFeature = (index: number) => {
  reactiveFeatures.value.splice(index, 1)
}

const clearFeatures = () => {
  reactiveFeatures.value = []
}
</script>

<style scoped>
.input-group {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}

.feature-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
}

.feature-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.add-button {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.add-button:hover:not(:disabled) {
  background: #2563eb;
}

.add-button:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.feature-list {
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
}

.feature-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.feature-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background: #3b82f6;
  color: white;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.remove-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.clear-button {
  padding: 0.5rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
}

.clear-button:hover {
  background: #dc2626;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.stat-card {
  text-align: center;
  padding: 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #3b82f6;
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.5rem;
}

@media (prefers-color-scheme: dark) {
  .feature-input {
    background: #1e293b;
    border-color: #334155;
    color: #e2e8f0;
  }
  
  .feature-list {
    background: #334155;
  }
  
  .stat-card {
    background: #1e293b;
    border-color: #334155;
  }
}
</style>
