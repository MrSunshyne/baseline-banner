# @baseline-banner/core

Core TypeScript library for checking web feature baseline compatibility.

## Installation

```bash
npm install @baseline-banner/core
```

## Usage

```typescript
import { 
  fetchBaselineData, 
  getBaselineStatus, 
  formatDate,
  type WebFeatureId 
} from '@baseline-banner/core'

// Fetch data for a specific feature
const feature = await fetchBaselineData('flexbox')

// Get status information
const status = getBaselineStatus(feature)
console.log(status.message) // "Widely available"
console.log(status.isAvailable) // true
console.log(status.className) // "high"

// Format dates
if (status.dates?.availableSince) {
  console.log(formatDate(status.dates.availableSince)) // "September 2015"
}
```

## API

### `fetchBaselineData(featureId: WebFeatureId)`

Fetches baseline compatibility data from the Web Platform Dashboard API.

### `getBaselineStatus(feature: WebPlatformFeature | null)`

Returns standardized status information including message, CSS class, and availability dates.

### `formatDate(dateString: string)`

Formats ISO date strings to human-readable format (e.g., "September 2015").

### Types

- `WebFeatureId` - Union type of all 1080+ web feature IDs
- `WebPlatformFeature` - Feature data structure from the API
- `BaselineStatus` - Processed status information

## TypeScript Support

The library provides full TypeScript intellisense for all web feature names:

```typescript
// Autocomplete will show all 1080+ available features
const feature: WebFeatureId = 'flexbox' // ✅
const invalid: WebFeatureId = 'invalid' // ❌ Type error
```

Popular feature categories:
- **CSS Layout**: `flexbox`, `grid`, `container-queries`, `subgrid`
- **Modern CSS**: `nesting`, `has`, `cascade-layers`, `view-transitions`
- **Web APIs**: `popover`, `dialog`, `web-share`, `clipboard-api`
- **Performance**: `navigation-api`, `speculation-rules`, `priority-hints`
