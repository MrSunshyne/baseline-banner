# Vue 3 Example - Baseline Banner

A comprehensive Vue 3 example showcasing the `@baseline-banner/vue` package with modern Vue features including script setup, TypeScript, and reactive composition.

## 🚀 Features

- ✅ **Vue 3** with Composition API and `<script setup>`
- ✅ **TypeScript** for full type safety
- ✅ **Vite** for fast development and building
- ✅ **Interactive Examples** with real-time feature selection
- ✅ **Reactive Demos** showing dynamic baseline checking
- ✅ **Modern CSS Features** showcase
- ✅ **Dark Mode** support
- ✅ **Responsive Design** with CSS Grid

## 📦 Installation & Setup

```bash
# From the examples/vue3 directory
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🎯 What's Included

### Basic Examples
- Single feature checking with `flexbox`
- Multiple feature checking with arrays
- Default styling and component behavior

### Interactive Features
- **Dynamic Feature Selection**: Check/uncheck features with real-time updates
- **Code Preview**: See the Vue code that generates each example
- **Feature Grid**: Explore 10+ modern CSS features

### Reactive Examples
- **Live Input**: Add/remove features dynamically with text input
- **Watch Updates**: See reactivity in action with update counters
- **Feature Tags**: Visual representation with removal buttons

### Showcase Grid
Dedicated cards for popular CSS features:
- CSS Container Queries
- CSS Cascade Layers  
- CSS Nesting
- CSS Subgrid
- CSS Custom Properties
- CSS Logical Properties

## 📝 Example Usage

### Basic Component Usage
```vue
<template>
  <!-- Single feature -->
  <BaselineChecker :features="['flexbox']" />
  
  <!-- Multiple features -->
  <BaselineChecker :features="['grid', 'css-nesting']" />
</template>

<script setup lang="ts">
import { BaselineChecker } from '@baseline-banner/vue'
</script>
```

### Reactive Example
```vue
<template>
  <BaselineChecker :features="selectedFeatures" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaselineChecker } from '@baseline-banner/vue'
import type { WebFeatureId } from '@baseline-banner/vue'

const selectedFeatures = ref<WebFeatureId[]>(['flexbox', 'grid'])

// Features update automatically when the ref changes
const addFeature = (feature: WebFeatureId) => {
  if (!selectedFeatures.value.includes(feature)) {
    selectedFeatures.value.push(feature)
  }
}
</script>
```

### TypeScript Support
```vue
<script setup lang="ts">
import type { WebFeatureId } from '@baseline-banner/vue'

// Fully typed feature IDs
const features: WebFeatureId[] = ['flexbox', 'grid']

// Type-safe feature validation
const isValidFeature = (feature: string): feature is WebFeatureId => {
  // Your validation logic here
  return true
}
</script>
```

## 🎨 Styling

The example includes:
- **Light/Dark Mode** support
- **Responsive Grid Layouts**
- **Custom CSS Variables**
- **Component-Scoped Styles**
- **Baseline Banner Default Styles** (auto-imported)

### Custom Styling Example
```vue
<style scoped>
/* Custom styling for your baseline checkers */
:deep(.baseline-checker) {
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

:deep(.baseline-status-supported) {
  background: linear-gradient(135deg, #10b981, #059669);
}
</style>
```

## 🔧 Configuration

### Vite Configuration
The example uses a standard Vite setup with:
- Vue 3 plugin
- TypeScript support
- Path aliases (`@/` for `src/`)
- Custom port (5174) to avoid conflicts

### TypeScript Configuration
- Strict mode enabled
- Vue SFC support
- Path mapping for clean imports
- Latest ESNext features

## 🚀 Development Workflow

1. **Start Development**: `pnpm dev`
2. **Make Changes**: Edit files in `src/`
3. **Hot Reload**: Changes reflect instantly
4. **Type Check**: `pnpm type-check`
5. **Build**: `pnpm build`

## 📱 Responsive Features

The example is fully responsive:
- **Mobile-First Design**
- **Flexible Grid Layouts**
- **Touch-Friendly Interactions**
- **Optimized for All Screen Sizes**

## 🎛️ Interactive Controls

- **Feature Checkboxes**: Toggle features on/off
- **Text Input**: Add features by name
- **Remove Buttons**: Click × to remove features
- **Clear All**: Reset selections
- **Real-time Updates**: See changes immediately

## 🔍 Advanced Features

### Watch Updates
```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const features = ref<WebFeatureId[]>(['flexbox'])
const updateCount = ref(0)

watch(features, (newFeatures) => {
  updateCount.value++
  console.log('Features updated:', newFeatures)
}, { deep: true })
</script>
```

### Computed Properties
```vue
<script setup lang="ts">
import { computed } from 'vue'

const features = ref(['flexbox', 'grid'])
const featureCount = computed(() => features.value.length)
const hasModernFeatures = computed(() => 
  features.value.some(f => f.includes('css-'))
)
</script>
```

## 🎯 Best Practices Demonstrated

1. **Script Setup Syntax**: Modern Vue 3 composition
2. **TypeScript Integration**: Full type safety
3. **Reactive State Management**: Using refs and computed
4. **Component Composition**: Reusable components
5. **CSS-in-Vue**: Scoped styles with deep selectors
6. **Performance**: Efficient reactivity patterns

## 🔗 Links

- [Baseline Banner Documentation](../../README.md)
- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://typescriptlang.org/)

## 📄 License

MIT © [Sandeep Ramgolam](https://github.com/MrSunshyne)
