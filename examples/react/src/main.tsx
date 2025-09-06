import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Import baseline banner styles
import '@baseline-banner/styles'

// Import our custom styles
import './style.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
