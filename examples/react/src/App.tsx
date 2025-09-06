import { BaselineChecker } from '@baseline-banner/react'
import InteractiveExamples from './components/InteractiveExamples'
import ReactiveExample from './components/ReactiveExample'
import './App.css'

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src="/react.svg" className="logo react" alt="React logo" />
        </a>
      </div>
      
      <h1>Baseline Banner React Example</h1>
      
      <p className="read-the-docs">
        Interactive examples of the <code>@baseline-banner/react</code> component
      </p>

      <div className="example-section">
        <h2 className="example-title">Single Feature Examples</h2>
        
        <div className="feature-grid">
          <div>
            <h3>Container Queries</h3>
            <BaselineChecker featureName="container-queries" />
            <pre><code>{`<BaselineChecker featureName="container-queries" />`}</code></pre>
          </div>

          <div>
            <h3>CSS Flexbox</h3>
            <BaselineChecker featureName="popover" />
            <pre><code>{`<BaselineChecker featureName="popover" />`}</code></pre>
          </div>
          
          <div>
            <h3>CSS 2D Transforms</h3>
            <BaselineChecker featureName="if" />
            <pre><code>{`<BaselineChecker featureName="if" />`}</code></pre>
          </div>
          
          <div>
            <h3>Dialog Element</h3>
            <BaselineChecker featureName="dialog" />
            <pre><code>{`<BaselineChecker featureName="dialog" />`}</code></pre>
          </div>
          
          <div>
            <h3>CSS Custom Properties</h3>
            <BaselineChecker featureName="custom-properties" />
            <pre><code>{`<BaselineChecker featureName="custom-properties" />`}</code></pre>
          </div>
        </div>
      </div>

      <InteractiveExamples />
      <ReactiveExample />
    </>
  )
}

export default App
