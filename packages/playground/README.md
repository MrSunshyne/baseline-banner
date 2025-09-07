# 🎨 Baseline Banner Theme Playground

A development environment for creating and testing themes for the baseline-banner components.

## Features

- 🎯 Interactive theme development
- 🔄 Live preview of different themes
- 📱 Responsive design testing
- 🎨 Multiple built-in theme examples
- 🛠️ Easy customization workflow

## Getting Started

### Prerequisites

Make sure you have dependencies installed:

```bash
# From the root of the monorepo
pnpm install
```

### Development

Start the development server:

```bash
# From the root of the monorepo
cd packages/playground
pnpm dev
```

Or from the root:

```bash
pnpm --filter @baseline-banner/playground dev
```

This will start a Vite development server at `http://localhost:5174`.

## Available Themes

### Default Theme
- Light background with subtle shadows
- Standard color palette
- Good for most use cases

### Dark Theme  
- Dark background with light text
- Perfect for dark mode interfaces
- High contrast for accessibility

### Minimal Theme
- Clean, borderless design
- Transparent background
- Subtle integration with existing designs

### Colorful Theme
- Vibrant gradient backgrounds
- Eye-catching design
- Great for marketing pages

## Creating Custom Themes

1. **Modify the BaselineBanner component**: Edit `src/components/BaselineBanner.vue`
2. **Add new theme styles**: Create new CSS classes in the `<style>` section
3. **Update theme options**: Add your theme to the theme selector in `App.vue`
4. **Test interactively**: Use the playground interface to test your theme

### Theme Structure

Each theme follows this pattern:

```vue
<style scoped>
.baseline-banner.theme-yourtheme .baseline-checker {
  /* Your custom styles here */
}

.baseline-banner.theme-yourtheme .feature-name {
  /* Custom feature name styles */
}

.baseline-banner.theme-yourtheme .baseline-badge {
  /* Custom badge styles */
}
</style>
```

## Dependencies

- **@baseline-banner/core**: Core functionality and API
- **@baseline-banner/styles**: Base CSS styles
- **Vue 3**: Component framework
- **Vite**: Build tool and dev server

## Project Structure

```
packages/playground/
├── src/
│   ├── components/
│   │   └── BaselineBanner.vue    # Main component with themes
│   ├── App.vue                   # Demo application
│   ├── main.ts                   # App initialization
│   └── style.css                 # Global styles
├── package.json
├── vite.config.ts
└── README.md
```

## Contributing

When developing themes:

1. Keep the base functionality intact
2. Ensure themes work across different feature types
3. Test with various screen sizes
4. Consider accessibility (contrast, focus states)
5. Document any new theme additions

## Available Web Features for Testing

The playground includes several web features for testing:

- `grid`: CSS Grid Layout
- `flexbox`: CSS Flexible Box Layout  
- `autonomous-custom-elements`: Web Components Custom Elements
- `nesting`: CSS Nesting
- `scroll-snap`: CSS Scroll Snap

These cover different baseline statuses (high, low, limited) to ensure themes work across all states.
