'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import type { Device } from '@/lib/data/devices'

interface DeviceDetailsModalProps {
  isOpen: boolean
  device: Device | null
  onClose: () => void
}

export default function DeviceDetailsModal({ isOpen, device, onClose }: DeviceDetailsModalProps) {
  const [faceConfidence, setFaceConfidence] = useState(0.6)
  const [weaponConfidence, setWeaponConfidence] = useState(0.5)
  const [frameRate, setFrameRate] = useState('Every 1 frame')
  const [alertCooldown, setAlertCooldown] = useState('30')
  const [faceEnabled, setFaceEnabled] = useState(true)
  const [weaponEnabled, setWeaponEnabled] = useState(true)

  if (!isOpen || !device) return null

  const handleSave = () => {
    console.log('Device settings saved:', {
      deviceId: device.id,
      faceConfidence,
      weaponConfidence,
      frameRate,
      alertCooldown,
    })
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-40 transition-opacity"
        onClick={onClose}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          className="w-full max-w-2xl rounded border pointer-events-auto flex flex-col shadow-2xl max-h-[90vh] overflow-hidden"
          style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}
        >
          {/* Header */}
          <div
            className="px-6 py-4 border-b flex justify-between items-start"
            style={{ backgroundColor: '#1A253B', borderColor: '#24324A' }}
          >
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#E5E7EB' }}>
                {device.name} Camera — {device.location}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22C55E' }} />
                <span className="text-xs font-mono uppercase" style={{ color: '#22C55E' }}>
                  CORE_PIPELINE_ACTIVE
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:opacity-80 transition-opacity"
              style={{ color: '#94A3B8' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Technical Meta Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 rounded border" style={{ backgroundColor: '#0B1020', borderColor: '#24324A' }}>
                <span className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: '#94A3B8' }}>
                  Network IP
                </span>
                <span className="text-sm font-mono" style={{ color: '#E5E7EB' }}>
                  192.168.1.101
                </span>
              </div>
              <div className="p-3 rounded border" style={{ backgroundColor: '#0B1020', borderColor: '#24324A' }}>
                <span className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: '#94A3B8' }}>
                  Latency
                </span>
                <span className="text-sm font-mono" style={{ color: '#E5E7EB' }}>
                  3s ago
                </span>
              </div>
              <div className="p-3 rounded border" style={{ backgroundColor: '#0B1020', borderColor: '#24324A' }}>
                <span className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: '#94A3B8' }}>
                  API Prefix
                </span>
                <span className="text-sm font-mono" style={{ color: '#E5E7EB' }}>
                  xK9mR2...
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                className="py-3 px-4 rounded border font-bold text-xs uppercase tracking-wider transition-all hover:opacity-90"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  borderColor: '#EF4444',
                  color: '#EF4444',
                }}
              >
                ⊘ Turn OFF
              </button>
              <button
                className="py-3 px-4 rounded border font-bold text-xs uppercase tracking-wider transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#1A253B',
                  borderColor: '#24324A',
                  color: '#E5E7EB',
                }}
              >
                ↻ Restart Pipeline
              </button>
            </div>

            {/* Active Inference Models */}
            <div className="space-y-4">
              <h3
                className="text-xs font-bold uppercase tracking-widest pb-3 border-b"
                style={{ color: '#3B82F6', borderColor: '#24324A' }}
              >
                Active Inference Models
              </h3>

              {/* Face Model Toggle */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <span className="text-lg" style={{ color: '#94A3B8' }}>😊</span>
                  <span style={{ color: '#E5E7EB' }}>Face Model</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono" style={{ color: '#22C55E' }}>
                    ON
                  </span>
                  <button
                    onClick={() => setFaceEnabled(!faceEnabled)}
                    className="w-10 h-6 rounded-full border-2 transition-all flex items-center"
                    style={{
                      backgroundColor: faceEnabled ? 'rgba(34, 197, 94, 0.2)' : 'rgba(148, 163, 184, 0.1)',
                      borderColor: faceEnabled ? '#22C55E' : '#6B7280',
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-full transition-all"
                      style={{
                        backgroundColor: faceEnabled ? '#22C55E' : '#6B7280',
                        marginLeft: faceEnabled ? 'auto' : 0,
                        marginRight: faceEnabled ? '4px' : 'auto',
                      }}
                    />
                  </button>
                </div>
              </div>

              {/* Weapon Model Toggle */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <span className="text-lg" style={{ color: '#94A3B8' }}>🔒</span>
                  <span style={{ color: '#E5E7EB' }}>Weapon Model</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono" style={{ color: '#22C55E' }}>
                    ON
                  </span>
                  <button
                    onClick={() => setWeaponEnabled(!weaponEnabled)}
                    className="w-10 h-6 rounded-full border-2 transition-all flex items-center"
                    style={{
                      backgroundColor: weaponEnabled ? 'rgba(34, 197, 94, 0.2)' : 'rgba(148, 163, 184, 0.1)',
                      borderColor: weaponEnabled ? '#22C55E' : '#6B7280',
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-full transition-all"
                      style={{
                        backgroundColor: weaponEnabled ? '#22C55E' : '#6B7280',
                        marginLeft: weaponEnabled ? 'auto' : 0,
                        marginRight: weaponEnabled ? '4px' : 'auto',
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Device Settings */}
            <div className="space-y-4">
              <h3
                className="text-xs font-bold uppercase tracking-widest pb-3 border-b"
                style={{ color: '#3B82F6', borderColor: '#24324A' }}
              >
                Device Settings
              </h3>

              {/* Confidence Sliders */}
              <div className="grid grid-cols-2 gap-6">
                {/* Face Confidence */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm" style={{ color: '#94A3B8' }}>
                      Face Confidence
                    </label>
                    <span className="text-sm font-mono" style={{ color: '#3B82F6' }}>
                      {faceConfidence.toFixed(2)}
                    </span>
                  </div>
                  <div className="relative h-1 rounded-full bg-gray-700" style={{ backgroundColor: '#24324A' }}>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={faceConfidence}
                      onChange={(e) => setFaceConfidence(parseFloat(e.target.value))}
                      className="absolute inset-0 w-full h-full rounded-full cursor-pointer opacity-0 z-10"
                    />
                    <div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        width: `${faceConfidence * 100}%`,
                        backgroundColor: '#3B82F6',
                      }}
                    />
                    <div
                      className="absolute -top-1.5 w-4 h-4 rounded-full border-2 pointer-events-none transition-all"
                      style={{
                        left: `calc(${faceConfidence * 100}% - 8px)`,
                        backgroundColor: '#3B82F6',
                        borderColor: '#121A2B',
                      }}
                    />
                  </div>
                </div>

                {/* Weapon Confidence */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm" style={{ color: '#94A3B8' }}>
                      Weapon Confidence
                    </label>
                    <span className="text-sm font-mono" style={{ color: '#3B82F6' }}>
                      {weaponConfidence.toFixed(2)}
                    </span>
                  </div>
                  <div className="relative h-1 rounded-full bg-gray-700" style={{ backgroundColor: '#24324A' }}>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={weaponConfidence}
                      onChange={(e) => setWeaponConfidence(parseFloat(e.target.value))}
                      className="absolute inset-0 w-full h-full rounded-full cursor-pointer opacity-0 z-10"
                    />
                    <div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        width: `${weaponConfidence * 100}%`,
                        backgroundColor: '#3B82F6',
                      }}
                    />
                    <div
                      className="absolute -top-1.5 w-4 h-4 rounded-full border-2 pointer-events-none transition-all"
                      style={{
                        left: `calc(${weaponConfidence * 100}% - 8px)`,
                        backgroundColor: '#3B82F6',
                        borderColor: '#121A2B',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Frame Rate and Alert Cooldown */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                    Frame Rate
                  </label>
                  <select
                    value={frameRate}
                    onChange={(e) => setFrameRate(e.target.value)}
                    className="w-full px-3 py-2 rounded border text-sm"
                    style={{
                      backgroundColor: '#0B1020',
                      borderColor: '#24324A',
                      color: '#E5E7EB',
                    }}
                  >
                    <option>Every 1 frame</option>
                    <option>Every 2 frames</option>
                    <option>Every 5 frames</option>
                    <option>Every 10 frames</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                    Alert Cooldown
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={alertCooldown}
                      onChange={(e) => setAlertCooldown(e.target.value)}
                      className="flex-1 px-3 py-2 rounded border text-sm font-mono"
                      style={{
                        backgroundColor: '#0B1020',
                        borderColor: '#24324A',
                        color: '#E5E7EB',
                      }}
                    />
                    <div
                      className="px-3 py-2 rounded border font-mono text-sm"
                      style={{
                        backgroundColor: '#0B1020',
                        borderColor: '#24324A',
                        color: '#94A3B8',
                      }}
                    >
                      SEC
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-6 py-4 border-t flex justify-end items-center gap-4"
            style={{ backgroundColor: '#0B1020', borderColor: '#24324A' }}
          >
            <button
              onClick={onClose}
              className="text-sm font-bold uppercase tracking-wider transition-colors hover:opacity-80"
              style={{ color: '#94A3B8' }}
            >
              Discard
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded font-bold text-sm uppercase tracking-wider transition-all hover:opacity-90"
              style={{
                backgroundColor: '#3B82F6',
                color: '#FFF',
              }}
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
