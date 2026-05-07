'use client'

import { useState } from 'react'
import { X, Play, RotateCcw, RotateCw, Volume2, Settings, Maximize2 } from 'lucide-react'

interface VideoPlayerModalProps {
  isOpen: boolean
  recording?: {
    id: string
    deviceName: string
    location: string
    timeRange: string
    duration: string
  }
  onClose: () => void
}

export default function VideoPlayerModal({ isOpen, recording, onClose }: VideoPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState('12:15')
  const [volume, setVolume] = useState(70)
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0X')
  const [isBuffering, setIsBuffering] = useState(false)

  if (!isOpen || !recording) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-4xl rounded-lg overflow-hidden border"
          style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}
        >
          {/* Header */}
          <div
            className="px-6 py-4 border-b flex justify-between items-center"
            style={{ borderColor: '#24324A' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: '#3B82F6' }}>
                <span style={{ color: '#FFF', fontSize: '12px', fontWeight: 'bold' }}>📹</span>
              </div>
              <div>
                <h3 className="font-bold" style={{ color: '#E5E7EB' }}>
                  {recording.deviceName}
                </h3>
                <p className="text-xs" style={{ color: '#3B82F6' }}>
                  {recording.timeRange}
                </p>
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

          {/* Video Player Area */}
          <div className="relative bg-black">
            {/* Video Container */}
            <div className="w-full aspect-video bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center relative overflow-hidden">
              {/* Placeholder Video Feed */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-blue-900 via-slate-800 to-slate-900">
                <div className="text-center">
                  <div className="w-16 h-16 rounded border-2 border-blue-400 flex items-center justify-center mx-auto mb-4">
                    <span style={{ color: '#38BDF8', fontSize: '24px' }}>📹</span>
                  </div>
                </div>
              </div>

              {/* Timestamp Overlay */}
              <div
                className="absolute top-4 right-4 px-3 py-2 rounded text-xs font-mono"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#E5E7EB' }}
              >
                2023-11-24 14:12:45.02
              </div>

              {/* Buffering Indicator */}
              {isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-8 h-8 border-2 border-transparent rounded-full animate-spin"
                      style={{ borderTopColor: '#3B82F6', borderRightColor: '#3B82F6' }}
                    />
                    <span className="text-xs font-mono" style={{ color: '#94A3B8' }}>
                      BUFFERING...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div
              className="px-6 py-4 border-t"
              style={{ backgroundColor: '#0B1020', borderColor: '#24324A' }}
            >
              {/* Progress Bar */}
              <div className="mb-4">
                <div
                  className="h-1 rounded-full cursor-pointer"
                  style={{ backgroundColor: '#24324A' }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const percentage = (e.clientX - rect.left) / rect.width
                    setCurrentTime(`${Math.floor(percentage * 30)}:${Math.floor((percentage * 30 * 60) % 60)
                      .toString()
                      .padStart(2, '0')}`)
                  }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: '40%', backgroundColor: '#3B82F6' }}
                  />
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Play Button */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 hover:opacity-80 transition-opacity"
                    style={{ color: '#3B82F6' }}
                  >
                    <Play size={18} fill="#3B82F6" />
                  </button>

                  {/* Rewind */}
                  <button
                    className="p-2 hover:opacity-80 transition-opacity"
                    style={{ color: '#94A3B8' }}
                  >
                    <RotateCcw size={18} />
                  </button>

                  {/* Forward */}
                  <button
                    className="p-2 hover:opacity-80 transition-opacity"
                    style={{ color: '#94A3B8' }}
                  >
                    <RotateCw size={18} />
                  </button>

                  {/* Volume */}
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 hover:opacity-80 transition-opacity"
                      style={{ color: '#94A3B8' }}
                    >
                      <Volume2 size={18} />
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-20 h-1 rounded cursor-pointer"
                      style={{
                        backgroundColor: '#24324A',
                        accentColor: '#3B82F6',
                      }}
                    />
                  </div>

                  {/* Time Display */}
                  <span className="text-xs font-mono ml-4" style={{ color: '#E5E7EB' }}>
                    {currentTime} / 30:00
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Playback Speed */}
                  <button
                    className="px-3 py-1 rounded text-xs font-bold border"
                    style={{
                      borderColor: '#24324A',
                      backgroundColor: 'transparent',
                      color: '#94A3B8',
                    }}
                    onClick={() => setPlaybackSpeed(playbackSpeed === '1.0X' ? '1.5X' : '1.0X')}
                  >
                    {playbackSpeed}
                  </button>

                  {/* Settings */}
                  <button
                    className="p-2 hover:opacity-80 transition-opacity"
                    style={{ color: '#94A3B8' }}
                  >
                    <Settings size={18} />
                  </button>

                  {/* Fullscreen */}
                  <button
                    className="p-2 hover:opacity-80 transition-opacity"
                    style={{ color: '#94A3B8' }}
                  >
                    <Maximize2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-6 py-4 border-t flex justify-between items-end"
            style={{ borderColor: '#24324A' }}
          >
            <div>
              <p className="text-xs uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                Location
              </p>
              <p className="font-bold mt-1" style={{ color: '#E5E7EB' }}>
                {recording.location}
              </p>
            </div>
            <button
              className="px-6 py-2 rounded font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all hover:opacity-90"
              style={{ backgroundColor: '#3B82F6', color: '#FFF' }}
            >
              <span>⬇</span>
              Export Logs
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
