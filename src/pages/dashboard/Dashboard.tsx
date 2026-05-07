'use client'

import DashboardHeader from '@/components/dashboard/Header'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import StatCard from '@/components/dashboard/StatCard'
import RecentAlerts from '@/components/dashboard/RecentAlerts'
import SystemStatus from '@/components/dashboard/SystemStatus'
import { useRouter } from 'next/navigation'
import { User, Users, AlertTriangle } from 'lucide-react'

export default function Dashboard() {
  const router = useRouter()

  return (
    <div style={{ backgroundColor: '#0B1020', color: '#E5E7EB' }} className="min-h-screen">
      <DashboardHeader />
      <DashboardSidebar />

      {/* Main Content */}
      <main className="md:ml-64 pt-12 p-6" style={{ backgroundColor: '#0B1020' }}>
        {/* Top Row: 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Cameras */}
          <StatCard
            title="Cameras"
            value="5"
            subtitle="TOTAL"
            alerts={{ online: 4, offline: 1 }}
          />

          {/* Person Recognition */}
          <StatCard title="Person Recognition" value="1" subtitle="ACTIVE ALERT" icon={User} status="danger">
            <div
              className="mt-4 p-2 border text-xs"
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#EF4444', color: '#EF4444' }}
            >
              CRITICAL: UNKNOWN IN RESTRICTED AREA
            </div>
          </StatCard>

          {/* Weapon Detection */}
          <StatCard
            title="Weapon Detection"
            value="1"
            subtitle="THREAT DETECTED"
            icon={AlertTriangle}
            status="warning"
          >
            <div
              className="mt-4 p-2 border text-xs"
              style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: '#F59E0B', color: '#F59E0B' }}
            >
              VERIFY: HOLSTERED FIREARM AT GATE 1
            </div>
          </StatCard>

          {/* Enrolled Database */}
          <StatCard title="Enrolled Database" value="12" subtitle="PERSONS" icon={Users}>
            <div className="mt-4 flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border bg-slate-700 flex items-center justify-center text-xs"
                  style={{ borderColor: '#121A2B' }}
                >
                  <User size={12} />
                </div>
              ))}
              <div
                className="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold"
                style={{ borderColor: '#121A2B', backgroundColor: '#1A253B', color: '#94A3B8' }}
              >
                +9
              </div>
            </div>
          </StatCard>
        </div>

        {/* Recent Alerts */}
        <RecentAlerts />

        {/* System Status & Uptime */}
        <SystemStatus />
      </main>
    </div>
  )
}
