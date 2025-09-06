<template>
  <div class="container">
    <header>
      <h1>🎯 Baseline Banner Vue 3 Examples</h1>
      <p>
        Interactive examples showcasing the <code>@baseline-banner/vue</code> package 
        with Vue 3 and script setup syntax.
      </p>
    </header>

    <main>
      <!-- Basic Usage -->
      <section class="section">
        <h2>Basic Usage</h2>
        <p>
          Simple single-feature checker with default styling:
        </p>
        
        <BaselineChecker feature-name="flexbox" />
        <BaselineChecker feature-name="if" />
        <BaselineChecker feature-name="popover" />
        
        <div class="code-block">
&lt;BaselineChecker feature-name="flexbox" /&gt;
        </div>
      </section>

      <!-- Modern CSS Features Grid -->
      <section class="section">
        <h2>Modern CSS Features Showcase</h2>
        <p>
          Explore various modern CSS features and their browser support:
        </p>
        
        <div class="feature-grid">
          <div class="feature-card">
            <h3>CSS Container Queries</h3>
            <p>Responsive design based on container size instead of viewport.</p>
            <BaselineChecker feature-name="container-queries" />
          </div>
          
          <div class="feature-card">
            <h3>CSS Cascade Layers</h3>
            <p>Control CSS specificity with explicit layer declarations.</p>
            <BaselineChecker feature-name="cascade-layers" />
          </div>
          
          <div class="feature-card">
            <h3>CSS Nesting</h3>
            <p>Write nested CSS rules like in Sass, natively in CSS.</p>
            <BaselineChecker feature-name="nesting" />
          </div>
          
          <div class="feature-card">
            <h3>CSS Subgrid</h3>
            <p>Advanced grid layouts with inherited grid definitions.</p>
            <BaselineChecker feature-name="subgrid" />
          </div>
          
          <div class="feature-card">
            <h3>CSS Custom Properties</h3>
            <p>Native CSS variables for dynamic styling.</p>
            <BaselineChecker feature-name="custom-properties" />
          </div>
          
          <div class="feature-card">
            <h3>CSS Logical Properties</h3>
            <p>Writing-mode aware properties for international layouts.</p>
            <BaselineChecker feature-name="logical-properties" />
          </div>
        </div>
      </section>

      <!-- Interactive Examples -->
      <InteractiveExamples />
      
      <!-- Reactive Example -->
      <ReactiveExample />
    </main>

    <footer style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b;">
      <p>
        Built with Vue 3 + TypeScript + Vite<br>
        <a href="https://github.com/MrSunshyne/baseline-banner" style="color: #3b82f6;">
          @baseline-banner/vue
        </a>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { BaselineChecker } from '@baseline-banner/vue'
import InteractiveExamples from './components/InteractiveExamples.vue'
import ReactiveExample from './components/ReactiveExample.vue'
</script>
