'use client'

import { useState } from 'react'
import { CheckCircle, AlertTriangle, Copy, Download } from 'lucide-react'

interface RegistrationSuccessModalProps {
  isOpen: boolean
  deviceId: string
  apiKey: string
  onClose: () => void
  onComplete: () => void
}

export default function RegistrationSuccessModal({
  isOpen,
  deviceId,
  apiKey,
  onClose,
  onComplete,
}: RegistrationSuccessModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(apiKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDownloadConfig = () => {
    const config = {
      deviceId,
      apiKey,
      timestamp: new Date().toISOString(),
    }
    const element = document.createElement('a')
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(config, null, 2))}`)
    element.setAttribute('download', `device-config-${deviceId}.json`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
      {/* Modal Container */}
      <div
        className="w-full max-w-2xl rounded-lg border-2 shadow-2xl overflow-hidden"
        style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}
      >
        {/* Success Header */}
        <div
          className="p-6 border-b flex items-center gap-4"
          style={{ backgroundColor: '#1A253B', borderColor: '#24324A' }}
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: '#22C55E', border: '2px solid' }}>
            <CheckCircle size={24} style={{ color: '#22C55E' }} />
          </div>
          <div>
            <h1 className="text-lg font-bold uppercase tracking-tight" style={{ color: '#E5E7EB' }}>
              Registration Successful
            </h1>
            <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>
              Device ID: <span className="font-mono" style={{ color: '#3B82F6' }}>{deviceId}</span> has been provisioned.
            </p>
          </div>
        </div>

        {/* Warning Banner */}
        <div
          className="p-6 border-b flex items-start gap-4"
          style={{
            backgroundColor: 'rgba(245, 158, 11, 0.05)',
            borderColor: '#F59E0B',
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(245, 158, 11, 0.05) 10px, rgba(245, 158, 11, 0.05) 20px)',
          }}
        >
          <AlertTriangle size={20} style={{ color: '#F59E0B', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F59E0B' }}>
              Critical Security Warning
            </h3>
            <p className="text-xs mt-2 leading-relaxed" style={{ color: '#E5E7EB' }}>
              For security reasons, this API key will{' '}
              <span className="font-bold underline">only be shown once</span>. Store it in a secure hardware module or encrypted vault immediately. We do not store this key on our servers.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* API Key Section Title */}
          <div>
            <h2 className="text-base font-bold" style={{ color: '#E5E7EB' }}>
              Integrator API Key
            </h2>
            <p className="text-xs mt-2" style={{ color: '#94A3B8' }}>
              Use this key to authenticate your local edge processor with the SENTINALAI core network.
            </p>
          </div>

          {/* API Key Display Block */}
          <div className="rounded-lg border p-4" style={{ backgroundColor: '#0B1020', borderColor: '#24324A' }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[9px] font-mono uppercase" style={{ color: '#6B7280' }}>
                AES-256 Encrypted
              </span>
            </div>
            <code
              className="block text-xs font-mono break-all p-3 rounded mb-4"
              style={{ backgroundColor: '#0B1020', color: '#3B82F6' }}
            >
              {apiKey}
            </code>
            <button
              onClick={handleCopyKey}
              className="w-full px-4 py-2 rounded font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ backgroundColor: '#3B82F6', color: '#FFF' }}
            >
              <Copy size={16} />
              {copied ? 'Copied!' : 'Copy Key to Clipboard'}
            </button>
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span
                className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs flex-shrink-0"
                style={{ backgroundColor: '#24324A', color: '#94A3B8' }}
              >
                01
              </span>
              <p className="text-xs" style={{ color: '#94A3B8' }}>
                Include this key in the <code className="font-mono px-1" style={{ backgroundColor: '#1A253B', color: '#14B8A6' }}>X-API-KEY</code> header of all requests.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span
                className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs flex-shrink-0"
                style={{ backgroundColor: '#24324A', color: '#94A3B8' }}
              >
                02
              </span>
              <p className="text-xs" style={{ color: '#94A3B8' }}>
                Rotate this credential every 90 days as per{' '}
                <span className="cursor-pointer hover:underline" style={{ color: '#3B82F6' }}>
                  Security Protocol 44-B
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="p-6 border-t flex justify-end gap-4"
          style={{ backgroundColor: '#0B1020', borderColor: '#24324A' }}
        >
          <button
            onClick={handleDownloadConfig}
            className="px-4 py-2 rounded font-bold text-xs uppercase tracking-widest border transition-all hover:opacity-80"
            style={{ backgroundColor: '#1A253B', borderColor: '#24324A', color: '#E5E7EB' }}
          >
            <Download size={14} className="inline mr-2" />
            Download Config
          </button>
          <button
            onClick={onComplete}
            className="px-6 py-2 rounded font-bold text-xs uppercase tracking-widest transition-all hover:opacity-90"
            style={{ backgroundColor: '#3B82F6', color: '#FFF' }}
          >
            Done & Continue
          </button>
        </div>
      </div>
    </div>
  )
}
