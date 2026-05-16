'use client'

import { useState, useEffect } from 'react'
import DashboardHeader from '@/components/dashboard/Header'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import { DEVICES } from '@/lib/data/devices'
import { Settings, Save, AlertCircle, Info } from 'lucide-react'

export default function SettingsPage() {
  // 1. Dashboard Settings Section (syncs with localStorage)
  const [alertSound, setAlertSound] = useState(true)
  const [alertNotifications, setAlertNotifications] = useState(false)

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedSound = localStorage.getItem('alertSound')
    const storedNotifs = localStorage.getItem('alertNotifications')
    
    if (storedSound !== null) {
      setAlertSound(storedSound === 'true')
    }
    if (storedNotifs !== null) {
      setAlertNotifications(storedNotifs === 'true')
    }
  }, [])

  const handleToggleSound = () => {
    const newVal = !alertSound
    setAlertSound(newVal)
    localStorage.setItem('alertSound', String(newVal))
  }

  const handleToggleNotifications = () => {
    const newVal = !alertNotifications
    setAlertNotifications(newVal)
    localStorage.setItem('alertNotifications', String(newVal))
  }

  // 2. Device Settings Section
  const [selectedDeviceId, setSelectedDeviceId] = useState(DEVICES[0]?.id || '')
  const [isLoadingDevice, setIsLoadingDevice] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null)

  // Device settings values
  const [faceConfidence, setFaceConfidence] = useState(0.60)
  const [weaponConfidence, setWeaponConfidence] = useState(0.50)
  const [frameRate, setFrameRate] = useState('Every 1 frame')
  const [alertCooldown, setAlertCooldown] = useState(30)

  // Simulate device settings loading on device selection
  useEffect(() => {
    if (!selectedDeviceId) return
    setIsLoadingDevice(true)
    setLastSavedTime(null)

    const timer = setTimeout(() => {
      // Setup default mock values depending on selected device to feel real
      if (selectedDeviceId === 'sec-002-bravo') {
        setFaceConfidence(0.70)
        setWeaponConfidence(0.65)
        setFrameRate('Every 2 frames')
        setAlertCooldown(15)
      } else if (selectedDeviceId === 'sec-012-main') {
        setFaceConfidence(0.55)
        setWeaponConfidence(0.50)
        setFrameRate('Every 1 frame')
        setAlertCooldown(45)
      } else {
        setFaceConfidence(0.60)
        setWeaponConfidence(0.50)
        setFrameRate('Every 1 frame')
        setAlertCooldown(30)
      }
      setIsLoadingDevice(false)
    }, 150) // Fast and snappy loading state

    return () => clearTimeout(timer)
  }, [selectedDeviceId])

  // Save device settings command
  const handleSaveDeviceSettings = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 100))
    console.log('PUT /api/devices/' + selectedDeviceId + '/settings successful:', {
      faceConfidence,
      weaponConfidence,
      frameRate,
      alertCooldown,
    })
    setIsSaving(false)
    setLastSavedTime('Just now')
  }

  // Format dynamic relative saved text
  useEffect(() => {
    if (!lastSavedTime || lastSavedTime !== 'Just now') return
    
    let seconds = 0
    const interval = setInterval(() => {
      seconds += 5
      setLastSavedTime(`Last saved: ${seconds} seconds ago`)
    }, 5000)

    return () => clearInterval(interval)
  }, [lastSavedTime])

  return (
    <div style={{ backgroundColor: '#0B1020', color: '#E5E7EB' }} className="min-h-screen">
      <DashboardHeader />
      <DashboardSidebar />

      {/* Main Content */}
      <main className="md:ml-64 pt-12 p-8 pb-20" style={{ backgroundColor: '#0B1020' }}>
        
        {/* Page Title */}
        <div className="flex items-center gap-3 mb-8">
          <Settings size={24} style={{ color: '#3B82F6' }} />
          <h1 className="text-2xl font-bold uppercase tracking-tight" style={{ color: '#E5E7EB', fontFamily: 'Inter' }}>
            Settings
          </h1>
        </div>

        <div className="w-full space-y-6">
          
          {/* DASHBOARD SETTINGS PANEL */}
          <div 
            className="border rounded overflow-hidden" 
            style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}
          >
            <div className="p-5 border-b" style={{ borderColor: '#24324A' }}>
              <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#E5E7EB', fontFamily: 'Inter' }}>
                Dashboard Settings
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Alert Sound Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: '#E5E7EB', fontFamily: 'Inter' }}>
                    Alert Sound
                  </h3>
                  <p className="text-xs mt-1" style={{ color: '#94A3B8', fontFamily: 'Inter' }}>
                    Audible ping when new incidents are detected
                  </p>
                </div>
                <button
                  onClick={handleToggleSound}
                  className="relative w-12 h-6 rounded-full transition-all flex-shrink-0 cursor-pointer"
                  style={{
                    backgroundColor: alertSound ? '#3B82F6' : '#424754',
                  }}
                >
                  <div
                    className="absolute top-0.5 w-5 h-5 rounded-full transition-transform"
                    style={{
                      backgroundColor: '#FFF',
                      transform: alertSound ? 'translateX(24px)' : 'translateX(2px)',
                    }}
                  />
                </button>
              </div>

              {/* Alert Notifications Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: '#E5E7EB', fontFamily: 'Inter' }}>
                    Alert notification pop-ups
                  </h3>
                  <p className="text-xs mt-1" style={{ color: '#94A3B8', fontFamily: 'Inter' }}>
                    Display temporary notification cards in UI
                  </p>
                </div>
                <button
                  onClick={handleToggleNotifications}
                  className="relative w-12 h-6 rounded-full transition-all flex-shrink-0 cursor-pointer"
                  style={{
                    backgroundColor: alertNotifications ? '#3B82F6' : '#424754',
                  }}
                >
                  <div
                    className="absolute top-0.5 w-5 h-5 rounded-full transition-transform"
                    style={{
                      backgroundColor: '#FFF',
                      transform: alertNotifications ? 'translateX(24px)' : 'translateX(2px)',
                    }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* DEVICE SETTINGS PANEL */}
          <div 
            className="border rounded overflow-hidden" 
            style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}
          >
            <div className="p-5 border-b flex justify-between items-center" style={{ borderColor: '#24324A' }}>
              <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#E5E7EB', fontFamily: 'Inter' }}>
                Device Settings
              </h2>
              
              {/* Device Selector Dropdown */}
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8', fontFamily: 'Inter' }}>
                  Select Device:
                </label>
                <select
                  value={selectedDeviceId}
                  onChange={(e) => setSelectedDeviceId(e.target.value)}
                  className="px-3 py-1.5 rounded text-xs font-semibold outline-none transition-all cursor-pointer"
                  style={{
                    backgroundColor: '#0B1020',
                    borderColor: '#24324A',
                    color: '#E5E7EB',
                    border: '1px solid #24324A',
                    minWidth: '160px',
                  }}
                >
                  {DEVICES.map((device) => (
                    <option key={device.id} value={device.id}>
                      {device.name} Camera
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {isLoadingDevice ? (
              /* Loading Skeleton State */
              <div className="p-6 space-y-6 animate-pulse">
                <div className="h-4 bg-[#24324A] rounded w-1/4"></div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="h-3 bg-[#24324A] rounded w-1/2"></div>
                    <div className="h-6 bg-[#24324A] rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-[#24324A] rounded w-1/2"></div>
                    <div className="h-6 bg-[#24324A] rounded"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-10 bg-[#24324A] rounded"></div>
                  <div className="h-10 bg-[#24324A] rounded"></div>
                </div>
              </div>
            ) : (
              /* Settings Form Fields */
              <div className="p-6 space-y-6">
                
                {/* Confidence Sliders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Face Confidence */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium" style={{ color: '#94A3B8', fontFamily: 'Inter' }}>
                        Face Confidence Threshold
                      </label>
                      <span className="text-sm font-bold font-data-mono" style={{ color: '#3B82F6' }}>
                        {faceConfidence.toFixed(2)}
                      </span>
                    </div>
                    <div className="relative h-2 rounded-full" style={{ backgroundColor: '#24324A' }}>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
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
                        className="absolute -top-1.5 w-5 h-5 rounded-full border-2 pointer-events-none transition-all shadow"
                        style={{
                          left: `calc(${faceConfidence * 100}% - 10px)`,
                          backgroundColor: '#3B82F6',
                          borderColor: '#121A2B',
                        }}
                      />
                    </div>
                  </div>

                  {/* Weapon Confidence */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium" style={{ color: '#94A3B8', fontFamily: 'Inter' }}>
                        Weapon Confidence Threshold
                      </label>
                      <span className="text-sm font-bold font-data-mono" style={{ color: '#3B82F6' }}>
                        {weaponConfidence.toFixed(2)}
                      </span>
                    </div>
                    <div className="relative h-2 rounded-full" style={{ backgroundColor: '#24324A' }}>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
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
                        className="absolute -top-1.5 w-5 h-5 rounded-full border-2 pointer-events-none transition-all shadow"
                        style={{
                          left: `calc(${weaponConfidence * 100}% - 10px)`,
                          backgroundColor: '#3B82F6',
                          borderColor: '#121A2B',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Frame Rate & Cooldown Input Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest block" style={{ color: '#94A3B8', fontFamily: 'Inter' }}>
                      Frame Processing Rate
                    </label>
                    <select
                      value={frameRate}
                      onChange={(e) => setFrameRate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded border text-sm font-medium outline-none transition-all cursor-pointer"
                      style={{
                        backgroundColor: '#0B1020',
                        borderColor: '#24324A',
                        color: '#E5E7EB',
                        border: '1px solid #24324A',
                      }}
                    >
                      <option>Every 1 frame</option>
                      <option>Every 2 frames</option>
                      <option>Every 5 frames</option>
                      <option>Every 10 frames</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest block" style={{ color: '#94A3B8', fontFamily: 'Inter' }}>
                      Alert Cooldown Time
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={alertCooldown}
                        onChange={(e) => setAlertCooldown(Number(e.target.value))}
                        className="flex-1 px-3 py-2 rounded border text-sm font-data-mono outline-none focus:border-[#3B82F6]"
                        style={{
                          backgroundColor: '#0B1020',
                          borderColor: '#24324A',
                          color: '#E5E7EB',
                          border: '1px solid #24324A',
                        }}
                      />
                      <div
                        className="px-4 py-2 rounded border font-mono text-xs font-bold uppercase flex items-center justify-center"
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

                {/* Footer Save Section */}
                <div className="pt-4 border-t flex flex-col items-end gap-2" style={{ borderColor: '#24324A' }}>
                  <button
                    onClick={handleSaveDeviceSettings}
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded font-bold text-xs uppercase tracking-widest transition-all hover:opacity-90 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                    style={{
                      backgroundColor: '#3B82F6',
                      color: '#FFF',
                    }}
                  >
                    <Save size={14} />
                    {isSaving ? 'Saving...' : 'Save Device Settings'}
                  </button>
                  {lastSavedTime && (
                    <span className="text-[10px] font-mono tracking-wide" style={{ color: '#22C55E' }}>
                      ✓ {lastSavedTime}
                    </span>
                  )}
                </div>

              </div>
            )}
          </div>

          {/* System Protocol Info Block */}
          <div
            className="p-4 rounded border-l-4 flex gap-3 items-start"
            style={{
              backgroundColor: '#121A2B',
              borderColor: '#3B82F6',
              borderLeftWidth: '4px',
            }}
          >
            <Info size={16} className="mt-0.5" style={{ color: '#3B82F6', flexShrink: 0 }} />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#3B82F6', fontFamily: 'Inter' }}>
                System Policy
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: '#94A3B8', fontFamily: 'Inter' }}>
                Detection models and confidence configurations are dynamically dispatched to their active edge hardware nodes instantly upon saving. Please ensure the target IP has a stable sync channel before modifying core metrics.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
