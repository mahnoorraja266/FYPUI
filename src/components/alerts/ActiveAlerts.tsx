'use client'

import { AlertCircle, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { Alert } from '@/lib/data/alerts'

interface ActiveAlertsProps {
  alerts: Alert[]
}

export default function ActiveAlerts({ alerts }: ActiveAlertsProps) {
  const router = useRouter()

  const handleViewStream = (deviceId: string) => {
    // Map alert device IDs to active streaming device IDs
    const mapping: Record<string, string> = {
      'cam-nw-042': 'sec-012-main',
      'cam-lobby-a': 'sec-012-main',
      'gate-1': 'sec-001-alpha',
      'gate-2': 'sec-002-bravo',
    }
    const id = mapping[deviceId.toLowerCase()] || deviceId
    localStorage.setItem('mapSelectedDeviceId', id)
    router.push('/live-feeds')
  }

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle size={24} style={{ color: '#EF4444' }} />
        <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: '#E5E7EB', fontFamily: 'Inter' }}>
          Active Alerts
        </h2>
        <div
          className="px-3 py-1 rounded text-xs font-bold uppercase flex items-center gap-1 ml-4"
          style={{ backgroundColor: '#1A253B', borderColor: '#EF4444', border: '2px solid', color: '#EF4444', fontFamily: 'Inter' }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#EF4444' }} />
          Live Monitoring
        </div>
      </div>

      {/* Alert Cards */}
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="p-6 text-center" style={{ backgroundColor: '#121A2B', borderColor: '#24324A', border: '1px solid' }}>
            <p style={{ color: '#94A3B8', fontFamily: 'Inter' }}>No active alerts</p>
          </div>
        ) : (
          alerts.map((alert) => {
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
                    className="px-3 py-1 rounded text-xs font-bold uppercase text-black"
                    style={{ backgroundColor: badgeColor, color: '#000', fontFamily: 'Inter' }}
                  >
                    {badgeLabel}
                  </div>

                  {/* Info */}
                  <div className="flex-1 grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#94A3B8', fontFamily: 'Inter' }}>
                        Device
                      </p>
                      <p className="font-mono" style={{ color: '#E5E7EB' }}>
                        {alert.deviceId}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#94A3B8', fontFamily: 'Inter' }}>
                        Object Label
                      </p>
                      <p style={{ color: '#E5E7EB', fontFamily: 'Inter' }}>{alert.objectLabel}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#94A3B8', fontFamily: 'Inter' }}>
                        Confidence
                      </p>
                      <p style={{ color: '#22C55E' }}>{alert.confidence.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#94A3B8', fontFamily: 'Inter' }}>
                        Timestamp
                      </p>
                      <p className="font-mono" style={{ color: '#E5E7EB' }}>
                        {alert.timestamp}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewStream(alert.deviceId)}
                    className="p-2.5 rounded border hover:bg-blue-500/10 hover:opacity-80 transition-all cursor-pointer"
                    style={{ borderColor: '#3B82F6', color: '#3B82F6' }}
                    title="View Live Stream"
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
