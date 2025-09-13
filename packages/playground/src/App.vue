<template>
  <div id="app">
    <header>
      <h1>Baseline Banner Theme Playground</h1>
    </header>

    <main>
      <section class="controls">
        <div>
          <label for="debug">Show debug information:</label>
          <input id="debug" type="checkbox" v-model="showDebug" />
        </div>
      </section>

      <section class="preview">
        <div class="theme-column">
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
      </div>
      <div class="theme-column"> 
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
      </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PlaygroundBaselineBanner from './components/PlaygroundBaselineBanner.vue'
import PlaygroundBaselineBannerWebDev from './components/PlaygroundBaselineBannerWebDev.vue'

const showDebug = ref(false)
</script>

