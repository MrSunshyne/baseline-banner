# Development Guide

This guide covers local development workflow for the Baseline Banner packages and how to consume them in other projects before publishing to npm.

## 📦 Package Structure

```
@baseline-banner/
├── core/          # Core functionality and types
└── vue/           # Vue 3 component
```

## 🛠️ Local Development Workflow

### Prerequisites

- Node.js 18+
- pnpm 9+

### Development Scripts

The monorepo includes convenient scripts for local development:

#### `pnpm pack:local`
Creates production-ready tarball packages for local consumption:
- Builds all packages with latest changes
- Creates `baseline-banner-core-0.1.0.tgz`
- Creates `baseline-banner-vue-0.1.0.tgz` (with workspace dependencies resolved)
- Automatically handles workspace dependency resolution

#### `pnpm pack:clean`
Removes generated tarball files:
- Cleans up `*.tgz` files from all package directories

#### `pnpm build`
Builds all packages in the monorepo

#### `pnpm dev`
Runs all packages in watch mode for development

### Making Changes

1. **Make your changes** to source code in `packages/core/` or `packages/vue/`

2. **Generate fresh packages:**
   ```bash
   pnpm pack:local
   ```

3. **Update your consuming project** (see framework-specific instructions below)

4. **Test your changes** in the consuming project

5. **Repeat** as needed during development

6. **Clean up** when done (optional):
   ```bash
   pnpm pack:clean
   ```

## 🚀 Consuming Packages in Other Projects

### Nuxt 3 Projects

#### Setup

1. **Add packages to your Nuxt project's `package.json`:**
   ```json
   {
     "dependencies": {
       "@baseline-banner/core": "file:/path/to/baseline-banner/packages/core/baseline-banner-core-0.1.0.tgz",
       "@baseline-banner/vue": "file:/path/to/baseline-banner/packages/vue/baseline-banner-vue-0.1.0.tgz"
     },
     "pnpm": {
       "overrides": {
         "@baseline-banner/core": "file:/path/to/baseline-banner/packages/core/baseline-banner-core-0.1.0.tgz"
       }
     }
   }
   ```

2. **Add CSS to your `nuxt.config.ts`:**
   ```typescript
   export default defineNuxtConfig({
     css: [
       "@/styles/global.css", // your existing styles
       "@baseline-banner/vue/style.css" // baseline banner styles
     ],
     // ... rest of your config
   })
   ```

3. **Install dependencies:**
   ```bash
   pnpm install
   ```

#### Usage

```vue
<template>
  <div>
    <h1>My App</h1>
    <BaselineChecker :features="['grid', 'flexbox', 'css-container-queries']" />
  </div>
</template>

<script setup>
import { BaselineChecker } from '@baseline-banner/vue'
</script>
```

#### Development Workflow

When working with both repositories:

1. **In the baseline-banner repo:**
   ```bash
   cd /path/to/baseline-banner
   # Make your changes...
   pnpm pack:local
   ```

2. **In your Nuxt project:**
   ```bash
   cd /path/to/your-nuxt-project
   pnpm install  # Picks up the new tarball
   ```

3. **Test your changes** in the Nuxt development server

### Other Frameworks

*Coming soon: React, Svelte, Angular integration guides*

## 🎯 Component API

### BaselineChecker

**Props:**
- `features: string[]` - Array of web feature IDs to check (required)

**Example feature IDs:**
- `'grid'` - CSS Grid Layout
- `'flexbox'` - CSS Flexible Box Layout
- `'css-container-queries'` - CSS Container Queries
- `'css-nesting'` - CSS Nesting
- And many more... (see types for full list)

**Example:**
```vue
<BaselineChecker 
  :features="['grid', 'flexbox', 'css-container-queries']" 
/>
```

## 🎨 Styling

The Vue component comes with default styles that include:

- **Baseline Status Badges:**
  - 🟢 High (Widely Available) - Green badge
  - 🟡 Low (Newly Available) - Yellow badge  
  - 🔴 Limited (Limited Availability) - Red badge
  - ⚪ Unknown - Gray badge

- **Loading States:** Animated spinners
- **Error States:** Error message styling
- **Typography:** Clean, readable text hierarchy

### Customizing Styles

You can override the default styles by targeting the CSS classes:

```css
/* Override baseline badge colors */
.baseline-badge.high {
  background-color: #your-color;
  color: #your-text-color;
}

/* Override the main container */
.baseline-checker {
  border: 2px solid #your-border;
  border-radius: 12px;
}
```

## 🔧 Troubleshooting

### Common Issues

**"Missing specifier" errors:**
- Ensure you're using the latest tarball with proper exports
- Check that CSS import is using the correct path (`@baseline-banner/vue/style.css`)

**Workspace dependency errors:**
- Make sure you're using `pnpm overrides` in your consuming project
- Verify the tarball paths are absolute and correct

**Styles not loading:**
- Confirm CSS is imported in `nuxt.config.ts`
- Check browser developer tools for failed CSS requests

**Stale packages:**
- Run `pnpm pack:local` to regenerate fresh tarballs
- Use `pnpm install --force` in consuming project if needed

### Getting Help

If you encounter issues:
1. Check the troubleshooting section above
2. Verify you're following the exact setup steps
3. Ensure all file paths are correct and absolute
4. Check that all dependencies are properly installed

## 📝 Development Notes

- **Tarballs are gitignored** - They're temporary build artifacts
- **Always use absolute paths** for tarball references
- **The `pack:local` script handles workspace dependencies** - No manual editing needed
- **CSS must be imported separately** - It's not bundled with the JavaScript
- **pnpm overrides are required** - To resolve workspace dependencies in external projects

---

*This guide will be expanded as we add support for more frameworks and features.*
