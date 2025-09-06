import fs from 'fs'
import { features } from 'web-features'

// Extract all feature IDs
const featureIds = Object.keys(features)

// Generate TypeScript file with explicit union type
const typeContent = `// Auto-generated file - do not edit manually
// Generated from web-features package (${featureIds.length} features)

export type WebFeatureId = 
${featureIds.map(id => `  | '${id}'`).join('\n')}

// Popular features for reference:
// CSS Layout: 'flexbox', 'grid', 'container-queries', 'subgrid'
// Modern CSS: 'nesting', 'has', 'cascade-layers', 'custom-properties'  
// Web APIs: 'popover', 'dialog', 'web-share', 'clipboard-api'
// Animation: 'scroll-timeline', 'view-transitions', 'animation-timeline'
`

fs.writeFileSync('./src/types.ts', typeContent)
console.log(`✅ Generated TypeScript definitions for ${featureIds.length} web features`)
