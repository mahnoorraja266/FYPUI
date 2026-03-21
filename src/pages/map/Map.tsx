'use client'

import { useState } from 'react'
import DashboardHeader from '@/components/dashboard/Header'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import MapContainer from '@/components/map/MapContainer'
import MapFilterButtons from '@/components/map/FilterButtons'
import DetailPanel from '@/components/map/DetailPanel'
import { CAMERAS } from '@/lib/data/cameras'

export default function MapPage() {
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>('gate2')
  const [activeFilter, setActiveFilter] = useState<'all' | 'online' | 'offline' | 'alerting'>('all')

  const selectedCamera = CAMERAS.find((cam) => cam.id === selectedCameraId)

  return (
    <div style={{ backgroundColor: '#0B1020', color: '#E5E7EB' }} className="min-h-screen">
      <DashboardHeader />
      <DashboardSidebar />

      {/* Main content */}
      <div className="md:ml-64 pt-12 h-[calc(100vh-48px)] flex">
        {/* Map Area */}
        <div className="flex-1 relative">
          <MapFilterButtons activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          <MapContainer selectedCameraId={selectedCameraId} onCameraSelect={setSelectedCameraId} filter={activeFilter} />
        </div>

        {/* Detail Panel */}
        {selectedCamera && (
          <DetailPanel
            camera={selectedCamera}
            onClose={() => setSelectedCameraId(null)}
          />
        )}
      </div>
    </div>
  )
}
