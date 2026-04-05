'use client'

import { useState } from 'react'
import DashboardHeader from '@/components/dashboard/Header'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import DeviceTable from '@/components/devices/DeviceTable'
import SystemMetricsSection from '@/components/devices/SystemMetrics'
import DeviceDetailsModal from '@/components/devices/DeviceDetailsModal'
import RegisterDeviceModal from '@/components/devices/RegisterDeviceModal'
import { DEVICES, SYSTEM_METRICS } from '@/lib/data/devices'
import type { Device } from '@/lib/data/devices'

export default function DevicesPage() {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  const handleRegisterDevice = () => {
    setIsRegisterModalOpen(true)
  }

  const handleDeviceDetails = (deviceId: string) => {
    const device = DEVICES.find((d) => d.id === deviceId)
    if (device) {
      setSelectedDevice(device)
      setIsDetailsModalOpen(true)
    }
  }

  return (
    <div style={{ backgroundColor: '#0B1020', color: '#E5E7EB' }} className="min-h-screen">
      <DashboardHeader />
      <DashboardSidebar />

      {/* Main Content */}
      <main className="md:ml-64 pt-12 p-8 pb-20" style={{ backgroundColor: '#0B1020' }}>
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-tight mb-2" style={{ color: '#E5E7EB' }}>
              Device List
            </h1>
            <p className="text-sm" style={{ color: '#94A3B8' }}>
              4 edge nodes active across sector perimeter
            </p>
          </div>
          <button
            onClick={handleRegisterDevice}
            className="px-4 py-2 rounded font-bold text-xs uppercase tracking-wider transition-all hover:opacity-90"
            style={{ backgroundColor: '#3B82F6', color: '#FFF' }}
          >
            Register Device
          </button>
        </div>

        {/* Device Table */}
        <DeviceTable devices={DEVICES} onDetails={handleDeviceDetails} />

        {/* System Metrics */}
        <SystemMetricsSection metrics={SYSTEM_METRICS} />

        {/* Footer Info */}
        <div className="mt-12 pt-8 border-t flex justify-between items-center" style={{ borderColor: '#24324A' }}>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22C55E' }} />
              <span className="text-xs font-mono uppercase" style={{ color: '#94A3B8' }}>
                System Core: Stable
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#3B82F6' }} />
              <span className="text-xs font-mono uppercase" style={{ color: '#94A3B8' }}>
                AI Engine: Operational
              </span>
            </div>
          </div>
          <span className="text-xs font-mono" style={{ color: '#6B7280' }}>
            SENTINAL_OS_v4.2.1_BUILD_FINAL
          </span>
        </div>
      </main>

      {/* Device Details Modal */}
      <DeviceDetailsModal
        isOpen={isDetailsModalOpen}
        device={selectedDevice}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      {/* Register Device Modal */}
      <RegisterDeviceModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={(data) => {
          console.log('Device registered:', data)
        }}
      />
    </div>
  )
}
