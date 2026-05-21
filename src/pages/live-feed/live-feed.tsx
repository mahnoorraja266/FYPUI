'use client'

import { useState } from 'react'
import DashboardHeader from '@/components/dashboard/Header'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import DeviceStreamTable from '@/components/live-feeds/DeviceStreamTable'
import RecordingsTab from '@/components/live-feeds/RecordingsTab'

export default function LiveFeedsPage() {
  const [activeTab, setActiveTab] = useState('live')
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div style={{ backgroundColor: '#0B1020', color: '#E5E7EB' }} className="min-h-screen">
      <DashboardHeader />
      <DashboardSidebar />

      <main className="md:ml-64 pt-12 p-8 pb-20" style={{ backgroundColor: '#0B1020' }}>
        {/* Tabs */}
        <div className="flex gap-8 border-b mb-8" style={{ borderColor: '#24324A' }}>
          <button
            onClick={() => setActiveTab('live')}
            className="pb-3 font-semibold transition-colors relative"
            style={{
              color: activeTab === 'live' ? '#3B82F6' : '#94A3B8',
              fontSize: '16px',
              fontWeight: '500',
            }}
          >
            Live Streams
            {activeTab === 'live' && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: '#3B82F6' }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('recordings')}
            className="pb-3 font-semibold transition-colors relative"
            style={{
              color: activeTab === 'recordings' ? '#3B82F6' : '#94A3B8',
              fontSize: '16px',
              fontWeight: '500',
            }}
          >
            Recordings
            {activeTab === 'recordings' && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: '#3B82F6' }}
              />
            )}
          </button>
        </div>

        {/* Fix 5: Keep active streams alive between tab switches via display: none */}
        <div style={{ display: activeTab === 'live' ? 'block' : 'none' }}>
          <DeviceStreamTable currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
        <div style={{ display: activeTab === 'recordings' ? 'block' : 'none' }}>
          <RecordingsTab />
        </div>
      </main>
    </div>
  )
}
