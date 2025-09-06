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
  
  const getStatusText = () => {
    return baselineStatus.message
  }

  const renderIcon = () => {
    const iconProps = {
      viewBox: "0 0 16 16",
      width: 16,
      height: 16
    }

    if (baselineStatus.className === 'widely') {
      return (
        <svg {...iconProps}>
          <circle cx="8" cy="8" r="6" fill="currentColor"/>
        </svg>
      )
    }
    
    if (baselineStatus.className === 'newly') {
      return (
        <svg {...iconProps}>
          <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    }
    
    if (baselineStatus.className === 'limited') {
      return (
        <svg {...iconProps}>
          <path d="M8 2L14 14H2L8 2Z" fill="currentColor"/>
        </svg>
      )
    }
    
    return (
      <svg {...iconProps}>
        <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
      </svg>
    )
  }

  // Build CSS classes to match Vue component logic
  const cssClasses = [
    'baseline-status',
    pending ? 'is-loading' : '',
    (error || !feature) ? 'has-error' : '',
    className
  ].filter(Boolean).join(' ')

  if (pending) {
    return (
      <div className={cssClasses}>
        <div className="baseline-loading">
          <div className="baseline-spinner"></div>
          <span>Checking baseline status...</span>
        </div>
      </div>
    )
  }

  if (error || !feature) {
    return (
      <div className={cssClasses}>
        <div className="baseline-error">
          <span>{error?.message || `Feature "${featureName}" not found`}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cssClasses}>
      <div className="baseline-content">
        <div className={`baseline-icon ${baselineStatus.className}`} aria-hidden="true">
          {renderIcon()}
        </div>
        
        <div className="baseline-info">
          <div className="baseline-label">
            <strong>Baseline</strong>
          </div>
          <div className={`baseline-status-text ${baselineStatus.className}`}>
            {getStatusText()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BaselineChecker
