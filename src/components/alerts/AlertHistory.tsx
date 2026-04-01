'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Alert } from '@/lib/data/alerts'

interface AlertHistoryProps {
  alerts: Alert[]
}

export default function AlertHistory({ alerts }: AlertHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reviewed':
        return { bg: 'transparent', text: '#22C55E', border: '#22C55E' }
      case 'ignored':
        return { bg: 'transparent', text: '#F59E0B', border: '#F59E0B' }
      case 'pending':
        return { bg: 'transparent', text: '#94A3B8', border: '#94A3B8' }
      default:
        return { bg: 'transparent', text: '#3B82F6', border: '#3B82F6' }
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: '#E5E7EB' }}>
          Alert History
        </h2>
        <p className="text-xs" style={{ color: '#94A3B8' }}>
          Showing 1-10 of 1,248
        </p>
      </div>

      {/* Table */}
      <div className="border rounded overflow-hidden" style={{ borderColor: '#24324A', backgroundColor: '#121A2B' }}>
        <table className="w-full text-left">
          <thead>
            <tr style={{ backgroundColor: 'rgba(26, 37, 59, 0.3)' }}>
              <th className="px-4 py-3 text-xs uppercase tracking-widest font-bold border-b" style={{ color: '#94A3B8', borderColor: '#24324A' }}>
                Type
              </th>
              <th className="px-4 py-3 text-xs uppercase tracking-widest font-bold border-b" style={{ color: '#94A3B8', borderColor: '#24324A' }}>
                Device
              </th>
              <th className="px-4 py-3 text-xs uppercase tracking-widest font-bold border-b" style={{ color: '#94A3B8', borderColor: '#24324A' }}>
                Object Label
              </th>
              <th className="px-4 py-3 text-xs uppercase tracking-widest font-bold border-b" style={{ color: '#94A3B8', borderColor: '#24324A' }}>
                Confidence
              </th>
              <th className="px-4 py-3 text-xs uppercase tracking-widest font-bold border-b" style={{ color: '#94A3B8', borderColor: '#24324A' }}>
                Timestamp
              </th>
              <th className="px-4 py-3 text-xs uppercase tracking-widest font-bold border-b" style={{ color: '#94A3B8', borderColor: '#24324A' }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => {
              const statusColor = getStatusColor(alert.status)
              return (
                <tr key={alert.id} className="border-b hover:bg-opacity-50" style={{ borderColor: '#24324A' }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded overflow-hidden" style={{ backgroundColor: '#1A253B' }}>
                        <img src={alert.thumbnail} alt={alert.objectLabel} className="w-full h-full object-cover" />
                      </div>
                      <span
                        className="px-2 py-1 rounded text-xs font-bold uppercase border"
                        style={{
                          backgroundColor: 'transparent',
                          color: '#94A3B8',
                          borderColor: '#6B7280',
                        }}
                      >
                        {alert.type === 'person' ? 'PERSON' : 'WEAPON'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm" style={{ color: '#E5E7EB' }}>
                    {alert.deviceId}
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: '#E5E7EB' }}>
                    {alert.objectLabel}
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: '#22C55E' }}>
                    {alert.confidence.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 font-mono text-sm" style={{ color: '#94A3B8' }}>
                    {alert.timestamp}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="px-3 py-1 text-xs font-bold uppercase border rounded transition-opacity hover:opacity-80"
                      style={{ borderColor: statusColor.border, color: statusColor.text }}
                    >
                      {alert.status.toUpperCase()}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Load More & Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="px-6 py-2 rounded font-bold uppercase text-sm hover:opacity-80 transition-opacity"
          style={{ backgroundColor: 'transparent', border: '1px solid #24324A', color: '#E5E7EB' }}
        >
          Load More Alerts
        </button>
        <div className="flex gap-2 ml-auto">
          <button className="p-2 rounded hover:opacity-80" style={{ backgroundColor: '#1A253B', color: '#3B82F6' }}>
            <ChevronLeft size={18} />
          </button>
          <button className="p-2 rounded hover:opacity-80" style={{ backgroundColor: '#1A253B', color: '#3B82F6' }}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
