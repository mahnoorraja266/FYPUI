'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { USBConnectorIcon } from '@/components/icons/USBIcon'
import { Eye, EyeOff, Lock } from 'lucide-react'

export default function USBVerification() {
  const router = useRouter()
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (pin.length < 6) {
      setError('PIN must be at least 6 characters')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      router.push('/dashboard')
      setIsLoading(false)
    }, 100)
  }

  const handleCancel = () => {
    router.push('/auth/login')
  }

  const handleRetry = () => {
    // Reset scanning state
    setError('')
  }

  return (
    <div className="flex flex-col gap-8 max-w-md w-full">
      {/* Title */}
      <div className="flex flex-col gap-2 text-center">
        <h2
          className="text-2xl font-semibold"
          style={{ color: '#E5E7EB' }}
        >
          SECOND FACTOR — USB KEY
        </h2>
        <p
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: '#94A3B8' }}
        >
          AUTHENTICATION_NODE: NODE_01_SECURE
        </p>
      </div>

      {/* USB Detection Box */}
      <div
        className="p-4 rounded border-2 flex items-center gap-3"
        style={{
          backgroundColor: '#1A253B',
          borderColor: '#24324A',
        }}
      >
        {/* USB Icon with Animation */}
        <div className="flex-shrink-0 w-6 h-6" style={{ color: '#F59E0B' }}>
          <USBConnectorIcon className="w-full h-full animate-pulse" />
        </div>
        <div className="flex flex-col gap-1">
          <p style={{ color: '#E5E7EB' }} className="text-sm font-semibold">
            Insert your enrolled USB drive
          </p>
          <p
            className="text-xs font-mono"
            style={{ color: '#F59E0B' }}
          >
            Waiting... / Scanning mounts...
          </p>
        </div>
      </div>

      {/* USB Security PIN */}
      <div className="flex flex-col gap-2">
        <label
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: '#94A3B8' }}
        >
          USB SECURITY PIN
        </label>
        <div className="relative flex items-center">
          <input
            type={showPin ? 'text' : 'password'}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded border-2 focus:outline-none transition-colors text-white placeholder-gray-600 pr-10"
            style={{
              backgroundColor: '#1A253B',
              borderColor: '#24324A',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3B82F6'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#24324A'
            }}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="absolute right-3 flex items-center justify-center"
            style={{ color: '#94A3B8' }}
          >
            {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-sm font-mono" style={{ color: '#EF4444' }}>
          ● {error}
        </div>
      )}

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        disabled={isLoading}
        className="w-full py-3 rounded font-semibold tracking-widest transition-all"
        style={{
          backgroundColor: isLoading ? '#1d4ed8' : '#3B82F6',
          color: 'white',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.7 : 1,
        }}
      >
        {isLoading ? 'CONFIRMING...' : 'CONFIRM'}
      </button>

      {/* Progress Bar */}
      <div
        className="h-1 rounded-full"
        style={{
          backgroundColor: '#24324A',
          overflow: 'hidden',
        }}
      >
        <div
          className="h-full animate-pulse"
          style={{
            backgroundColor: '#3B82F6',
            width: '40%',
          }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 text-xs font-mono">
        <button
          onClick={handleRetry}
          className="flex-1 py-2 rounded border-2 transition-colors hover:bg-opacity-10"
          style={{
            borderColor: '#24324A',
            color: '#E5E7EB',
          }}
        >
          ↻ RETRY DETECTION
        </button>
        <button
          onClick={handleCancel}
          className="flex-1 py-2 rounded border-2 transition-colors hover:bg-opacity-10"
          style={{
            borderColor: '#24324A',
            color: '#E5E7EB',
          }}
        >
          CANCEL AUTH
        </button>
      </div>

      {/* Encryption Status */}
      <div
        className="text-xs font-mono text-center pt-4"
        style={{
          color: '#94A3B8',
          borderTopWidth: '1px',
          borderTopColor: '#24324A',
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <Lock size={12} style={{ color: '#3B82F6' }} />
          <span>AES-256 ENCRYPTED TUNNEL</span>
          <span>SID: 099-281-SENTINEL</span>
        </div>
      </div>
    </div>
  )
}
