import React, { useState, useEffect } from 'react'
import { 
  fetchBaselineData, 
  getBaselineStatus,
  WebFeatureId, 
  type WebPlatformFeature 
} from '@baseline-banner/core'

export interface BaselineCheckerProps {
  featureName: WebFeatureId
  className?: string
}

// Icon components matching Vue implementation
const BaselineIcon: React.FC<{ support: string }> = ({ support }) => (
  <span className={`baseline-icon ${support}`}>
    {support === 'limited' ? (
      <svg width="36" height="20" viewBox="0 0 36 20">
        <path d="M15 3L21 13H9L15 3Z" fill="var(--baseline-icon-limited-front)"/>
        <circle cx="27" cy="10" r="7" fill="var(--baseline-icon-limited-back)" stroke="none"/>
      </svg>
    ) : support === 'widely' ? (
      <svg width="36" height="20" viewBox="0 0 36 20">
        <circle cx="9" cy="10" r="8" fill="var(--baseline-icon-widely-back)"/>
        <path d="M5 10L8 13L13 7" stroke="var(--baseline-icon-widely-front)" strokeWidth="2" fill="none"/>
        <circle cx="27" cy="10" r="7" fill="var(--baseline-icon-widely-back)"/>
      </svg>
    ) : support === 'newly' ? (
      <svg width="36" height="20" viewBox="0 0 36 20">
        <circle cx="9" cy="10" r="8" fill="var(--baseline-icon-newly-back)"/>
        <circle cx="9" cy="10" r="3" fill="var(--baseline-icon-newly-front)"/>
        <circle cx="27" cy="10" r="7" fill="var(--baseline-icon-newly-back)"/>
      </svg>
    ) : (
      <svg width="36" height="20" viewBox="0 0 36 20">
        <circle cx="18" cy="10" r="8" fill="none" stroke="var(--baseline-icon-no-data)" strokeWidth="2" strokeDasharray="2,2"/>
        <text x="18" y="14" textAnchor="middle" fontSize="12" fill="var(--baseline-icon-no-data)">?</text>
      </svg>
    )}
  </span>
)

const BrowserIcon: React.FC<{ name: string }> = ({ name }) => (
  <span className={`browser-icon ${name}`}>
    {name === 'chrome' ? (
      <svg width="16" height="16" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="7" fill="#4285F4"/>
        <circle cx="8" cy="8" r="4" fill="white"/>
        <circle cx="8" cy="8" r="2" fill="#4285F4"/>
      </svg>
    ) : name === 'edge' ? (
      <svg width="16" height="16" viewBox="0 0 16 16">
        <path d="M2 8C2 4.7 4.7 2 8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14C4.7 14 2 11.3 2 8Z" fill="#0078D4"/>
      </svg>
    ) : name === 'firefox' ? (
      <svg width="16" height="16" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="7" fill="#FF7139"/>
        <path d="M5 6C5 4 6.5 3 8 3C9.5 3 11 4 11 6V10C11 12 9.5 13 8 13C6.5 13 5 12 5 10V6Z" fill="white"/>
      </svg>
    ) : (
      <svg width="16" height="16" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="7" fill="#007AFF"/>
        <path d="M6 10C6 8.5 7 7.5 8 7.5C9 7.5 10 8.5 10 10V11C10 12.5 9 13.5 8 13.5C7 13.5 6 12.5 6 11V10Z" fill="white"/>
      </svg>
    )}
  </span>
)

const SupportIcon: React.FC<{ status: string }> = ({ status }) => (
  <span className={`support-icon ${status}`}>
    {status === 'available' ? (
      <svg width="12" height="12" viewBox="0 0 12 12">
        <circle cx="6" cy="6" r="5" fill="currentColor"/>
        <path d="M3 6L5 8L9 4" stroke="white" strokeWidth="1.5" fill="none"/>
      </svg>
    ) : status === 'unavailable' ? (
      <svg width="12" height="12" viewBox="0 0 12 12">
        <circle cx="6" cy="6" r="5" fill="currentColor"/>
        <path d="M4 4L8 8M8 4L4 8" stroke="white" strokeWidth="1.5"/>
      </svg>
    ) : (
      <svg width="12" height="12" viewBox="0 0 12 12">
        <circle cx="6" cy="6" r="5" fill="currentColor"/>
        <text x="6" y="8" textAnchor="middle" fontSize="8" fill="white">?</text>
      </svg>
    )}
  </span>
)

