import React, { useState } from 'react'
import { BaselineChecker, type WebFeatureId } from '@baseline-banner/react'

const featuresDatabase: WebFeatureId[] = [
  'container-queries',
  'grid',
  'flexbox',
  'transforms2d',
  'dialog',
  'custom-properties',
  'subgrid',
  'cascade-layers',
  'has',
  'color-mix',
  'nesting',
  'scroll-snap',
  'backdrop-filter',
  'filter'
]

const ReactiveExample: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState<WebFeatureId>('container-queries')
  const [customInput, setCustomInput] = useState('')
  
  const handleRandomFeature = () => {
    const randomFeature = featuresDatabase[Math.floor(Math.random() * featuresDatabase.length)]
    setCurrentFeature(randomFeature)
  }

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customInput.trim()) {
      // Basic validation - you might want to improve this
      const cleanInput = customInput.trim().toLowerCase().replace(/\s+/g, '-')
      setCurrentFeature(cleanInput as WebFeatureId)
      setCustomInput('')
    }
  }

  return (
    <div className="example-section">
      <h2 className="example-title">Reactive Feature Testing</h2>
      
      <div className="controls">
        <select 
          value={currentFeature} 
          onChange={(e) => setCurrentFeature(e.target.value as WebFeatureId)}
        >
          {featuresDatabase.map((feature) => (
            <option key={feature} value={feature}>
              {feature.replace(/-/g, ' ').replace(/^./, c => c.toUpperCase())}
            </option>
          ))}
        </select>
        
        <button onClick={handleRandomFeature}>
          Random Feature
        </button>
      </div>

      <form onSubmit={handleCustomSubmit} className="controls">
        <input
          type="text"
          placeholder="Enter custom feature name..."
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
        />
        <button type="submit">Test Custom Feature</button>
      </form>

      <div style={{ margin: '2rem 0' }}>
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>
          Current Feature: <code>{currentFeature}</code>
        </h3>
        <BaselineChecker featureName={currentFeature} />
      </div>

      <details style={{ marginTop: '1rem', textAlign: 'left' }}>
        <summary style={{ color: '#ccc', cursor: 'pointer' }}>View Code</summary>
        <pre style={{ background: '#1a1a1a', padding: '1rem', overflow: 'auto' }}>
          <code>{`const [currentFeature, setCurrentFeature] = useState<WebFeatureId>('container-queries')

// Reactive updates
<BaselineChecker featureName={currentFeature} />

// Change feature dynamically
setCurrentFeature('css-grid')`}</code>
        </pre>
      </details>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#0a0a0a', borderRadius: '8px', textAlign: 'left' }}>
        <h4 style={{ color: '#fff', marginTop: 0 }}>💡 Pro Tips:</h4>
        <ul style={{ color: '#ccc', lineHeight: 1.6 }}>
          <li>The component re-fetches data when the <code>featureName</code> prop changes</li>
          <li>Loading states are handled automatically</li>
          <li>Invalid feature names will show error messages</li>
          <li>Try entering feature names like: <code>css-grid</code>, <code>flexbox</code>, <code>web-components</code></li>
        </ul>
      </div>
    </div>
  )
}

export default ReactiveExample
