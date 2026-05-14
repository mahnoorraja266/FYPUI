import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const [operatorId, setOperatorId] = useState('')
  const [secureKey, setSecureKey] = useState('')
  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!operatorId.trim() || !secureKey.trim()) {
      setShowError(true)
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log('Login attempt:', { operatorId, secureKey })
      router.push('/usb-verification')
    }, 150) // Ultra fast snappiness delay
  }

  return (
    <form onSubmit={handleLogin} className="w-full max-w-md flex flex-col gap-5">
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
        disabled={isLoading}
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
        disabled={isLoading}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'VERIFYING...' : 'LOGIN ↗'}
      </button>

      {showError && (
        <div className="text-sm font-semibold text-red-500">
          ● AUTHENTICATION TIMEOUT - RETRY REQUIRED
        </div>
      )}
    </form>
  )
}
