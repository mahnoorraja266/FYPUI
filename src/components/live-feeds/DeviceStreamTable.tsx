'use client'

import { useState, useEffect } from 'react'
import { DEVICES, Device } from '@/lib/data/devices'
import { Play, Square, Circle, Video, Plus, Trash2, ShieldAlert } from 'lucide-react'

export default function DeviceStreamTable({
  currentPage,
  onPageChange,
}: {
  currentPage: number
  onPageChange: (page: number) => void
}) {
  // Dual Stream Slots: slot1 (pre-selected to first online device) and slot2 (null initially)
  const onlineDevices = DEVICES.filter(d => d.status === 'online')
  const defaultDevice = onlineDevices[0] || DEVICES[0]

  const [stream1, setStream1] = useState<Device | null>(defaultDevice)
  const [stream2, setStream2] = useState<Device | null>(null)

  // Stream controls for Slot 1
  const [face1, setFace1] = useState(true)
  const [weapon1, setWeapon1] = useState(true)
  const [loading1, setLoading1] = useState(false)
  const [connecting1, setConnecting1] = useState(false)

  // Stream controls for Slot 2
  const [face2, setFace2] = useState(true)
  const [weapon2, setWeapon2] = useState(true)
  const [loading2, setLoading2] = useState(false)
  const [connecting2, setConnecting2] = useState(false)

  // Simulated live timestamps
  const [timeStr, setTimeStr] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const pad = (n: number) => String(n).padStart(2, '0')
      const padMs = (n: number) => String(n).padStart(3, '0')
      setTimeStr(`${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${padMs(now.getMilliseconds())}`)
    }
    const timer = setInterval(updateTime, 33) // ~30 fps ticking
    return () => clearInterval(timer)
  }, [])

  // Simulator for WebSocket overlay toggles with 100ms latency simulation
  const handleToggleFace1 = () => {
    setLoading1(true)
    setTimeout(() => {
      setFace1(prev => !prev)
      setLoading1(false)
    }, 100)
  }

  const handleToggleWeapon1 = () => {
    setLoading1(true)
    setTimeout(() => {
      setWeapon1(prev => !prev)
      setLoading1(false)
    }, 100)
  }

  const handleToggleFace2 = () => {
    setLoading2(true)
    setTimeout(() => {
      setFace2(prev => !prev)
      setLoading2(false)
    }, 100)
  }

  const handleToggleWeapon2 = () => {
    setLoading2(true)
    setTimeout(() => {
      setWeapon2(prev => !prev)
      setLoading2(false)
    }, 100)
  }

  // Handle device selections with snappy loading state
  const handleSelectDevice1 = (id: string) => {
    const dev = DEVICES.find(d => d.id === id)
    if (dev) {
      setConnecting1(true)
      setTimeout(() => {
        setStream1(dev)
        setConnecting1(false)
      }, 150)
    }
  }

  const handleSelectDevice2 = (id: string) => {
    const dev = DEVICES.find(d => d.id === id)
    if (dev) {
      setConnecting2(true)
      setTimeout(() => {
        setStream2(dev)
        setConnecting2(false)
      }, 150)
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Device Stream Selector Control Panel */}
      <div 
        className="p-5 border rounded-lg flex flex-col md:flex-row gap-4 items-center justify-between"
        style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}
      >
        <div className="flex items-center gap-3">
          <Video className="animate-pulse" style={{ color: '#3B82F6' }} size={22} />
          <div>
            <h2 className="text-md font-bold uppercase tracking-wide" style={{ color: '#E5E7EB', fontFamily: 'Inter' }}>
              Active Stream Controls
            </h2>
            <p className="text-xs" style={{ color: '#94A3B8', fontFamily: 'Inter' }}>
              Configure and overlay up to two hardware feeds simultaneously.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          {/* Stream 1 Selector dropdown */}
          {stream1 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#3B82F6', fontFamily: 'Inter' }}>Stream 1:</span>
              <select
                value={stream1.id}
                onChange={(e) => handleSelectDevice1(e.target.value)}
                className="px-3 py-1.5 rounded text-xs font-semibold outline-none transition-all cursor-pointer"
                style={{
                  backgroundColor: '#0B1020',
                  borderColor: '#24324A',
                  color: '#E5E7EB',
                  border: '1px solid #24324A',
                }}
              >
                {DEVICES.map((d) => (
                  <option key={d.id} value={d.id} disabled={d.status === 'offline'}>
                    {d.name} {d.status === 'offline' ? '(OFFLINE)' : ''}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Stream 2 Selector dropdown */}
          {stream2 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#F59E0B', fontFamily: 'Inter' }}>Stream 2:</span>
              <select
                value={stream2.id}
                onChange={(e) => handleSelectDevice2(e.target.value)}
                className="px-3 py-1.5 rounded text-xs font-semibold outline-none transition-all cursor-pointer"
                style={{
                  backgroundColor: '#0B1020',
                  borderColor: '#24324A',
                  color: '#E5E7EB',
                  border: '1px solid #24324A',
                }}
              >
                {DEVICES.map((d) => (
                  <option key={d.id} value={d.id} disabled={d.status === 'offline'}>
                    {d.name} {d.status === 'offline' ? '(OFFLINE)' : ''}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Add Second Stream Button */}
          {!stream2 && (
            <button
              onClick={() => {
                const available = onlineDevices.find(d => d.id !== stream1?.id) || onlineDevices[0]
                if (available) {
                  setStream2(available)
                }
              }}
              className="px-4 py-2 rounded font-bold text-xs uppercase tracking-widest transition-all hover:opacity-90 flex items-center gap-2 cursor-pointer"
              style={{
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                color: '#3B82F6',
                border: '1px solid #3B82F6',
              }}
            >
              <Plus size={14} />
              Add Second Stream
            </button>
          )}
        </div>
      </div>

      {/* Grid containing inline stream players */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* STREAM PLAYER SLOT 1 */}
        {stream1 ? (
          <div 
            className="border rounded-lg overflow-hidden flex flex-col transition-all duration-300"
            style={{ 
              backgroundColor: '#121A2B', 
              borderColor: connecting1 ? '#3B82F6' : '#24324A',
              boxShadow: connecting1 ? '0 0 15px rgba(59, 130, 246, 0.2)' : 'none'
            }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b flex justify-between items-center" style={{ borderColor: '#24324A', backgroundColor: '#161F33' }}>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: '#22C55E' }} />
                <div className="w-2.5 h-2.5 rounded-full absolute" style={{ backgroundColor: '#22C55E' }} />
                <span className="font-bold text-sm uppercase tracking-wide ml-1.5" style={{ color: '#E5E7EB', fontFamily: 'Inter' }}>
                  STREAM 1 — {stream1.name} Camera
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold" style={{ color: '#94A3B8' }}>
                <span className="px-2 py-0.5 rounded uppercase text-[10px]" style={{ backgroundColor: '#0B1020', border: '1px solid #24324A', color: '#22C55E' }}>ONLINE</span>
                <span className="font-data-mono">1080p / 30fps</span>
              </div>
            </div>

            {/* Video Canvas Container */}
            <div className="flex-1 relative bg-black aspect-video flex items-center justify-center overflow-hidden">
              {connecting1 ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-[#3B82F6] animate-spin" />
                  <span className="text-xs font-mono" style={{ color: '#94A3B8' }}>Connecting to edge device...</span>
                </div>
              ) : (
                <div 
                  className="w-full h-full relative"
                  style={{
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="%23000"/><line x1="0" y1="0" x2="60" y2="0" stroke="%231E293B" stroke-width="0.5"/><line x1="0" y1="30" x2="60" y2="30" stroke="%231E293B" stroke-width="0.5"/><line x1="0" y1="0" x2="0" y2="60" stroke="%231E293B" stroke-width="0.5"/><line x1="30" y1="0" x2="30" y2="60" stroke="%231E293B" stroke-width="0.5"/></svg>')`,
                  }}
                >
                  {/* Neon Cyber Mock Video Stream Feed */}
                  <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 relative flex items-center justify-center opacity-90">
                    
                    {/* Glowing grid frame overlay */}
                    <div className="absolute inset-4 border border-[#3B82F6]/10 pointer-events-none" />

                    {/* Camera Label Overlay */}
                    <div className="absolute top-4 left-4 px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded" style={{ backgroundColor: 'rgba(11, 16, 32, 0.7)', color: '#38BDF8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                      CAM_01_FEED
                    </div>

                    {/* Live Timestamp Ticker */}
                    <div 
                      className="absolute top-4 right-4 px-3 py-1 text-xs font-mono rounded" 
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#E5E7EB' }}
                    >
                      {timeStr || 'LIVE'}
                    </div>

                    {/* Bounding Boxes based on overlays */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {/* Face bounding box */}
                      {face1 && (
                        <>
                          <rect x="25%" y="20%" width="18%" height="32%" fill="none" stroke="#3B82F6" strokeWidth="2" className="animate-pulse" />
                          <rect x="25%" y="15%" width="78" height="16" fill="#3B82F6" />
                          <text x="27%" y="19%" fill="#FFF" fontSize="10" fontWeight="bold" fontFamily="Inter">
                            OPERATOR 0.94
                          </text>
                        </>
                      )}

                      {/* Weapon bounding box */}
                      {weapon1 && (
                        <>
                          <rect x="58%" y="45%" width="22%" height="30%" fill="none" stroke="#EF4444" strokeWidth="2" />
                          <rect x="58%" y="40%" width="88" height="16" fill="#EF4444" />
                          <text x="60%" y="44%" fill="#FFF" fontSize="10" fontWeight="bold" fontFamily="Inter">
                            WEAPON DETECTED
                          </text>
                        </>
                      )}
                    </svg>

                    {/* Center Scanlines HUD */}
                    <div className="w-16 h-16 border border-dashed border-[#38BDF8]/20 rounded-full animate-spin pointer-events-none flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#38BDF8]/40" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Control Panel */}
            <div className="px-5 py-4 border-t flex flex-wrap gap-4 items-center justify-between" style={{ borderColor: '#24324A', backgroundColor: '#161F33' }}>
              <div className="flex gap-6">
                {/* Face Overlay Toggle */}
                <button
                  onClick={handleToggleFace1}
                  disabled={loading1}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all hover:opacity-85 cursor-pointer disabled:opacity-50"
                  style={{ color: face1 ? '#38BDF8' : '#4E5A70' }}
                >
                  <Circle size={10} fill={face1 ? '#38BDF8' : 'transparent'} />
                  Face Overlay {loading1 && '...'}
                </button>

                {/* Weapon Detection Toggle */}
                <button
                  onClick={handleToggleWeapon1}
                  disabled={loading1}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all hover:opacity-85 cursor-pointer disabled:opacity-50"
                  style={{ color: weapon1 ? '#EF4444' : '#4E5A70' }}
                >
                  <Circle size={10} fill={weapon1 ? '#EF4444' : 'transparent'} />
                  Weapon Overlay {loading1 && '...'}
                </button>
              </div>

              {/* Stop Stream button */}
              <button
                onClick={() => setStream1(null)}
                className="px-3.5 py-1.5 rounded text-xs font-bold uppercase transition-all hover:opacity-90 flex items-center gap-1.5 cursor-pointer"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#EF4444',
                  border: '1px solid #EF4444',
                }}
              >
                <Square size={12} fill="#EF4444" />
                Stop Stream
              </button>
            </div>
          </div>
        ) : (
          /* Empty Slot 1 Placeholder Card */
          <div 
            className="border border-dashed rounded-lg flex flex-col items-center justify-center p-12 text-center aspect-video"
            style={{ borderColor: '#24324A', backgroundColor: '#121A2B' }}
          >
            <ShieldAlert size={36} className="mb-4" style={{ color: '#6B7280' }} />
            <h4 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: '#94A3B8', fontFamily: 'Inter' }}>
              Stream 1 Stopped
            </h4>
            <p className="text-xs max-w-xs mb-6" style={{ color: '#6B7280', fontFamily: 'Inter' }}>
              Select a node device from the top controls or connect a camera to load real-time telemetry.
            </p>
            <button
              onClick={() => setStream1(defaultDevice)}
              className="px-4 py-2 rounded font-bold text-xs uppercase tracking-widest transition-all hover:bg-[#3B82F6]/20 cursor-pointer"
              style={{
                border: '1px solid #3B82F6',
                color: '#3B82F6',
                backgroundColor: 'transparent',
              }}
            >
              Start Feed 1
            </button>
          </div>
        )}

        {/* STREAM PLAYER SLOT 2 */}
        {stream2 ? (
          <div 
            className="border rounded-lg overflow-hidden flex flex-col transition-all duration-300"
            style={{ 
              backgroundColor: '#121A2B', 
              borderColor: connecting2 ? '#F59E0B' : '#24324A',
              boxShadow: connecting2 ? '0 0 15px rgba(245, 158, 11, 0.2)' : 'none'
            }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b flex justify-between items-center" style={{ borderColor: '#24324A', backgroundColor: '#161F33' }}>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: '#22C55E' }} />
                <div className="w-2.5 h-2.5 rounded-full absolute" style={{ backgroundColor: '#22C55E' }} />
                <span className="font-bold text-sm uppercase tracking-wide ml-1.5" style={{ color: '#E5E7EB', fontFamily: 'Inter' }}>
                  STREAM 2 — {stream2.name} Camera
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold" style={{ color: '#94A3B8' }}>
                <span className="px-2 py-0.5 rounded uppercase text-[10px]" style={{ backgroundColor: '#0B1020', border: '1px solid #24324A', color: '#22C55E' }}>ONLINE</span>
                <span className="font-data-mono">1080p / 30fps</span>
              </div>
            </div>

            {/* Video Canvas Container */}
            <div className="flex-1 relative bg-black aspect-video flex items-center justify-center overflow-hidden">
              {connecting2 ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-[#F59E0B] animate-spin" />
                  <span className="text-xs font-mono" style={{ color: '#94A3B8' }}>Connecting to edge device...</span>
                </div>
              ) : (
                <div 
                  className="w-full h-full relative"
                  style={{
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="%23000"/><line x1="0" y1="0" x2="60" y2="0" stroke="%231E293B" stroke-width="0.5"/><line x1="0" y1="30" x2="60" y2="30" stroke="%231E293B" stroke-width="0.5"/><line x1="0" y1="0" x2="0" y2="60" stroke="%231E293B" stroke-width="0.5"/><line x1="30" y1="0" x2="30" y2="60" stroke="%231E293B" stroke-width="0.5"/></svg>')`,
                  }}
                >
                  {/* Neon Cyber Mock Video Stream Feed */}
                  <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 relative flex items-center justify-center opacity-90">
                    
                    {/* Glowing grid frame overlay */}
                    <div className="absolute inset-4 border border-[#F59E0B]/10 pointer-events-none" />

                    {/* Camera Label Overlay */}
                    <div className="absolute top-4 left-4 px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded" style={{ backgroundColor: 'rgba(11, 16, 32, 0.7)', color: '#FBBF24', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
                      CAM_02_FEED
                    </div>

                    {/* Live Timestamp Ticker */}
                    <div 
                      className="absolute top-4 right-4 px-3 py-1 text-xs font-mono rounded" 
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#E5E7EB' }}
                    >
                      {timeStr || 'LIVE'}
                    </div>

                    {/* Bounding Boxes based on overlays */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {/* Face bounding box */}
                      {face2 && (
                        <>
                          <rect x="30%" y="30%" width="20%" height="35%" fill="none" stroke="#F59E0B" strokeWidth="2" className="animate-pulse" />
                          <rect x="30%" y="25%" width="88" height="16" fill="#F59E0B" />
                          <text x="32%" y="29%" fill="#000" fontSize="10" fontWeight="bold" fontFamily="Inter">
                            ENROLLED USER
                          </text>
                        </>
                      )}

                      {/* Weapon bounding box */}
                      {weapon2 && (
                        <>
                          <rect x="62%" y="38%" width="18%" height="28%" fill="none" stroke="#EF4444" strokeWidth="2" />
                          <rect x="62%" y="33%" width="88" height="16" fill="#EF4444" />
                          <text x="64%" y="37%" fill="#FFF" fontSize="10" fontWeight="bold" fontFamily="Inter">
                            SUSPICIOUS TOOL
                          </text>
                        </>
                      )}
                    </svg>

                    {/* Center Scanlines HUD */}
                    <div className="w-16 h-16 border border-dashed border-[#F59E0B]/20 rounded-full animate-spin pointer-events-none flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#F59E0B]/40" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Control Panel */}
            <div className="px-5 py-4 border-t flex flex-wrap gap-4 items-center justify-between" style={{ borderColor: '#24324A', backgroundColor: '#161F33' }}>
              <div className="flex gap-6">
                {/* Face Overlay Toggle */}
                <button
                  onClick={handleToggleFace2}
                  disabled={loading2}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all hover:opacity-85 cursor-pointer disabled:opacity-50"
                  style={{ color: face2 ? '#F59E0B' : '#4E5A70' }}
                >
                  <Circle size={10} fill={face2 ? '#F59E0B' : 'transparent'} />
                  Face Overlay {loading2 && '...'}
                </button>

                {/* Weapon Detection Toggle */}
                <button
                  onClick={handleToggleWeapon2}
                  disabled={loading2}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all hover:opacity-85 cursor-pointer disabled:opacity-50"
                  style={{ color: weapon2 ? '#EF4444' : '#4E5A70' }}
                >
                  <Circle size={10} fill={weapon2 ? '#EF4444' : 'transparent'} />
                  Weapon Overlay {loading2 && '...'}
                </button>
              </div>

              {/* Stop Stream button */}
              <button
                onClick={() => setStream2(null)}
                className="px-3.5 py-1.5 rounded text-xs font-bold uppercase transition-all hover:opacity-90 flex items-center gap-1.5 cursor-pointer"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#EF4444',
                  border: '1px solid #EF4444',
                }}
              >
                <Square size={12} fill="#EF4444" />
                Stop Stream
              </button>
            </div>
          </div>
        ) : (
          /* Empty Slot 2 Placeholder Card */
          <div 
            className="border border-dashed rounded-lg flex flex-col items-center justify-center p-12 text-center aspect-video transition-all duration-200 hover:border-[#3B82F6]/50"
            style={{ borderColor: '#24324A', backgroundColor: '#121A2B' }}
          >
            <ShieldAlert size={36} className="mb-4" style={{ color: '#6B7280' }} />
            <h4 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: '#94A3B8', fontFamily: 'Inter' }}>
              Stream 2 Inactive
            </h4>
            <p className="text-xs max-w-xs mb-6" style={{ color: '#6B7280', fontFamily: 'Inter' }}>
              Add a second independent node stream to perform side-by-side surveillance analysis.
            </p>
            <button
              onClick={() => {
                const available = onlineDevices.find(d => d.id !== stream1?.id) || onlineDevices[0]
                if (available) {
                  setStream2(available)
                }
              }}
              className="px-4 py-2 rounded font-bold text-xs uppercase tracking-widest transition-all hover:bg-[#3B82F6]/20 cursor-pointer"
              style={{
                border: '1px solid #3B82F6',
                color: '#3B82F6',
                backgroundColor: 'transparent',
              }}
            >
              Start Feed 2
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
