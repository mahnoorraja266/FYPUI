'use client'

import { useState } from 'react'
import { X, Wifi } from 'lucide-react'
import RegistrationSuccessModal from './RegistrationSuccessModal'

interface RegisterDeviceModalProps {
  isOpen: boolean
  onClose: () => void
  onRegister?: (data: { name: string; location: string; ipAddress: string }) => void
}

export default function RegisterDeviceModal({ isOpen, onClose, onRegister }: RegisterDeviceModalProps) {
  const [formData, setFormData] = useState({
    deviceName: '',
    locationLabel: '',
    ipAddress: '',
  })
  const [isRegistering, setIsRegistering] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [registeredDeviceId, setRegisteredDeviceId] = useState('')
  const [apiKey, setApiKey] = useState('')

  if (!isOpen) return null

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleRegister = async () => {
    if (!formData.deviceName.trim()) return

    setIsRegistering(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Generate device ID and API key
      const deviceId = `SN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      const generatedKey = `sk_live_${Math.random().toString(36).substr(2, 50)}`
      
      setRegisteredDeviceId(deviceId)
      setApiKey(generatedKey)
      setShowSuccessModal(true)
      
      console.log('Device registered:', formData)
      onRegister?.(formData)
    } finally {
      setIsRegistering(false)
    }
  }

  const handleSuccessComplete = () => {
    setShowSuccessModal(false)
    setFormData({ deviceName: '', locationLabel: '', ipAddress: '' })
    onClose()
  }

  const handleCancel = () => {
    setFormData({ deviceName: '', locationLabel: '', ipAddress: '' })
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity"
        onClick={handleCancel}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="w-full max-w-[520px] border-2 rounded shadow-2xl flex flex-col"
          style={{
            backgroundColor: '#121A2B',
            borderColor: '#24324A',
            borderTopWidth: '4px',
            borderTopColor: '#3B82F6',
          }}
        >
          {/* Header */}
          <div
            className="px-6 py-4 border-b flex justify-between items-center"
            style={{ borderColor: '#24324A' }}
          >
            <div>
              <h2 className="text-lg font-bold uppercase tracking-tight" style={{ color: '#E5E7EB' }}>
                Register New Device
              </h2>
              <p className="text-xs uppercase tracking-widest mt-1" style={{ color: '#94A3B8' }}>
                Initiating Core Enrollment Protocol
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="p-1 hover:opacity-80 transition-opacity"
              style={{ color: '#94A3B8' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6" style={{ backgroundColor: '#121A2B' }}>
            {/* Device Name */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                  Device Name
                </label>
                <span className="text-xs" style={{ color: '#3B82F6' }}>
                  REQ_FIELD_01
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={formData.deviceName}
                  onChange={(e) => handleInputChange('deviceName', e.target.value)}
                  placeholder="e.g. CORE-NODE-04"
                  className="w-full rounded px-4 py-2 text-sm outline-none transition-all pr-10"
                  style={{
                    backgroundColor: '#0B1020',
                    borderColor: '#24324A',
                    color: '#E5E7EB',
                    border: '1px solid #24324A',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#3B82F6')}
                  onBlur={(e) => (e.target.style.borderColor = '#24324A')}
                />
                <Wifi size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2" style={{ color: '#94A3B8' }} />
              </div>
            </div>

            {/* Location and IP Address */}
            <div className="grid grid-cols-2 gap-4">
              {/* Location Label */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                  Location Label
                </label>
                <input
                  type="text"
                  value={formData.locationLabel}
                  onChange={(e) => handleInputChange('locationLabel', e.target.value)}
                  placeholder="SEC_ZONE_B"
                  className="w-full rounded px-4 py-2 text-sm outline-none transition-all"
                  style={{
                    backgroundColor: '#0B1020',
                    borderColor: '#24324A',
                    color: '#E5E7EB',
                    border: '1px solid #24324A',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#3B82F6')}
                  onBlur={(e) => (e.target.style.borderColor = '#24324A')}
                />
              </div>

              {/* IP Address */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                  IP Address
                </label>
                <input
                  type="text"
                  value={formData.ipAddress}
                  onChange={(e) => handleInputChange('ipAddress', e.target.value)}
                  placeholder="000.000.0.0"
                  className="w-full rounded px-4 py-2 text-sm outline-none transition-all"
                  style={{
                    backgroundColor: '#0B1020',
                    borderColor: '#24324A',
                    color: '#E5E7EB',
                    border: '1px solid #24324A',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#3B82F6')}
                  onBlur={(e) => (e.target.style.borderColor = '#24324A')}
                />
              </div>
            </div>

            {/* Info Box */}
            <div
              className="p-4 rounded-lg border flex gap-3"
              style={{
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderColor: '#3B82F6',
              }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: '#3B82F6' }}
              >
                <span className="text-xs text-white font-bold">i</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#94A3B8' }}>
                System will automatically assign an encrypted UUID and handshake key upon successful registration. Verify network
                handshake before finalizing.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-6 py-4 border-t flex justify-between items-center"
            style={{ backgroundColor: '#0B1020', borderColor: '#24324A' }}
          >
            <button
              onClick={handleCancel}
              disabled={isRegistering}
              className="px-6 py-2 rounded text-xs font-bold uppercase tracking-widest transition-all hover:opacity-80 disabled:opacity-50"
              style={{
                backgroundColor: '#424754',
                color: '#E5E7EB',
              }}
            >
              Cancel
            </button>

            <div className="flex items-center justify-between gap-4 flex-1 ml-4">
              <div className="text-xs font-mono" style={{ color: '#94A3B8' }}>
                <span style={{ color: '#22C55E' }}>●</span> READY FOR DEPLOYMENT
              </div>
              <span className="text-xs font-mono" style={{ color: '#6B7280' }}>
                ID_AUTH_PROT_0958BAF
              </span>
            </div>

            <button
              onClick={handleRegister}
              disabled={!formData.deviceName.trim() || isRegistering}
              className="px-4 py-2 rounded text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-50"
              style={{
                backgroundColor: formData.deviceName.trim() && !isRegistering ? '#3B82F6' : '#424754',
                color: '#FFF',
              }}
            >
              {isRegistering ? 'Registering...' : 'Register'}
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <RegistrationSuccessModal
        isOpen={showSuccessModal}
        deviceId={registeredDeviceId}
        apiKey={apiKey}
        onClose={() => setShowSuccessModal(false)}
        onComplete={handleSuccessComplete}
      />
    </>
  )
}
