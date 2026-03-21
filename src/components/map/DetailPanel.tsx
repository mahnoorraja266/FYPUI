import { X, Video, Power, RotateCcw, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import type { Camera } from '@/lib/data/cameras'

interface DetailPanelProps {
  camera: Camera
  onClose: () => void
}

export default function DetailPanel({ camera, onClose }: DetailPanelProps) {
  const [faceModelEnabled, setFaceModelEnabled] = useState(camera.aiModels.faceModel)
  const [weaponModelEnabled, setWeaponModelEnabled] = useState(camera.aiModels.weaponModel)

  const handleTurnOff = () => {
    console.log(`Turning off ${camera.name}`)
  }

  const handleRestart = () => {
    console.log(`Restarting ${camera.name}`)
  }

  const handleViewLiveFeed = () => {
    console.log(`Viewing live feed for ${camera.name}`)
  }

  return (
    <div className="w-80 h-full overflow-y-auto p-4 border-l flex flex-col" style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}>
      {/* Header */}
      <div className="flex justify-between items-start mb-6 pb-4 border-b" style={{ borderColor: '#24324A' }}>
        <div>
          <h2 className="text-xl font-bold" style={{ color: '#E5E7EB' }}>
            {camera.name}
          </h2>
          <p className="text-xs uppercase tracking-widest mt-1" style={{ color: '#94A3B8' }}>
            {camera.sector}
          </p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Status */}
      <div className="mb-6 pb-4 border-b" style={{ borderColor: '#24324A' }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: camera.status === 'online' ? '#22C55E' : '#EF4444' }} />
          <span className="text-sm font-bold uppercase" style={{ color: camera.status === 'online' ? '#22C55E' : '#EF4444' }}>
            {camera.status}
          </span>
          <span className="text-xs" style={{ color: '#94A3B8' }}>
            Last Seen: {camera.lastSeen}
          </span>
        </div>
      </div>

      {/* Health Metrics */}
      <div className="mb-6 pb-4 border-b" style={{ borderColor: '#24324A' }}>
        <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E5E7EB' }}>
          Health Metrics
        </h3>
        <div className="space-y-4">
          {/* CPU Load */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                CPU Load
              </span>
              <span className="text-xs font-bold" style={{ color: '#E5E7EB' }}>
                {camera.health.cpu}%
              </span>
            </div>
            <div className="w-full h-2 rounded" style={{ backgroundColor: '#1A253B' }}>
              <div className="h-full rounded" style={{ width: `${camera.health.cpu}%`, backgroundColor: '#3B82F6' }} />
            </div>
          </div>

          {/* GPU Compute */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                GPU Compute
              </span>
              <span className="text-xs font-bold" style={{ color: '#E5E7EB' }}>
                {camera.health.gpu}%
              </span>
            </div>
            <div className="w-full h-2 rounded" style={{ backgroundColor: '#1A253B' }}>
              <div className="h-full rounded" style={{ width: `${camera.health.gpu}%`, backgroundColor: '#14B8A6' }} />
            </div>
          </div>

          {/* VRAM Usage */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                VRAM Usage
              </span>
              <span className="text-xs font-bold" style={{ color: '#E5E7EB' }}>
                {camera.health.vram}%
              </span>
            </div>
            <div className="w-full h-2 rounded" style={{ backgroundColor: '#1A253B' }}>
              <div className="h-full rounded" style={{ width: `${camera.health.vram}%`, backgroundColor: '#3B82F6' }} />
            </div>
          </div>

          {/* Operating Temp */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                Operating Temp
              </span>
              <span className="text-xs font-bold" style={{ color: camera.health.temp > 60 ? '#F59E0B' : '#22C55E' }}>
                {camera.health.temp}°C
              </span>
            </div>
            <div className="w-full h-2 rounded" style={{ backgroundColor: '#1A253B' }}>
              <div className="h-full rounded" style={{ width: `${(camera.health.temp / 100) * 100}%`, backgroundColor: camera.health.temp > 60 ? '#F59E0B' : '#22C55E' }} />
            </div>
          </div>
        </div>
      </div>

      {/* AI Model States */}
      <div className="mb-6 pb-4 border-b" style={{ borderColor: '#24324A' }}>
        <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E5E7EB' }}>
          AI Model States
        </h3>
        <div className="space-y-3">
          {/* Face Model Toggle */}
          <button
            onClick={() => setFaceModelEnabled(!faceModelEnabled)}
            className="w-full flex items-center justify-between p-3 rounded transition-colors"
            style={{ backgroundColor: '#1A253B' }}
          >
            <span className="text-xs uppercase tracking-widest" style={{ color: '#E5E7EB' }}>
              Face Model
            </span>
            <div
              className="w-12 h-6 rounded-full transition-colors relative"
              style={{ backgroundColor: faceModelEnabled ? '#3B82F6' : '#424754' }}
            >
              <div
                className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
                style={{ [faceModelEnabled ? 'right' : 'left']: '0.25rem' }}
              />
            </div>
          </button>

          {/* Weapon Model Toggle */}
          <button
            onClick={() => setWeaponModelEnabled(!weaponModelEnabled)}
            className="w-full flex items-center justify-between p-3 rounded transition-colors"
            style={{ backgroundColor: '#1A253B' }}
          >
            <span className="text-xs uppercase tracking-widest" style={{ color: '#E5E7EB' }}>
              Weapon Model
            </span>
            <div
              className="w-12 h-6 rounded-full transition-colors relative"
              style={{ backgroundColor: weaponModelEnabled ? '#3B82F6' : '#424754' }}
            >
              <div
                className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
                style={{ [weaponModelEnabled ? 'right' : 'left']: '0.25rem' }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="mb-6 pb-4 border-b" style={{ borderColor: '#24324A' }}>
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={18} style={{ color: '#F59E0B' }} />
          <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F59E0B' }}>
            Active Alerts
          </h3>
          <span className="ml-auto w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#F59E0B', color: '#000' }}>
            {camera.alerts.count}
          </span>
        </div>
        <p className="text-xs" style={{ color: '#94A3B8' }}>
          {camera.alerts.message}
        </p>
        <a href="#" className="text-xs font-bold uppercase mt-3 inline-block" style={{ color: '#3B82F6' }}>
          View Alerts →
        </a>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto space-y-3 pt-4 border-t" style={{ borderColor: '#24324A' }}>
        <button
          onClick={handleViewLiveFeed}
          className="w-full py-2 rounded font-bold uppercase text-sm transition-opacity hover:opacity-80 flex items-center justify-center gap-2"
          style={{ backgroundColor: '#3B82F6', color: '#FFF' }}
        >
          <Video size={16} />
          View Live Feed
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleTurnOff}
            className="py-2 rounded font-bold uppercase text-xs border transition-colors hover:bg-red-500/10"
            style={{ borderColor: '#EF4444', color: '#EF4444' }}
          >
            Turn Off
          </button>
          <button
            onClick={handleRestart}
            className="py-2 rounded font-bold uppercase text-xs transition-colors hover:opacity-80 flex items-center justify-center gap-1"
            style={{ backgroundColor: '#1A253B', color: '#E5E7EB' }}
          >
            <RotateCcw size={14} />
            Restart
          </button>
        </div>
      </div>
    </div>
  )
}
