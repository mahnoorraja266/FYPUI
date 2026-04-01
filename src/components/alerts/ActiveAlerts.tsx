'use client'

import { AlertCircle, Eye, AlertTriangle } from 'lucide-react'
import type { Alert } from '@/lib/data/alerts'

interface ActiveAlertsProps {
  alerts: Alert[]
}

export default function ActiveAlerts({ alerts }: ActiveAlertsProps) {
  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle size={24} style={{ color: '#EF4444' }} />
        <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: '#E5E7EB' }}>
          Active Alerts
        </h2>
        <div
          className="px-3 py-1 rounded text-xs font-bold uppercase flex items-center gap-1 ml-4"
          style={{ backgroundColor: '#1A253B', borderColor: '#EF4444', border: '2px solid', color: '#EF4444' }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#EF4444' }} />
          Live Monitoring
        </div>
      </div>

      {/* Alert Cards */}
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="p-6 text-center" style={{ backgroundColor: '#121A2B', borderColor: '#24324A', border: '1px solid' }}>
            <p style={{ color: '#94A3B8' }}>No active alerts</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const isSeverity = alert.type === 'weapon'
            const badgeColor = alert.type === 'person' ? '#F59E0B' : '#EF4444'
            const badgeLabel = alert.type === 'person' ? 'Person' : 'Weapon'

            return (
              <div
                key={alert.id}
                className="p-4 border-2 rounded flex gap-4 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#121A2B', borderColor: '#6B7280' }}
              >
                {/* Thumbnail */}
                <div className="w-24 h-24 rounded overflow-hidden flex-shrink-0" style={{ backgroundColor: '#1A253B' }}>
                  <img src={alert.thumbnail} alt={alert.objectLabel} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="flex-1 flex items-center gap-6">
                  {/* Type Badge */}
                  <div
                    className="px-3 py-1 rounded text-xs font-bold uppercase"
                    style={{ backgroundColor: badgeColor, color: '#000' }}
                  >
                    {badgeLabel}
                  </div>

                  {/* Info */}
                  <div className="flex-1 grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#94A3B8' }}>
                        Device
                      </p>
                      <p className="font-mono" style={{ color: '#E5E7EB' }}>
                        {alert.deviceId}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#94A3B8' }}>
                        Object Label
                      </p>
                      <p style={{ color: '#E5E7EB' }}>{alert.objectLabel}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#94A3B8' }}>
                        Confidence
                      </p>
                      <p style={{ color: '#22C55E' }}>{alert.confidence.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#94A3B8' }}>
                        Timestamp
                      </p>
                      <p className="font-mono" style={{ color: '#E5E7EB' }}>
                        {alert.timestamp}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Icons */}
                <div className="flex gap-2">
                  <button
                    className="p-2 rounded hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: isSeverity ? '#EF4444' : '#F59E0B', color: '#000' }}
                  >
                    {isSeverity ? <AlertTriangle size={18} /> : <AlertCircle size={18} />}
                  </button>
                  <button
                    className="p-2 rounded border hover:opacity-80 transition-opacity"
                    style={{ borderColor: '#3B82F6', color: '#3B82F6' }}
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
