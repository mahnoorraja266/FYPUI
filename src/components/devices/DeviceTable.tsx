'use client'

import { Settings, Eye } from 'lucide-react'
import type { Device } from '@/lib/data/devices'

interface DeviceTableProps {
  devices: Device[]
  onDetails: (deviceId: string) => void
}

export default function DeviceTable({ devices, onDetails }: DeviceTableProps) {
  return (
    <div className="space-y-4">
      {/* Table Header */}
      <div
        className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 rounded border"
        style={{ backgroundColor: '#1A253B', borderColor: '#24324A' }}
      >
        <div className="col-span-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
          Name
        </div>
        <div className="col-span-1 text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
          Status
        </div>
        <div className="col-span-2 text-xs font-bold uppercase tracking-widest text-center" style={{ color: '#94A3B8' }}>
          Compute (CPU/GPU)
        </div>
        <div className="col-span-1 text-xs font-bold uppercase tracking-widest text-center" style={{ color: '#94A3B8' }}>
          Ram
        </div>
        <div className="col-span-1 text-xs font-bold uppercase tracking-widest text-center" style={{ color: '#94A3B8' }}>
          Temp
        </div>
        <div className="col-span-1 text-xs font-bold uppercase tracking-widest text-center" style={{ color: '#94A3B8' }}>
          Face
        </div>
        <div className="col-span-1 text-xs font-bold uppercase tracking-widest text-center" style={{ color: '#94A3B8' }}>
          Weapon
        </div>
        <div className="col-span-3 text-xs font-bold uppercase tracking-widest text-right" style={{ color: '#94A3B8' }}>
          Actions
        </div>
      </div>

      {/* Device Rows */}
      {devices.map((device) => (
        <div
          key={device.id}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 py-4 rounded border transition-all hover:opacity-90"
          style={{
            backgroundColor: device.status === 'offline' ? '#0B1020' : '#121A2B',
            borderColor: '#24324A',
            opacity: device.status === 'offline' ? 0.6 : 1,
          }}
        >
          {/* Name and ID */}
          <div className="col-span-2 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded flex items-center justify-center"
              style={{ backgroundColor: '#1A253B', borderColor: '#24324A', border: '1px solid' }}
            >
              <span style={{ color: '#3B82F6', fontSize: '18px' }}>📍</span>
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: '#E5E7EB' }}>
                {device.name}
              </div>
              <div className="text-xs font-mono" style={{ color: '#94A3B8' }}>
                ID: {device.location}
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="col-span-1 flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: device.status === 'online' ? '#22C55E' : '#EF4444' }}
            />
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: device.status === 'online' ? '#22C55E' : '#EF4444' }}
            >
              {device.status === 'online' ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>

          {/* Compute (CPU/GPU) */}
          <div className="col-span-2 flex flex-col gap-2">
            {device.status === 'online' ? (
              <>
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-mono uppercase" style={{ color: '#94A3B8' }}>
                      CPU
                    </span>
                    <span className="text-xs font-mono" style={{ color: '#E5E7EB' }}>
                      {device.cpu}%
                    </span>
                  </div>
                  <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: '#1A253B' }}>
                    <div
                      className="h-full transition-all"
                      style={{ width: `${device.cpu}%`, backgroundColor: '#3B82F6' }}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-mono uppercase" style={{ color: '#94A3B8' }}>
                      GPU
                    </span>
                    <span className="text-xs font-mono" style={{ color: '#E5E7EB' }}>
                      {device.gpu}%
                    </span>
                  </div>
                  <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: '#1A253B' }}>
                    <div
                      className="h-full transition-all"
                      style={{ width: `${device.gpu}%`, backgroundColor: '#14B8A6' }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-xs font-mono text-center" style={{ color: '#94A3B8' }}>
                NO DATA
              </div>
            )}
          </div>

          {/* RAM */}
          <div className="col-span-1 text-center">
            {device.status === 'online' ? (
              <>
                <div className="text-sm font-mono font-bold" style={{ color: '#E5E7EB' }}>
                  {Math.round((device.ram.used / device.ram.total) * 100)}%
                </div>
                <div className="text-xs font-mono" style={{ color: '#94A3B8' }}>
                  {device.ram.used}GB / {device.ram.total}GB
                </div>
              </>
            ) : (
              <div className="text-sm font-mono" style={{ color: '#94A3B8' }}>
                -
              </div>
            )}
          </div>

          {/* Temperature */}
          <div className="col-span-1 text-center">
            {device.status === 'online' ? (
              <div className="text-sm font-mono font-bold" style={{ color: '#F59E0B' }}>
                {device.temperature}°C
              </div>
            ) : (
              <div className="text-sm font-mono" style={{ color: '#94A3B8' }}>
                -
              </div>
            )}
          </div>

          {/* Face Detection */}
          <div className="col-span-1 text-center">
            {device.status === 'online' ? (
              <div
                className="inline-flex px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border"
                style={{
                  backgroundColor: device.faceDetection ? 'rgba(34, 197, 94, 0.1)' : 'rgba(148, 163, 184, 0.1)',
                  borderColor: device.faceDetection ? '#22C55E' : '#6B7280',
                  color: device.faceDetection ? '#22C55E' : '#94A3B8',
                }}
              >
                {device.faceDetection ? 'ON' : 'OFF'}
              </div>
            ) : (
              <div className="text-sm font-mono" style={{ color: '#94A3B8' }}>
                -
              </div>
            )}
          </div>

          {/* Weapon Detection */}
          <div className="col-span-1 text-center">
            {device.status === 'online' ? (
              <div
                className="inline-flex px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border"
                style={{
                  backgroundColor: device.weaponDetection ? 'rgba(34, 197, 94, 0.1)' : 'rgba(148, 163, 184, 0.1)',
                  borderColor: device.weaponDetection ? '#22C55E' : '#6B7280',
                  color: device.weaponDetection ? '#22C55E' : '#94A3B8',
                }}
              >
                {device.weaponDetection ? 'ON' : 'OFF'}
              </div>
            ) : (
              <div className="text-sm font-mono" style={{ color: '#94A3B8' }}>
                -
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="col-span-3 flex justify-end gap-2">
            <button
              className="p-2 rounded border transition-all hover:opacity-80"
              style={{ borderColor: '#24324A', backgroundColor: '#0B1020' }}
            >
              <Settings size={18} style={{ color: '#94A3B8' }} />
            </button>
            <button
              className="p-2 rounded border transition-all hover:opacity-80"
              style={{ borderColor: '#24324A', backgroundColor: '#0B1020' }}
            >
              <Eye size={18} style={{ color: '#94A3B8' }} />
            </button>
            <button
              onClick={() => onDetails(device.id)}
              className="px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all hover:opacity-80"
              style={{
                backgroundColor: device.status === 'online' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(148, 163, 184, 0.1)',
                borderColor: device.status === 'online' ? '#3B82F6' : '#6B7280',
                color: device.status === 'online' ? '#3B82F6' : '#94A3B8',
                border: '1px solid',
              }}
            >
              Details
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
