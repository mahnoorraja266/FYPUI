'use client'

import { useRouter } from 'next/navigation'
import { Bell, Power } from 'lucide-react'

export default function DashboardHeader() {
  const router = useRouter()

  return (
    <header className="fixed top-0 left-0 right-0 h-12 flex justify-between items-center px-4 border-b z-50" style={{ backgroundColor: '#0B1020', borderColor: '#24324A' }}>
      <div className="flex items-center gap-4">
        <span className="text-lg font-bold tracking-tight uppercase" style={{ color: '#3B82F6' }}>
          SentinalAi
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-1.5 rounded hover:opacity-80 transition-opacity" style={{ color: '#94A3B8' }}>
          <Bell size={20} />
        </button>
        <button
          onClick={() => router.push('/')}
          className="p-1.5 rounded hover:bg-red-500/20 transition-colors"
          style={{ color: '#EF4444' }}
        >
          <Power size={20} />
        </button>
      </div>
    </header>
  )
}
