'use client'

import { useState } from 'react'
import { Filter, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { LIVE_FEED_DEVICES } from '@/lib/data/live-feeds'
import LiveStreamPlayerModal from './LiveStreamPlayerModal'
import type { Device } from '@/lib/data/live-feeds'

export default function DeviceStreamTable({
  currentPage,
  onPageChange,
}: {
  currentPage: number
  onPageChange: (page: number) => void
}) {
  const itemsPerPage = 6
  const totalItems = 24
  const displayDevices = LIVE_FEED_DEVICES
  const [selectedStream, setSelectedStream] = useState<any>(null)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)

  const getStatusColor = (status: string) => {
    return status === 'online' ? '#22C55E' : '#EF4444'
  }

  const getAlertColor = (alertType?: string) => {
    switch (alertType) {
      case 'critical':
        return '#EF4444'
      case 'minor':
        return '#F59E0B'
      case 'connection_loss':
        return '#EF4444'
      default:
        return '#94A3B8'
    }
  }

  const getAlertText = (count: number, alertType?: string) => {
    if (count === 0) return '0 CRITICAL'
    if (alertType === 'critical') return `${count} CRITICAL`
    if (alertType === 'minor') return `${count} MINOR`
    if (alertType === 'connection_loss') return 'CONNECTION LOSS'
    return `${count} CRITICAL`
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: '#E5E7EB', fontFamily: 'Inter' }}>
            Device Fleet Status
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '14px', fontFamily: 'Inter' }}>
            Real-time telemetry and connectivity for 24 node points.
          </p>
        </div>
        <button
          className="px-4 py-2 rounded border flex items-center gap-2 transition-all hover:opacity-80"
          style={{
            borderColor: '#24324A',
            color: '#E5E7EB',
            backgroundColor: 'transparent',
          }}
        >
          <Filter size={18} />
          <span style={{ fontSize: '14px', fontWeight: '500' }}>Filter</span>
        </button>
      </div>

      {/* Table */}
      <div style={{ border: '1px solid #24324A', borderRadius: '8px', overflow: 'hidden' }}>
        {/* Table Header */}
        <div
          className="grid gap-4 p-4"
          style={{
            gridTemplateColumns: '0.8fr 1.2fr 0.8fr 0.8fr 0.8fr',
            backgroundColor: '#121A2B',
            borderBottom: '1px solid #24324A',
          }}
        >
          <div style={{ color: '#94A3B8', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', fontFamily: 'Inter' }}>
            Device Name
          </div>
          <div style={{ color: '#94A3B8', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', fontFamily: 'Inter' }}>
            Location
          </div>
          <div style={{ color: '#94A3B8', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', fontFamily: 'Inter' }}>
            Status
          </div>
          <div style={{ color: '#94A3B8', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', fontFamily: 'Inter' }}>
            Alerts
          </div>
          <div style={{ color: '#94A3B8', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', fontFamily: 'Inter', textAlign: 'right' }}>
            Actions
          </div>
        </div>

        {/* Table Rows */}
        {displayDevices.map((device) => (
          <div
            key={device.id}
            className="grid gap-4 p-4 border-b transition-colors hover:opacity-80"
            style={{
              gridTemplateColumns: '0.8fr 1.2fr 0.8fr 0.8fr 0.8fr',
              backgroundColor: '#0B1020',
              borderColor: '#24324A',
            }}
          >
            {/* Device Name */}
            <div className="flex items-center gap-2">
              <div style={{ width: '16px', height: '16px', borderRadius: '3px', border: '1px solid #3B82F6' }} />
              <span style={{ color: '#38BDF8', fontSize: '14px', fontWeight: '500', fontFamily: 'Inter' }}>
                {device.name}
              </span>
            </div>

            {/* Location */}
            <div style={{ color: '#94A3B8', fontSize: '14px', fontFamily: 'Inter' }}>
              {device.location}
            </div>

            {/* Status */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border w-fit"
              style={{
                borderColor: getStatusColor(device.status),
                backgroundColor: 'transparent',
                fontSize: '12px',
                fontWeight: '600',
                color: getStatusColor(device.status),
                textTransform: 'uppercase',
                fontFamily: 'Inter',
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getStatusColor(device.status) }}
              />
              {device.status === 'online' ? 'Online' : 'Offline'}
            </div>

            {/* Alerts */}
            <div
              style={{
                color: getAlertColor(device.alertType),
                fontSize: '14px',
                fontWeight: '500',
                fontFamily: 'Inter',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {device.alertsCount > 0 && device.alertType === 'minor' && (
                <span style={{ fontSize: '16px' }}>⚠</span>
              )}
              {device.alertsCount > 0 && device.alertType === 'critical' && (
                <span style={{ fontSize: '16px' }}>⭕</span>
              )}
              {device.alertType === 'connection_loss' && (
                <span style={{ fontSize: '16px' }}>⭕</span>
              )}
              {getAlertText(device.alertsCount, device.alertType)}
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setSelectedStream({
                    id: device.id,
                    name: device.name,
                    location: device.location,
                    resolution: '1080p',
                    fps: 60,
                    latency: '4.2ms',
                  })
                  setIsPlayerOpen(true)
                }}
                className="px-6 py-1.5 rounded text-xs font-bold uppercase transition-all hover:opacity-90 flex items-center gap-2"
                style={{
                  backgroundColor: '#3B82F6',
                  color: '#FFF',
                  fontFamily: 'Inter',
                }}
              >
                <Play size={14} fill="#FFF" />
                Stream
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <span style={{ color: '#94A3B8', fontSize: '12px', fontWeight: '500', fontFamily: 'Inter', textTransform: 'uppercase' }}>
          Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} systems
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded flex items-center justify-center border transition-all disabled:opacity-50"
            style={{
              borderColor: '#24324A',
              backgroundColor: '#121A2B',
              color: '#94A3B8',
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= totalItems}
            className="w-8 h-8 rounded flex items-center justify-center border transition-all disabled:opacity-50"
            style={{
              borderColor: '#24324A',
              backgroundColor: '#121A2B',
              color: '#94A3B8',
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Live Stream Player Modal */}
      <LiveStreamPlayerModal
        isOpen={isPlayerOpen}
        stream={selectedStream}
        onClose={() => setIsPlayerOpen(false)}
      />
    </div>
  )
}
