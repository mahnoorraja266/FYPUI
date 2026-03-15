'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function LoginPage() {
  const [operatorId, setOperatorId] = useState('')
  const [secureKey, setSecureKey] = useState('')
  const [showError, setShowError] = useState(false)

  const handleLogin = () => {
    if (!operatorId || !secureKey) {
      setShowError(true)
      return
    }

    console.log('Login attempt:', { operatorId, secureKey })
  }

  return (
    <div
      className="h-screen w-full overflow-hidden flex bg-[#0B1020]"
    >
      {/* LEFT SIDE */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 lg:px-16 relative">

        {/* CONTENT */}
        <div className="w-full max-w-md">

          {/* Logo + Heading */}
          <div className="flex flex-col items-center mb-12">
            <div className="w-24 h-24 flex items-center justify-center mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sentinal%20Logo-SPIbiNK7T91sW4L6Qu7ybo4rOB2TQ3.png"
                alt="Sentinel AI Logo"
                width={96}
                height={96}
                className="object-contain"
              />
            </div>

            <h1 className="text-4xl font-semibold text-white">
              SentinalAi
            </h1>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#24324A] mb-8" />

          {/* Form */}
          <div className="flex flex-col gap-5">

            <label className="text-xs font-bold uppercase tracking-[3px] text-[#94A3B8]">
              USERNAME / PASSWORD
            </label>

            <input
              type="text"
              placeholder="Operator ID"
              value={operatorId}
              onChange={(e) => {
                setOperatorId(e.target.value)
                setShowError(false)
              }}
              className="w-full px-4 py-3 rounded bg-[#121A2B] border border-[#24324A] text-white placeholder-gray-500 outline-none focus:border-blue-500"
            />

            <input
              type="password"
              placeholder="Secure Key"
              value={secureKey}
              onChange={(e) => {
                setSecureKey(e.target.value)
                setShowError(false)
              }}
              className="w-full px-4 py-3 rounded bg-[#121A2B] border border-[#24324A] text-white placeholder-gray-500 outline-none focus:border-blue-500"
            />

            <button
              onClick={handleLogin}
              className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              LOGIN ↗
            </button>

            {showError && (
              <div className="text-sm font-semibold text-red-500">
                ● AUTHENTICATION TIMEOUT - RETRY REQUIRED
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-0 left-0 w-full border-t border-[#24324A] px-6 py-4 flex justify-between text-xs text-[#8c909f]">
          <span>© 2024 ARGUS SYSTEMS - SECURE TERMINAL</span>

          <div className="flex gap-6">
            <span>PRIVACY PROTOCOL</span>
            <span>SYSTEM STATUS</span>
            <span>CONTACT ADMIN</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE VIDEO */}
      <div className="hidden lg:block w-[25%] h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/A.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}