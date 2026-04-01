'use client'

import { useState } from 'react'
import DashboardHeader from '@/components/dashboard/Header'
import DashboardSidebar from '@/components/dashboard/Sidebar'
import FilterBar from '@/components/alerts/FilterBar'
import ActiveAlerts from '@/components/alerts/ActiveAlerts'
import AlertHistory from '@/components/alerts/AlertHistory'
import AlertSystemStatus from '@/components/alerts/AlertSystemStatus'
import { ACTIVE_ALERTS, ALERT_HISTORY } from '@/lib/data/alerts'

export default function AlertsPage() {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  return (
    <div style={{ backgroundColor: '#0B1020', color: '#E5E7EB' }} className="min-h-screen">
      <DashboardHeader />
      <DashboardSidebar />

      {/* Main content */}
      <main className="md:ml-64 pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl font-bold uppercase tracking-wide mb-8" style={{ color: '#E5E7EB' }}>
            Alerts
          </h1>

          {/* Filter Bar */}
          <FilterBar onRefresh={handleRefresh} />

          {/* Active Alerts */}
          <ActiveAlerts alerts={ACTIVE_ALERTS} />

          {/* Alert History */}
          <AlertHistory alerts={ALERT_HISTORY} />
        </div>
      </main>

      {/* System Status Panel */}
      <AlertSystemStatus />
    </div>
  )
}
