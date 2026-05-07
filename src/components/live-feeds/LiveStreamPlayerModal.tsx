'use client'

import { useState } from 'react'
import { Volume2, VolumeX, Maximize2, Circle } from 'lucide-react'

interface LiveStreamPlayerModalProps {
  isOpen: boolean
  stream?: {
    id: string
    name: string
    location: string
    resolution: string
    fps: number
    latency: string
  }
  onClose: () => void
}

export default function LiveStreamPlayerModal({ isOpen, stream, onClose }: LiveStreamPlayerModalProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(70)
  const [faceOverlay, setFaceOverlay] = useState(true)
  const [weaponDetection, setWeaponDetection] = useState(true)

  if (!isOpen || !stream) return null

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
          className="pointer-events-auto w-[90vw] h-[90vh] rounded-lg overflow-hidden flex flex-col"
          style={{ backgroundColor: '#0B1020', maxWidth: '1100px', maxHeight: '700px' }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22C55E' }} />
              <span className="font-bold text-sm uppercase tracking-wide" style={{ color: '#E5E7EB' }}>
                {stream.name}
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs" style={{ color: '#94A3B8' }}>
              <span>{stream.resolution} / {stream.fps}fps</span>
              <span>LAT: {stream.latency}</span>
            </div>
          </div>

          {/* Video Player Area */}
          <div className="flex-1 relative overflow-hidden bg-black">
            {/* Video Placeholder with Grid */}
            <div
              className="w-full h-full relative"
              style={{
                backgroundImage: `url('data:image/svg+xml;utf8,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="%23000"/><line x1="0" y1="0" x2="100" y2="0" stroke="%23333" stroke-width="1"/><line x1="0" y1="50" x2="100" y2="50" stroke="%23333" stroke-width="1"/><line x1="0" y1="100" x2="100" y2="100" stroke="%23333" stroke-width="1"/><line x1="0" y1="0" x2="0" y2="100" stroke="%23333" stroke-width="1"/><line x1="50" y1="0" x2="50" y2="100" stroke="%23333" stroke-width="1"/><line x1="100" y1="0" x2="100" y2="100" stroke="%23333" stroke-width="1"/></svg>')`,
                backgroundSize: '100px 100px',
              }}
            >
              {/* Simulated Video Content */}
              <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative">
                {/* Timestamp */}
                <div
                  className="absolute top-4 left-4 px-3 py-1 text-sm font-mono"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#E5E7EB' }}
                >
                  2023-11-24 22:45:12.334
                </div>

                {/* Audio Controls */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded transition-all hover:opacity-80"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: '#94A3B8', border: '1px solid #38BDF8' }}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <button
                    className="p-2 rounded transition-all hover:opacity-80"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: '#94A3B8', border: '1px solid #38BDF8' }}
                  >
                    <Maximize2 size={18} />
                  </button>
                </div>

                {/* Detection Overlays */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Person Detection Box */}
                  <rect x="30%" y="25%" width="25%" height="45%" fill="none" stroke="#F59E0B" strokeWidth="2" />
                  <text x="30%" y="23%" fill="#F59E0B" fontSize="12" fontWeight="bold">
                    PERSON 0.98
                  </text>

                  {/* Vehicle Detection Box */}
                  <rect x="55%" y="40%" width="35%" height="35%" fill="none" stroke="#38BDF8" strokeWidth="2" />
                  <text x="55%" y="38%" fill="#38BDF8" fontSize="12" fontWeight="bold">
                    VEHICLE 0.94
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div
            className="flex items-center justify-between px-6 py-4 border-t"
            style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}
          >
            <div className="flex items-center gap-8">
              {/* Face Overlay */}
              <button
                onClick={() => setFaceOverlay(!faceOverlay)}
                className="flex items-center gap-2 text-xs uppercase tracking-wide transition-all hover:opacity-80"
                style={{ color: faceOverlay ? '#38BDF8' : '#6B7280' }}
              >
                <Circle size={12} fill={faceOverlay ? '#38BDF8' : 'transparent'} />
                Face Overlay
              </button>

              {/* Weapon Detection */}
              <button
                onClick={() => setWeaponDetection(!weaponDetection)}
                className="flex items-center gap-2 text-xs uppercase tracking-wide transition-all hover:opacity-80"
                style={{ color: weaponDetection ? '#EF4444' : '#6B7280' }}
              >
                <Circle size={12} fill={weaponDetection ? '#EF4444' : 'transparent'} />
                Weapon detection
              </button>
            </div>

            <div className="flex items-center gap-3">
              {/* Snapshot Button */}
              <button
                className="px-4 py-2 rounded text-xs font-bold uppercase border transition-all hover:opacity-80"
                style={{
                  borderColor: '#38BDF8',
                  backgroundColor: 'transparent',
                  color: '#38BDF8',
                  border: '1px solid #38BDF8',
                }}
              >
                📷 Snapshot
              </button>

              {/* Stop Stream Button */}
              <button
                onClick={onClose}
                className="px-4 py-2 rounded text-xs font-bold uppercase border transition-all hover:opacity-80"
                style={{
                  borderColor: '#EF4444',
                  backgroundColor: 'transparent',
                  color: '#EF4444',
                  border: '1px solid #EF4444',
                }}
              >
                ⊘ Stop Stream
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
