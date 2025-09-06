# @baseline-banner/styles

Shared CSS styles for baseline-banner components across all frameworks.

## Installation

```bash
npm install @baseline-banner/styles
# or
pnpm add @baseline-banner/styles  
# or
yarn add @baseline-banner/styles
```

## Usage

### Import in CSS/SCSS

```css
@import '@baseline-banner/styles';
```

### Import in JavaScript/TypeScript

```js
import '@baseline-banner/styles'
```

### Import in HTML

```html
<link rel="stylesheet" href="node_modules/@baseline-banner/styles/dist/index.css">
```

## Included Styles

This package provides consistent styling for all baseline-banner components including:

- **Container styles** (`.baseline-checker`)
- **Loading states** (`.loading-message`)  
- **Error states** (`.error-message`)
- **Feature headers** (`.feature-header`, `.feature-name`)
- **Baseline badges** (`.baseline-badge`) with status variants:
  - `.high` - High baseline (widely available)
  - `.low` - Low baseline (newly available)
  - `.limited` - Limited baseline
  - `.unknown` - Unknown status
- **Feature descriptions** (`.feature-description`)
- **Availability information** (`.availability-info`, `.availability-date`)

## Customization

You can override the default styles by importing your custom CSS after the baseline styles:

```js
import '@baseline-banner/styles'
import './my-custom-baseline-styles.css'
```

## Framework Support

These styles are used by:
- `@baseline-banner/vue`
- `@baseline-banner/react`
- Future framework implementations

## License

MIT