const BaselineChecker: React.FC<BaselineCheckerProps> = ({ 
  featureName, 
  className = '' 
}) => {
  const [feature, setFeature] = useState<WebPlatformFeature | null>(null)
  const [pending, setPending] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchFeatureData = async () => {
      if (!featureName) {
        setPending(false)
        return
      }

      try {
        setPending(true)
        setError(null)
        const data = await fetchBaselineData(featureName)
        setFeature(data)
      } catch (err) {
        console.error('Failed to fetch baseline data:', err)
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setPending(false)
      }
    }

    fetchFeatureData()
  }, [featureName])

  const baselineStatus = getBaselineStatus(feature)
  
  // Get clean status text for badge
  const getStatusTitle = () => {
    switch (baselineStatus.className) {
      case 'widely':
        return 'Widely available'
      case 'newly': 
        return ''
      case 'limited':
        return 'Limited availability'
      default:
        return 'Unknown availability'
    }
  }

  // Get baseline date
  const getBaselineDate = () => {
    return feature?.baseline?.low_date ? 
      new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(new Date(feature.baseline.low_date)) : 
      ''
  }

  // Get year from baseline date
  const getYear = () => {
    const date = getBaselineDate()
    return date ? date.split(' ')[1] : ''
  }

  // Get description based on status
  const getDescription = () => {
    const status = baselineStatus.className
    const date = getBaselineDate()
    
    if (status === 'newly' && date) {
      return `Since ${date} this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.`
    } else if (status === 'widely' && date) {
      return `This feature is well established and works across many devices and browser versions. It's been available across browsers since ${date}.`
    } else if (status === 'limited') {
      return 'This feature is not Baseline because it does not work in some of the most widely-used browsers.'
    }
    
    return "We currently don't have browser support information about this feature."
  }

  // Get support class for browsers
  const getSupportClass = (_browser: string) => {
    const status = baselineStatus.className
    if (status === 'limited') {
      return 'unavailable'
    } else if (status === 'newly' || status === 'widely') {
      return 'available'
    }
    return 'no_data'
  }

  const baselineDate = getBaselineDate()

  if (pending) {
    return (
      <div className={`baseline-status ${className}`.trim()}>
        <div className="baseline-loading">
          <h2 className="name">{featureName || 'Loading...'}</h2>
          <div className="baseline-status-title">
            <div>
              <strong>Baseline</strong>
              <span className="baseline-badge loading">Loading</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !feature) {
    return (
      <div className={`baseline-status ${className}`.trim()}>
        <div className="baseline-error-state">
          <h2 className="name">{featureName || 'Unknown feature'}</h2>
          <div className="baseline-status-title">
            <div>
              <BaselineIcon support="no_data" />
              <strong>Baseline</strong>
              <span className="baseline-badge no-data">Unknown availability</span>
            </div>
            <div className="baseline-status-browsers">
              {(['chrome', 'edge', 'firefox', 'safari'] as const).map(browser => (
                <span key={browser} className="support-no_data">
                  <BrowserIcon name={browser} />
                  <SupportIcon status="no_data" />
                </span>
              ))}
            </div>
          </div>
          <details>
            <summary>
              We currently don't have browser support information about this feature.
              <div className="open-icon">
                <svg viewBox="0 0 24 24" width="12" height="12">
                  <path d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6-6-6l1.41-1.42z"/>
                </svg>
              </div>
            </summary>
          </details>
        </div>
      </div>
    )
  }

  return (
    <div className={`baseline-status ${className}`.trim()}>
      <div className="baseline-content">
        <h2 className="name">{feature.name}</h2>
        <details>
          <summary>
            <div className="baseline-status-title">
              <div>
                <BaselineIcon support={baselineStatus.className} />
                {(baselineStatus.className !== 'limited' && baselineStatus.className !== 'no_data') && (
                  <strong>Baseline</strong>
                )}
                <span className={`baseline-badge ${baselineStatus.className}`}>
                  {getStatusTitle()}
                </span>
                {baselineStatus.className === 'newly' && baselineDate && (
                  <span className="baseline-year">{getYear()}</span>
                )}
                {baselineStatus.className === 'newly' && (
                  <span className="baseline-badge newly-badge">newly available</span>
                )}
              </div>
              <div className="baseline-status-browsers">
                {(['chrome', 'edge', 'firefox', 'safari'] as const).map(browser => (
                  <span key={browser} className={`support-${getSupportClass(browser)}`}>
                    <BrowserIcon name={browser} />
                    <SupportIcon status={getSupportClass(browser)} />
                  </span>
                ))}
              </div>
            </div>
            <div className="open-icon">
              <svg viewBox="0 0 24 24" width="12" height="12">
                <path d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6-6-6l1.41-1.42z"/>
              </svg>
            </div>
          </summary>
          <div className="baseline-description">
            {getDescription()}
            {baselineStatus.className !== 'no_data' && (
              <div className="learn-more">
                <a href={`https://web.dev/baseline/${feature.feature_id || featureName}`} target="_blank" rel="noopener noreferrer">
                  Learn more
                </a>
              </div>
            )}
          </div>
        </details>
      </div>
    </div>
  )
}

export default BaselineChecker
