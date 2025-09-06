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

## Installation & Usage

### Vue 3

```bash
npm install @baseline-banner/vue
```

```vue
<template>
  <div>
    <!-- Single feature -->
    <BaselineChecker :features="['flexbox']" />
    
    <!-- Multiple features -->
    <BaselineChecker :features="['grid', 'css-container-queries', 'css-nesting']" />
  </div>
</template>

<script setup>
import { BaselineChecker } from '@baseline-banner/vue'
// Import styles
import '@baseline-banner/vue/style.css'
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

## Project Structure

```
@baseline-banner/
├── packages/
│   ├── core/                 # Core TypeScript library
│   │   ├── src/
│   │   │   ├── api.ts       # API logic and types  
│   │   │   ├── types.ts     # Generated feature IDs (1080+)
│   │   │   └── index.ts     # Main exports
│   │   └── package.json     # @baseline-banner/core
│   │
│   └── vue/                  # Vue 3 wrapper
│       ├── src/
│       │   ├── BaselineChecker.vue  # Main component
│       │   └── index.ts     # Vue plugin exports  
│       └── package.json     # @baseline-banner/vue
│
└── examples/
    └── vue3/                 # Vue 3 example with TypeScript & Vite
        ├── src/
        │   ├── components/   # Interactive demo components
        │   ├── App.vue      # Main application
        │   └── main.ts      # Entry point
        └── package.json     # Example dependencies
```

## Development

This is a pnpm workspace monorepo. For detailed local development instructions, see [DEVELOPMENT.md](./DEVELOPMENT.md).

**Quick commands:**

```bash
# Install dependencies
pnpm install

# Build all packages  
pnpm build

# Generate fresh tarballs for local testing
pnpm pack:local

# Generate types from latest web-features
pnpm generate-types
```

## Framework Support

- ✅ **Vue 3** - Available now
- 🚧 **React** - Coming soon  
- 🚧 **Svelte** - Planned
- 🚧 **Angular** - Planned
- 🚧 **Solid** - Planned

Want to add support for your favorite framework? See [DEVELOPMENT.md](./DEVELOPMENT.md) and open an issue!

## Data Source

This library uses the [Web Platform Dashboard](https://webstatus.dev/) API, which is maintained by the Chrome team and provides official baseline compatibility data as referenced in [web.dev baseline documentation](https://web.dev/articles/web-platform-dashboard-baseline).

## 🎯 Examples

Live examples and demos are available in the [`examples/`](./examples/) directory:

- **[Vue 3](./examples/vue3/)** - Complete Vue 3 example with TypeScript, interactive demos, and modern CSS features showcase

More framework examples coming soon (React, Angular, Svelte)!

## License

MIT © [Sandeep Ramgolam](https://github.com/MrSunshyne)
