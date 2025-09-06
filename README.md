# 🎯 Baseline Banner

A set of framework-agnostic components for displaying CSS feature baseline compatibility information using [MDN's web-features data](https://github.com/web-platform-dx/web-features).

## 📦 Packages

| Package | Description | Version |
|---------|-------------|---------|
| [`@baseline-banner/core`](./packages/core) | Core API and TypeScript types | ![npm](https://img.shields.io/npm/v/@baseline-banner/core) |
| [`@baseline-banner/styles`](./packages/styles) | 🎨 Shared CSS styles for all frameworks | ![npm](https://img.shields.io/npm/v/@baseline-banner/styles) |
| [`@baseline-banner/vue`](./packages/vue) | Vue 3 component | ![npm](https://img.shields.io/npm/v/@baseline-banner/vue) |
| [`@baseline-banner/react`](./packages/react) | React component | ![npm](https://img.shields.io/npm/v/@baseline-banner/react) |

## 🚀 Quick Start

### Vue 3

```bash
npm install @baseline-banner/vue @baseline-banner/styles
```

```vue
<script setup>
import { BaselineChecker } from '@baseline-banner/vue'
import '@baseline-banner/styles'
</script>

<template>
  <BaselineChecker feature-name="container-queries" />
</template>
```

### React

```bash
npm install @baseline-banner/react @baseline-banner/styles
```

```tsx
import { BaselineChecker } from '@baseline-banner/react'
import '@baseline-banner/styles'

function App() {
  return <BaselineChecker featureName="container-queries" />
}
```

## 🧪 Examples

Interactive examples are available in the [`examples/`](./examples) directory:

- **[Vue 3 Example](./examples/vue3)** - http://localhost:5174
- **[React Example](./examples/react)** - http://localhost:5176

## 🎨 Styling Strategy

All packages use the centralized [`@baseline-banner/styles`](./packages/styles) package for consistent styling across frameworks:

- ✅ **Consistent appearance** across Vue, React, and future frameworks
- ✅ **Single source of truth** for all styling
- ✅ **Easy customization** by overriding CSS classes
- ✅ **Framework-agnostic** CSS that works everywhere

## 📚 Framework Support

| Framework | Package | Status |
|-----------|---------|---------|
| Vue 3 | `@baseline-banner/vue` | ✅ Available |
| React | `@baseline-banner/react` | ✅ Available |
| Svelte | `@baseline-banner/svelte` | 🔄 Planned |
| Angular | `@baseline-banner/angular` | 🔄 Planned |

## 🛠️ Development

This is a monorepo managed with pnpm workspaces.

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run all examples
pnpm dev

# Run specific example
cd examples/vue3 && pnpm dev
cd examples/react && pnpm dev
```

### Local Development Workflow

For testing packages locally without publishing:

```bash
# Build packages
pnpm build

# Create local tarballs
pnpm pack:local

# Clean tarballs
pnpm pack:clean
```

## 🏗️ Architecture

```
packages/
├── core/           # Core API logic & TypeScript types
├── styles/         # Shared CSS for all frameworks
├── vue/           # Vue 3 component wrapper
├── react/         # React component wrapper
└── examples/
    ├── vue3/      # Vue 3 interactive demo
    └── react/     # React interactive demo
```

### Design Principles

1. **Framework Consistency**: Identical API across all frameworks
2. **Centralized Styles**: Single CSS package for visual consistency
3. **TypeScript First**: Full type safety everywhere
4. **Developer Experience**: Simple imports, clear documentation
5. **Performance**: Minimal bundle size, efficient rendering

## 🎯 Features

- **Real-time Data** - Fetches latest compatibility info from MDN
- **Baseline Status** - Shows high/low/limited/unknown baseline status
- **Feature Details** - Displays feature descriptions and availability dates
- **Loading States** - Proper loading and error handling
- **TypeScript** - Full type safety and IntelliSense
- **Responsive** - Works on all screen sizes
- **Accessible** - Semantic HTML and proper ARIA attributes

## 📖 Available Features

Common feature IDs you can use:

- `container-queries`
- `css-grid`
- `flexbox`
- `css-transforms`
- `web-components`
- `css-custom-properties`
- `css-subgrid`
- `css-cascade-layers`
- `css-has`
- `css-color-mix`

For a complete list, see the [web-features repository](https://github.com/web-platform-dx/web-features).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT © [Sandeep Ramgolam](https://github.com/MrSunshyne)

## 🔗 Links

- [MDN Web Platform Features](https://github.com/web-platform-dx/web-features)
- [Web Platform Baseline](https://web.dev/baseline/)
- [Can I Use](https://caniuse.com)