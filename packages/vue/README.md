# @baseline-banner/vue

Vue 3 components for displaying web feature baseline compatibility with multiple theme options.

## Installation

```bash
npm install @baseline-banner/vue
# or
pnpm add @baseline-banner/vue
# or
yarn add @baseline-banner/vue
```

## Available Components

This package provides multiple themed components:

| Component | Description |
|-----------|-------------|
| `BaselineChecker` | Basic component (deprecated, use themed variants) |
| `BaselineBanner` | Default theme - clean, minimal design |
| `BaselineBannerMDN` | MDN-inspired theme with detailed browser support |
| `BaselineBannerWebDev` | web.dev-inspired theme with modern styling |

## Usage

### Default Theme

```vue
<template>
  <BaselineBanner feature-name="flexbox" />
</template>

<script setup>
import { BaselineBanner } from '@baseline-banner/vue'
</script>
```

### MDN Theme

The MDN theme provides a detailed view with browser support information:

```vue
<template>
  <BaselineBannerMDN feature-name="container-queries" />
</template>

<script setup>
import { BaselineBannerMDN } from '@baseline-banner/vue'
</script>
```

### web.dev Theme

The web.dev theme provides a modern, compact design:

```vue
<template>
  <BaselineBannerWebDev feature-name="nesting" />
</template>

<script setup>
import { BaselineBannerWebDev } from '@baseline-banner/vue'
</script>
```

### Global Plugin Registration

Register all components globally:

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
  <BaselineBanner feature-name="grid" />
  <BaselineBannerMDN feature-name="flexbox" />
  <BaselineBannerWebDev feature-name="popover" />
</template>
```

## Component Props

All banner components accept the same props:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `feature-name` | `WebFeatureId` | Yes | Web feature ID with full TypeScript intellisense |

## Sub-Components

For advanced customization, you can import individual sub-components:

### MDN Theme Sub-Components

```vue
<script setup>
import { 
  BaselineBadgeMDN,
  BaselineYearMDN,
  BrowserStatusMDN 
} from '@baseline-banner/vue'
</script>
```

### web.dev Theme Sub-Components

```vue
<script setup>
import { BaselineBadgeWebDev } from '@baseline-banner/vue'
</script>
```

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type { 
  WebFeatureId, 
  BaselineStatus, 
  WebPlatformFeature 
} from '@baseline-banner/vue'
```

## Features

- ✅ **Multiple Themes** - MDN, web.dev, and default themes included
- ✅ **Full TypeScript Support** - Autocomplete for 1080+ web features
- 🎨 **Styled by Default** - Clean, accessible designs
- ⚡ **Loading States** - Built-in loading and error handling
- 📱 **Responsive** - Works on all screen sizes
- 🎯 **Real-time Data** - Always up-to-date baseline information

## Popular Feature Examples

```vue
<template>
  <!-- CSS Features -->
  <BaselineBanner feature-name="flexbox" />
  <BaselineBannerMDN feature-name="grid" />
  <BaselineBannerWebDev feature-name="container-queries" />
  
  <!-- Modern CSS -->
  <BaselineBanner feature-name="nesting" />
  <BaselineBannerMDN feature-name="has" />
  
  <!-- Web APIs -->
  <BaselineBannerWebDev feature-name="popover" />
  <BaselineBanner feature-name="dialog" />
  <BaselineBannerMDN feature-name="view-transitions" />
</template>
```

## Requirements

- Vue 3.0+
- Modern browser with fetch API support

## License

MIT
