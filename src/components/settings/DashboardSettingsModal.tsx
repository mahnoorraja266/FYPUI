'use client'

import { useState } from 'react'
import { X, Settings } from 'lucide-react'

interface DashboardSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DashboardSettingsModal({ isOpen, onClose }: DashboardSettingsModalProps) {
  const [settings, setSettings] = useState({
    alertSound: true,
    alertNotifications: false,
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log('Settings saved:', settings)
    setIsSaving(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Blurred Background Overlay */}
      <div
        className="fixed inset-0 z-40 transition-all"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
        }}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div
          className="pointer-events-auto w-full rounded-lg overflow-hidden"
          style={{
            backgroundColor: '#121A2B',
            border: '1px solid #24324A',
            maxWidth: '450px',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-5 border-b"
            style={{ borderColor: '#24324A' }}
          >
            <div className="flex items-center gap-3">
              <Settings size={20} style={{ color: '#3B82F6' }} />
              <h2 className="text-lg font-bold" style={{ color: '#E5E7EB' }}>
                Dashboard Settings
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:opacity-80 transition-opacity"
              style={{ color: '#94A3B8' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-6">
            {/* Alert Sound Toggle */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-sm" style={{ color: '#E5E7EB' }}>
                  Alert Sound
                </h3>
                <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>
                  Audible ping when new incidents are detected
                </p>
              </div>
              <button
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    alertSound: !prev.alertSound,
                  }))
                }
                className="relative w-12 h-6 rounded-full transition-all flex-shrink-0"
                style={{
                  backgroundColor: settings.alertSound ? '#3B82F6' : '#424754',
                }}
              >
                <div
                  className="absolute top-0.5 w-5 h-5 rounded-full transition-transform"
                  style={{
                    backgroundColor: '#FFF',
                    transform: settings.alertSound ? 'translateX(24px)' : 'translateX(2px)',
                  }}
                />
              </button>
            </div>

            {/* Alert Notifications Toggle */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-sm" style={{ color: '#E5E7EB' }}>
                  Alert notification pop-ups
                </h3>
                <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>
                  Display temporary notification cards in UI
                </p>
              </div>
              <button
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    alertNotifications: !prev.alertNotifications,
                  }))
                }
                className="relative w-12 h-6 rounded-full transition-all flex-shrink-0"
                style={{
                  backgroundColor: settings.alertNotifications ? '#3B82F6' : '#424754',
                }}
              >
                <div
                  className="absolute top-0.5 w-5 h-5 rounded-full transition-transform"
                  style={{
                    backgroundColor: '#FFF',
                    transform: settings.alertNotifications ? 'translateX(24px)' : 'translateX(2px)',
                  }}
                />
              </button>
            </div>

            {/* System Policy Info Box */}
            <div
              className="p-4 rounded border-l-4"
              style={{
                backgroundColor: '#0B1020',
                borderColor: '#3B82F6',
                borderLeftWidth: '4px',
              }}
            >
              <div
                className="flex items-center gap-2 mb-2"
                style={{ color: '#3B82F6' }}
              >
                <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                  ⓘ SYSTEM POLICY
                </span>
              </div>
              <p className="text-xs" style={{ color: '#94A3B8', lineHeight: '1.5' }}>
                The 'Night Ops' theme is enforced by station protocol Station 04-B.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div
            className="flex items-center gap-3 px-6 py-4 border-t"
            style={{ borderColor: '#24324A' }}
          >
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wide transition-all hover:opacity-80"
              style={{
                backgroundColor: 'transparent',
                color: '#E5E7EB',
                border: '1px solid #424754',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wide transition-all hover:opacity-90 disabled:opacity-50"
              style={{
                backgroundColor: '#3B82F6',
                color: '#FFF',
              }}
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
