# @baseline-banner/vue

Vue 3 component for checking web feature baseline compatibility.

## Installation

```bash
npm install @baseline-banner/vue
```

## Usage

### Individual Component Import

```vue
<template>
  <div>
    <BaselineChecker feature-name="flexbox" />
    <BaselineChecker feature-name="container-queries" />
    <BaselineChecker feature-name="popover" />
  </div>
</template>

<script setup>
import { BaselineChecker } from '@baseline-banner/vue'
</script>
```

### Global Plugin Registration

```typescript
// main.ts
import { createApp } from 'vue'
import BaselineBannerVue from '@baseline-banner/vue'
import App from './App.vue'

const app = createApp(App)
app.use(BaselineBannerVue)
app.mount('#app')
```

Then use anywhere in your app:

```vue
<template>
  <BaselineChecker feature-name="grid" />
</template>
```

## Component Props

- `feature-name` (required): Web feature ID with full TypeScript intellisense

## Features

- ✅ **Full TypeScript Support** - Autocomplete for 1080+ web features
- 🎨 **Styled by Default** - Clean, accessible design
- ⚡ **Loading States** - Built-in loading and error handling
- 📱 **Responsive** - Works on all screen sizes
- 🎯 **Real-time Data** - Always up-to-date baseline information

## Styling

The component comes with default styles but can be customized:

```vue
<BaselineChecker 
  feature-name="flexbox" 
  class="my-custom-baseline-checker" 
/>

<style>
.my-custom-baseline-checker {
  /* Override default styles */
}
</style>
```

## Popular Feature Examples

```vue
<template>
  <!-- CSS Features -->
  <BaselineChecker feature-name="flexbox" />
  <BaselineChecker feature-name="grid" />
  <BaselineChecker feature-name="container-queries" />
  <BaselineChecker feature-name="nesting" />
  
  <!-- Web APIs -->
  <BaselineChecker feature-name="popover" />
  <BaselineChecker feature-name="dialog" />
  <BaselineChecker feature-name="view-transitions" />
  
  <!-- Modern Features -->
  <BaselineChecker feature-name="has" />
  <BaselineChecker feature-name="scroll-timeline" />
</template>
```

## Requirements

- Vue 3.0+
- Modern browser with fetch API support
