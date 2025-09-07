<template>
  <div id="app">
    <header>
      <h1>Baseline Banner Theme Playground</h1>
    </header>

    <main>
      <section class="controls">
        <div class="control-group">
          <label for="feature-select">Choose a Web Feature:</label>
          <select id="feature-select" v-model="selectedFeature">
            <option value="grid">CSS Grid</option>
            <option value="flexbox">CSS Flexbox</option>
            <option value="autonomous-custom-elements">Custom Elements</option>
            <option value="nesting">CSS Nesting</option>
            <option value="scroll-snap">CSS Scroll Snap</option>
          </select>
        </div>

        <div>
          <label for="debug">Show debug information:</label>
          <input id="debug" type="checkbox" v-model="showDebug" />
        </div>
      </section>

      <section class="preview">
        <h2>Default Theme</h2>
        <PlaygroundBaselineBanner 
          :feature-name="'font-size-adjust'" 
          :show-debug="showDebug"
        />
        <PlaygroundBaselineBanner 
          :feature-name="'if'" 
          :show-debug="showDebug"
        />
        <PlaygroundBaselineBanner 
          :feature-name="'grid'" 
          :show-debug="showDebug"
        />
        <h2>Web Dev Theme</h2>
        <PlaygroundBaselineBannerWebDev 
          :feature-name="'font-size-adjust'" 
          :show-debug="showDebug"
        />
        <PlaygroundBaselineBannerWebDev 
          :feature-name="'if'" 
          :show-debug="showDebug"
        />
        <PlaygroundBaselineBannerWebDev 
          :feature-name="'grid'" 
          :show-debug="showDebug"
        />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PlaygroundBaselineBanner from './components/PlaygroundBaselineBanner.vue'
import PlaygroundBaselineBannerWebDev from './components/PlaygroundBaselineBannerWebDev.vue'
import type { WebFeatureId } from '@baseline-banner/core'

type ThemeType = 'default' | 'dark' | 'minimal' | 'colorful'

const selectedFeature = ref<WebFeatureId>('font-size-adjust')
const selectedTheme = ref<ThemeType>('default')
const showDebug = ref(false)
</script>

<style scoped>
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 3rem;
}

header h1 {
  color: #2563eb;
  margin-bottom: 0.5rem;
}

header p {
  color: #64748b;
  font-size: 1.1rem;
}

section {
  margin-bottom: 3rem;
}

.controls {
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  font-weight: 600;
}

.control-group select {
  padding: 0.5rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  min-width: 150px;
}

.control-group select:focus {
  outline: none;
  border-color: #2563eb;
}

.preview {
  max-width: 700px;
}

.preview h2 {
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.theme-showcase h2 {
  text-align: center;
  color: #1f2937;
  margin-bottom: 2rem;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.theme-example h3 {
  text-align: center;
  color: #374151;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.documentation {
  background: #f1f5f9;
  padding: 2rem;
  border-radius: 12px;
}

.documentation h2 {
  color: #1e293b;
  margin-bottom: 1rem;
}

.documentation h3 {
  color: #475569;
  margin: 1.5rem 0 1rem 0;
}

.docs-content p {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.docs-content ul {
  color: #64748b;
  line-height: 1.6;
}

.docs-content ul li {
  margin-bottom: 0.5rem;
}

.docs-content code {
  background: #e2e8f0;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: center;
  }
  
  .theme-grid {
    grid-template-columns: 1fr;
  }
}
</style>
