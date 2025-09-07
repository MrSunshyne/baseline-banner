<template>
  <div id="app">
    <header>
      <h1>🎨 Baseline Banner Theme Playground</h1>
      <p>Experiment with different themes for the baseline-banner component</p>
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

        <div class="control-group">
          <label for="theme-select">Choose a Theme:</label>
          <select id="theme-select" v-model="selectedTheme">
            <option value="default">Default</option>
            <option value="dark">Dark</option>
            <option value="minimal">Minimal</option>
            <option value="colorful">Colorful</option>
          </select>
        </div>
      </section>

      <section class="preview">
        <h2>Current Preview</h2>
        <BaselineBanner 
          :feature-name="selectedFeature" 
          :theme="selectedTheme" 
        />
      </section>

      <section class="theme-showcase">
        <h2>All Themes Showcase</h2>
        <div class="theme-grid">
          <div class="theme-example">
            <h3>Default Theme</h3>
            <BaselineBanner feature-name="grid" theme="default" />
          </div>
          
          <div class="theme-example">
            <h3>Dark Theme</h3>
            <BaselineBanner feature-name="flexbox" theme="dark" />
          </div>
          
          <div class="theme-example">
            <h3>Minimal Theme</h3>
            <BaselineBanner feature-name="autonomous-custom-elements" theme="minimal" />
          </div>
          
          <div class="theme-example">
            <h3>Colorful Theme</h3>
            <BaselineBanner feature-name="nesting" theme="colorful" />
          </div>
        </div>
      </section>

      <section class="documentation">
        <h2>🛠️ Theme Development</h2>
        <div class="docs-content">
          <p>
            This playground allows you to experiment with different themes for the baseline-banner component.
            The component uses styles from <code>@baseline-banner/styles</code> as the foundation.
          </p>
          
          <h3>Available Themes:</h3>
          <ul>
            <li><strong>Default:</strong> The standard theme with light colors and subtle shadows</li>
            <li><strong>Dark:</strong> Dark background with light text for dark mode interfaces</li>
            <li><strong>Minimal:</strong> Clean, borderless design for subtle integration</li>
            <li><strong>Colorful:</strong> Vibrant gradient background for eye-catching displays</li>
          </ul>

          <h3>Creating Custom Themes:</h3>
          <p>
            Modify the <code>BaselineBanner.vue</code> component to add your own theme variations.
            Each theme applies custom styles while maintaining the base functionality from the core package.
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaselineBanner from './components/BaselineBanner.vue'
import type { WebFeatureId } from '@baseline-banner/core'

type ThemeType = 'default' | 'dark' | 'minimal' | 'colorful'

const selectedFeature = ref<WebFeatureId>('grid')
const selectedTheme = ref<ThemeType>('default')
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
  background: #f8fafc;
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
  color: #374151;
}

.control-group select {
  padding: 0.5rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  font-size: 1rem;
  min-width: 150px;
}

.control-group select:focus {
  outline: none;
  border-color: #2563eb;
}

.preview {
  text-align: center;
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
