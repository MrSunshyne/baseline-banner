# Baseline Banner 🎯

A framework-agnostic library for checking web feature baseline compatibility. Built with TypeScript and designed to support multiple frontend frameworks.

## Packages

- **[@baseline-banner/core](./packages/core)** - Core TypeScript library with API logic
- **[@baseline-banner/vue](./packages/vue)** - Vue 3 component wrapper

## Features

- ✅ **1080+ Web Features** - Complete TypeScript intellisense for all web platform features
- 🌐 **Real-time Data** - Uses the official Web Platform Dashboard API
- 🎯 **Framework Agnostic** - Core logic can be wrapped for any framework
- 📦 **Tree Shakeable** - Only bundle what you use
- 🔒 **Type Safe** - Full TypeScript support with explicit union types

## Quick Start

### Vue 3

```bash
npm install @baseline-banner/vue
```

```vue
<template>
  <BaselineChecker feature-name="flexbox" />
  <BaselineChecker feature-name="container-queries" />
</template>

<script setup>
import { BaselineChecker } from '@baseline-banner/vue'
</script>
```

### Core Library (Framework Agnostic)

```bash
npm install @baseline-banner/core
```

```typescript
import { fetchBaselineData, getBaselineStatus } from '@baseline-banner/core'

const feature = await fetchBaselineData('flexbox')
const status = getBaselineStatus(feature)
console.log(status.message) // "Widely available"
```

## Development

This is a pnpm workspace monorepo:

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Generate types from latest web-features
pnpm generate-types

# Run tests
pnpm test
```

## Roadmap

- [x] Vue wrapper (`@baseline-banner/vue`)
- [ ] React wrapper (`@baseline-banner/react`)
- [ ] Svelte wrapper (`@baseline-banner/svelte`)
- [ ] Angular wrapper (`@baseline-banner/angular`)
- [ ] Solid wrapper (`@baseline-banner/solid`)

## Data Source

This library uses the [Web Platform Dashboard](https://webstatus.dev/) API, which is maintained by the Chrome team and provides official baseline compatibility data as referenced in [web.dev baseline documentation](https://web.dev/articles/web-platform-dashboard-baseline).

## License

MIT © [Sandeep Ramgolam](https://github.com/MrSunshyne)
