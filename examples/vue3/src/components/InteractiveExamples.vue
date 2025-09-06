<template>
  <section class="section">
    <h2>Interactive Examples</h2>
    <p>
      Dynamically change features and see the baseline checker update in real-time:
    </p>

    <div style="margin: 2rem 0;">
      <h3>Select Features to Check:</h3>
      
      <div class="checkbox-grid">
        <label v-for="feature in availableFeatures" :key="feature.id" class="checkbox-label">
          <input 
            type="checkbox" 
            :value="feature.id" 
            v-model="selectedFeatures"
            class="checkbox"
          />
          <span>{{ feature.name }}</span>
        </label>
      </div>

      <div style="margin: 2rem 0;">
        <h4>Selected Features ({{ selectedFeatures.length }}):</h4>
        <p v-if="selectedFeatures.length === 0" class="empty-state">
          No features selected. Check some boxes above!
        </p>
        <div v-else class="selected-features">
          <BaselineChecker 
            v-for="feature in selectedFeatures" 
            :key="feature"
            :feature-name="feature"
          />
        </div>
      </div>

      <div class="code-preview">
        <h4>Vue Code:</h4>
        <div class="code-block">
// Multiple features:
&lt;div v-for="feature in selectedFeatures" :key="feature"&gt;
  &lt;BaselineChecker :feature-name="feature" /&gt;
&lt;/div&gt;
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaselineChecker } from '@baseline-banner/vue'
import type { WebFeatureId } from '@baseline-banner/vue'

const selectedFeatures = ref<WebFeatureId[]>(['flexbox', 'grid'])

const availableFeatures = [
  { id: 'flexbox' as WebFeatureId, name: 'Flexbox' },
  { id: 'grid' as WebFeatureId, name: 'CSS Grid' },
  { id: 'container-queries' as WebFeatureId, name: 'Container Queries' },
  { id: 'cascade-layers' as WebFeatureId, name: 'Cascade Layers' },
  { id: 'nesting' as WebFeatureId, name: 'CSS Nesting' },
  { id: 'subgrid' as WebFeatureId, name: 'CSS Subgrid' },
  { id: 'custom-properties' as WebFeatureId, name: 'CSS Custom Properties' },
  { id: 'logical-properties' as WebFeatureId, name: 'Logical Properties' },
  { id: 'color' as WebFeatureId, name: 'CSS color() Function' },
  { id: 'math-functions' as WebFeatureId, name: 'CSS Math Functions' }
]
</script>

<style scoped>
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  margin: 1rem 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.checkbox-label:hover {
  border-color: #3b82f6;
  background: #f8fafc;
}

.checkbox {
  width: 18px;
  height: 18px;
  accent-color: #3b82f6;
}

.empty-state {
  color: #94a3b8;
  font-style: italic;
  text-align: center;
  padding: 2rem;
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
}

.code-preview {
  margin-top: 2rem;
  padding: 1rem;
  background: #f1f5f9;
  border-radius: 8px;
}

.code-preview h4 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

@media (prefers-color-scheme: dark) {
  .checkbox-label {
    background: #1e293b;
    border-color: #334155;
  }
  
  .checkbox-label:hover {
    border-color: #3b82f6;
    background: #334155;
  }
  
  .empty-state {
    background: #334155;
    border-color: #475569;
    color: #94a3b8;
  }
  
  .code-preview {
    background: #334155;
  }
}
</style>
