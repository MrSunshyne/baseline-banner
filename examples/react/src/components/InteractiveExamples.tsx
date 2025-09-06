import React, { useState } from 'react'
import { BaselineChecker, type WebFeatureId } from '@baseline-banner/react'

const availableFeatures: WebFeatureId[] = [
  'container-queries',
  'grid',
  'flexbox',
  'transforms2d',
  'dialog',
  'custom-properties',
  'subgrid',
  'cascade-layers',
  'has',
  'color-mix'
]

const InteractiveExamples: React.FC = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<WebFeatureId[]>([
    'container-queries',
    'grid'
  ])

  const handleFeatureToggle = (feature: WebFeatureId) => {
    setSelectedFeatures(prev => 
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    )
  }

  const selectAll = () => {
    setSelectedFeatures([...availableFeatures])
  }

  const clearAll = () => {
    setSelectedFeatures([])
  }

  return (
    <div className="example-section">
      <h2 className="example-title">Interactive Multi-Feature Selection</h2>
      
      <div className="controls">
        <button onClick={selectAll}>Select All</button>
        <button onClick={clearAll}>Clear All</button>
        <span style={{ color: '#ccc' }}>
          {selectedFeatures.length} of {availableFeatures.length} features selected
        </span>
      </div>

      <div className="feature-checkboxes">
        {availableFeatures.map((feature) => (
          <label key={feature}>
            <input
              type="checkbox"
              checked={selectedFeatures.includes(feature)}
              onChange={() => handleFeatureToggle(feature)}
            />
            {feature.replace(/-/g, ' ').replace(/^./, c => c.toUpperCase())}
          </label>
        ))}
      </div>

      <div className="feature-grid">
        {selectedFeatures.map((feature) => (
          <BaselineChecker key={feature} featureName={feature} />
        ))}
      </div>

      <details style={{ marginTop: '1rem', textAlign: 'left' }}>
        <summary style={{ color: '#ccc', cursor: 'pointer' }}>View Code</summary>
        <pre style={{ background: '#1a1a1a', padding: '1rem', overflow: 'auto' }}>
          <code>{`const [selectedFeatures, setSelectedFeatures] = useState<WebFeatureId[]>([
  'container-queries',
  'css-grid'
])

// Render selected features
{selectedFeatures.map((feature) => (
  <BaselineChecker key={feature} featureName={feature} />
))}`}</code>
        </pre>
      </details>
    </div>
  )
}

export default InteractiveExamples
