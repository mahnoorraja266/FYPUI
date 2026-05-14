import React from 'react'
import { usePathname } from 'next/navigation'
import LoginPage from './pages/auth/LoginPage'
import USBVerificationPage from './pages/auth/USBVerification'
import Dashboard from './pages/dashboard/Dashboard'
import MapPage from './pages/map/Map'
import AlertsPage from './pages/alerts/Alerts'
import EnrollmentPage from './pages/enroll/Enrollment'
import DevicesPage from './pages/devices/Devices'
import SyncStatusPage from './pages/sync-status/SyncStatus'
import LiveFeedsPage from './pages/live-feed/live-feed'

export default function App() {
  const pathname = usePathname()

  switch (pathname) {
    case '/':
    case '/auth/login':
      return <LoginPage />
    case '/usb-verification':
      return <USBVerificationPage />
    case '/dashboard':
      return <Dashboard />
    case '/map':
      return <MapPage />
    case '/alerts':
      return <AlertsPage />
    case '/enrollment':
      return <EnrollmentPage />
    case '/devices':
      return <DevicesPage />
    case '/sync-status':
      return <SyncStatusPage />
    case '/live-feeds':
      return <LiveFeedsPage />
    default:
      return <LoginPage />
  }
}
