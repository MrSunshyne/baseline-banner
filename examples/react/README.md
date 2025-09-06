# Baseline Banner React Example

Interactive React application demonstrating the `@baseline-banner/react` component with Vite and TypeScript.

## Running the Example

```bash
cd examples/react
pnpm install
pnpm dev
```

Visit http://localhost:5176

## Features Demonstrated

### 1. Static Examples
- Container Queries
- CSS Grid  
- Flexbox
- CSS Transforms
- Web Components
- CSS Custom Properties

### 2. Interactive Multi-Selection
- Checkbox-based feature selection
- Dynamic component rendering
- Select all/clear all functionality

### 3. Reactive Feature Testing
- Dropdown feature selection
- Random feature button
- Custom feature input field
- Real-time baseline data fetching

## Project Structure

```
examples/react/
├── src/
│   ├── components/
│   │   ├── InteractiveExamples.tsx
│   │   └── ReactiveExample.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── style.css
├── public/
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Usage Examples

### Basic Component
```tsx
import { BaselineChecker } from '@baseline-banner/react'
import '@baseline-banner/styles'

<BaselineChecker featureName="container-queries" />
```

### Reactive Component
```tsx
const [feature, setFeature] = useState<WebFeatureId>('css-grid')
<BaselineChecker featureName={feature} />
```

### Multiple Features
```tsx
{selectedFeatures.map((feature) => (
  <BaselineChecker key={feature} featureName={feature} />
))}
```

## Technologies

- **React 18** - Latest React with hooks
- **TypeScript 5** - Full type safety
- **Vite 5** - Fast build tool and dev server
- **@baseline-banner/react** - Baseline compatibility component
- **@baseline-banner/styles** - Shared component styles
