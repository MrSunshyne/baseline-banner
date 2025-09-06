import React, { useState, useEffect } from 'react'
import { 
  fetchBaselineData, 
  getBaselineStatus, 
  formatDate,
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

  if (pending) {
    return (
      <div className={`baseline-checker ${className}`.trim()}>
        <div className="loading-message">
          Loading compatibility data...
        </div>
      </div>
    )
  }

  if (error || !feature) {
    return (
      <div className={`baseline-checker ${className}`.trim()}>
        <div className="error-message">
          {error?.message || `Feature "${featureName}" not found`}
        </div>
      </div>
    )
  }

  // Get baseline status using the same logic as Vue component
  const baselineStatus = getBaselineStatus(feature)

  return (
    <div className={`baseline-checker ${className}`.trim()}>
      <div className="feature-info">
        <div className="feature-header">
          <h3 className="feature-name">{feature.name}</h3>
          <div className={`baseline-badge ${baselineStatus.className}`}>
            {baselineStatus.message}
          </div>
        </div>
        
        {feature.description && (
          <p className="feature-description">{feature.description}</p>
        )}
        
        {baselineStatus.dates && (
          <div className="availability-info">
            {baselineStatus.dates.availableSince && (
              <div className="availability-date">
                Available since: {formatDate(baselineStatus.dates.availableSince)}
              </div>
            )}
            {baselineStatus.dates.widelyAvailableSince && (
              <div className="availability-date">
                Widely available since: {formatDate(baselineStatus.dates.widelyAvailableSince)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default BaselineChecker
