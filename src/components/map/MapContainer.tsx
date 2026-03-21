'use client'

import { Camera } from 'lucide-react'
import { CAMERAS } from '@/lib/data/cameras'

interface MapContainerProps {
  selectedCameraId: string | null
  onCameraSelect: (cameraId: string) => void
  filter: 'all' | 'online' | 'offline' | 'alerting'
}

export default function MapContainer({ selectedCameraId, onCameraSelect, filter }: MapContainerProps) {
  // Filter cameras based on active filter
  const filteredCameras = CAMERAS.filter((camera) => {
    if (filter === 'online') return camera.status === 'online'
    if (filter === 'offline') return camera.status === 'offline'
    if (filter === 'alerting') return camera.isAlerting
    return true
  })
  return (
    <div className="relative w-full h-full" style={{ backgroundColor: '#0B1020' }}>
      {/* Animated concentric circles background */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
        <defs>
          <radialGradient id="circleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        {[1, 2, 3, 4, 5, 6].map((ring) => (
          <circle
            key={ring}
            cx="50%"
            cy="50%"
            r={`${ring * 12}%`}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1"
            opacity={1 - ring * 0.15}
          />
        ))}
      </svg>

      {/* Camera markers */}
      {filteredCameras.map((camera) => {
        const isSelected = selectedCameraId === camera.id
        const isAlerting = camera.isAlerting

        return (
          <button
            key={camera.id}
            onClick={() => onCameraSelect(camera.id)}
            className="absolute flex flex-col items-center gap-2 group cursor-pointer transition-all hover:scale-110"
            style={{
              left: camera.position.x,
              top: camera.position.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Alert animation for GATE 2 */}
            {isAlerting && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="absolute rounded-full animate-pulse"
                  style={{
                    width: '120px',
                    height: '120px',
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    border: '2px solid #EF4444',
                  }}
                />
                <div
                  className="absolute rounded-full animate-pulse"
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    border: '2px solid #EF4444',
                    animationDelay: '0.2s',
                  }}
                />
              </div>
            )}

            {/* Camera icon */}
            <div
              className="p-2 border-2 rounded relative z-10 transition-all opacity-50"
              style={{
                borderColor: isAlerting ? '#EF4444' : camera.status === 'offline' ? '#6B7280' : isSelected ? '#3B82F6' : '#3B82F6',
                backgroundColor: isAlerting ? '#1A253B' : camera.status === 'offline' ? 'rgba(107, 114, 128, 0.1)' : isSelected ? 'rgba(59, 130, 246, 0.1)' : '#0B1020',
                boxShadow: isSelected ? `0 0 12px rgba(59, 130, 246, 0.5)` : 'none',
              }}
            >
              <Camera size={20} color={isAlerting ? '#EF4444' : camera.status === 'offline' ? '#6B7280' : '#3B82F6'} />
            </div>

            {/* Label */}
            <span
              className="text-xs font-mono font-bold uppercase z-10 transition-colors"
              style={{
                color: isAlerting ? '#EF4444' : camera.status === 'offline' ? '#6B7280' : isSelected ? '#3B82F6' : '#94A3B8',
              }}
            >
              {camera.label}
            </span>
          </button>
        )
      })}

      {/* Coordinates display */}
      <div className="absolute bottom-6 left-6 p-4 border rounded font-mono text-xs" style={{ backgroundColor: '#121A2B', borderColor: '#24324A', color: '#94A3B8' }}>
        <div>LAT: <span style={{ color: '#3B82F6' }}>34.0522° N</span></div>
        <div>LNG: <span style={{ color: '#3B82F6' }}>118.2437° W</span></div>
        <div>ALT: <span style={{ color: '#94A3B8' }}>52.4m MSL</span></div>
      </div>
    </div>
  )
}
