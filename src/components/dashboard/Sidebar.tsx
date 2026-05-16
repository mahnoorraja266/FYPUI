'use client'

import { useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutGrid,
  Map,
  Bell,
  Users,
  Smartphone,
  RotateCw,
  Monitor,
  Settings,
  User,
} from 'lucide-react'
import DashboardSettingsModal from '@/components/settings/DashboardSettingsModal'

export default function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const menuItems = [
    { icon: LayoutGrid, label: 'Dashboard', path: '/dashboard' },
    { icon: Map, label: 'Map', path: '/map' },
    { icon: Bell, label: 'Alerts', path: '/alerts' },
    { icon: Users, label: 'Enrollment', path: '/enrollment' },
    { icon: Smartphone, label: 'Devices', path: '/devices' },
    { icon: RotateCw, label: 'Sync Status', path: '/sync-status' },
    { icon: Monitor, label: 'Live Feed', path: '/live-feeds' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ]

  return (
    <>
      <aside className="fixed left-0 top-12 w-64 h-[calc(100vh-48px)] border-r hidden md:flex flex-col py-4 gap-1" style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}>
        {/* Logo Section */}
        <div className="px-6 py-4 mb-4 flex justify-center">
          <div className="w-40 h-auto">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sentinal%20Logo-SPIbiNK7T91sW4L6Qu7ybo4rOB2TQ3.png"
              alt="Sentinel Logo"
              width={160}
              height={160}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path
            return (
              <button
                key={item.label}
                onClick={() => router.push(item.path)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded transition-all duration-200 cursor-pointer text-left"
                style={{
                  backgroundColor: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  color: isActive ? '#3B82F6' : '#94A3B8',
                  borderRight: isActive ? '4px solid #3B82F6' : 'none',
                }}
              >
                <Icon size={20} />
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="mt-auto px-6 py-4 flex items-center gap-3 border-t" style={{ borderColor: '#24324A' }}>
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border" style={{ borderColor: '#24324A' }}>
            <User size={16} />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider" style={{ color: '#E5E7EB' }}>
              M. Chen
            </div>
            <div className="text-xs uppercase tracking-tighter" style={{ color: '#94A3B8' }}>
              Level 4 Access
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
