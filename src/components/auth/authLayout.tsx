import React from 'react'
import Logo from '@/components/common/Logo'

interface AuthLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  showVideo?: boolean
  videoHeight?: number
  videoWidth?: number
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  showVideo = false,
  videoHeight = 600,
  videoWidth = 500,
}: AuthLayoutProps) {
  return (
    <div className="flex w-full" style={{ backgroundColor: '#0B1020' }}>
      {/* Left Side - Auth Form */}
      <div
        className="flex flex-col flex-1 p-8 md:p-12 items-center justify-center"
        style={{ backgroundColor: '#0B1020', minWidth: '500px' }}
      >
        {/* Header */}
        <div className="flex flex-col gap-4 mb-12 items-center text-center w-full max-w-md">
          {/* Logo */}
          <Logo size="md" centered />

          {/* Branding */}
          <h1 className="text-3xl font-semibold text-white">SentinalAi</h1>
        </div>

        {/* Divider */}
        <div
          className="w-full max-w-md h-px mb-8"
          style={{ backgroundColor: '#24324A' }}
        />

        {/* Form/Content Section */}
        {children}

        {/* Footer */}
        <div
          className="mt-12 w-full max-w-md text-xs font-mono"
          style={{ color: '#94A3B8' }}
        >
          <div style={{ color: '#24324A' }}>© 2024 ARGUS SYSTEMS - SECURE TERMINAL</div>
        </div>
      </div>

      {/* Right Side - Video/Content */}
      {showVideo && (
        <div
          className="hidden lg:flex items-center justify-center min-h-screen"
          style={{ backgroundColor: '#0B1020', width: '450px' }}
        >
          <div className="flex items-center justify-center" style={{ width: `${videoWidth}px`, height: `${videoHeight}px` }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain rounded border-2"
              style={{ borderColor: '#24324A' }}
            >
              <source src="/A.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  )
}
