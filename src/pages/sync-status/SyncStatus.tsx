'use client'

import { useState } from 'react'
import DashboardHeader from '@/components/dashboard/Header'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import SyncTable from '@/components/sync-status/SyncTable'
import RecentNodeEvents from '@/components/sync-status/RecentNodeEvents'

export default function SyncStatusPage() {
  const [isForcing, setIsForcing] = useState(false)

  const handleForceSyncAll = () => {
    setIsForcing(true)
    setTimeout(() => setIsForcing(false), 100)
  }

  return (
    <div style={{ backgroundColor: '#0B1020' }} className="min-h-screen">
      <DashboardHeader />
      <DashboardSidebar />

      <main className="md:ml-64 pt-12 p-6" style={{ backgroundColor: '#0B1020' }}>
        {/* Header Section */}
        <div className="flex items-start justify-between mb-8 pb-6 border-b" style={{ borderColor: '#1E293B' }}>
          <div>
            <h1 className="text-2xl font-bold tracking-tight uppercase" style={{ color: '#E1E2EC' }}>
              Sync Status
            </h1>
            <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>
              Node synchronization matrix and real-time connectivity logs.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="border px-3 py-2 rounded" style={{ borderColor: '#1E293B' }}>
              <span className="text-xs font-mono font-bold uppercase" style={{ color: '#3B82F6' }}>
                SERVER V.4.8.2-STABLE
              </span>
            </div>
            <button
              onClick={handleForceSyncAll}
              disabled={isForcing}
              className="px-6 py-2 rounded font-bold text-xs uppercase tracking-wider transition-all hover:opacity-90 disabled:opacity-75"
              style={{ backgroundColor: '#3B82F6', color: '#FFF' }}
            >
              {isForcing ? 'Syncing...' : 'Force Sync All'}
            </button>
          </div>
        </div>

        {/* Sync Table */}
        <div className="mb-8">
          <SyncTable />
        </div>

        {/* Recent Node Events */}
        <RecentNodeEvents />
      </main>
    </div>
  )
}
