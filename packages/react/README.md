# @baseline-banner/react

React component for checking CSS feature baseline compatibility using MDN's web-features data.

## Installation

```bash
npm install @baseline-banner/react @baseline-banner/styles
# or
pnpm add @baseline-banner/react @baseline-banner/styles
# or
yarn add @baseline-banner/react @baseline-banner/styles
```

## Usage

### Basic Usage

```tsx
import { BaselineChecker } from '@baseline-banner/react'
import '@baseline-banner/styles'

function App() {
  return (
    <div>
      <BaselineChecker featureName="container-queries" />
    </div>
  )
}
```

### With Custom Styling

```tsx
import { BaselineChecker } from '@baseline-banner/react'
import '@baseline-banner/styles'

function App() {
  return (
    <BaselineChecker 
      featureName="css-grid" 
      className="my-custom-class" 
    />
  )
}
```

### Reactive Usage

```tsx
import { useState } from 'react'
import { BaselineChecker, type WebFeatureId } from '@baseline-banner/react'
import '@baseline-banner/styles'

function App() {
  const [feature, setFeature] = useState<WebFeatureId>('flexbox')

  return (
    <div>
      <select value={feature} onChange={(e) => setFeature(e.target.value as WebFeatureId)}>
        <option value="container-queries">Container Queries</option>
        <option value="css-grid">CSS Grid</option>
        <option value="flexbox">Flexbox</option>
      </select>
      
      <BaselineChecker featureName={feature} />
    </div>
  )
}
```

## API

### BaselineChecker Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `featureName` | `WebFeatureId` | Yes | The CSS feature to check compatibility for |
| `className` | `string` | No | Additional CSS class name for styling |

### Available Feature Names

Common feature names include:
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

## Styling

The component uses CSS classes that can be styled:

- `.baseline-checker` - Main container
- `.feature-header` - Header containing name and badge
- `.feature-name` - Feature name heading
- `.baseline-badge` - Baseline status badge
- `.feature-description` - Feature description text
- `.availability-info` - Availability date information
- `.loading-message` - Loading state message
- `.error-message` - Error state message

## TypeScript

This package includes full TypeScript support with exported types:

```tsx
import type { 
  BaselineCheckerProps, 
  WebFeatureId, 
  WebPlatformFeature,
  BaselineInfo 
} from '@baseline-banner/react'
```

## Examples

Check out the example implementation in the `/examples/react` directory of this repository.

## License

MIT
