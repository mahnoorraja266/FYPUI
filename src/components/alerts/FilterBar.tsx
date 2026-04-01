'use client'

import { Search, RefreshCw } from 'lucide-react'
import { useState } from 'react'

interface FilterBarProps {
  onRefresh: () => void
}

export default function FilterBar({ onRefresh }: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('active')
  const [deviceFilter, setDeviceFilter] = useState('all')

  return (
    <div className="space-y-4 mb-6">
      {/* Filter Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {/* Type Filter */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold mb-2 block" style={{ color: '#94A3B8' }}>
            Type
          </label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 rounded border text-sm"
            style={{ backgroundColor: '#1A253B', borderColor: '#24324A', color: '#E5E7EB' }}
          >
            <option value="all">All Types</option>
            <option value="person">Person</option>
            <option value="weapon">Weapon</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold mb-2 block" style={{ color: '#94A3B8' }}>
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded border text-sm"
            style={{ backgroundColor: '#1A253B', borderColor: '#24324A', color: '#E5E7EB' }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="reviewed">Reviewed</option>
            <option value="ignored">Ignored</option>
          </select>
        </div>

        {/* Device Filter */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold mb-2 block" style={{ color: '#94A3B8' }}>
            Device
          </label>
          <select
            value={deviceFilter}
            onChange={(e) => setDeviceFilter(e.target.value)}
            className="w-full px-3 py-2 rounded border text-sm"
            style={{ backgroundColor: '#1A253B', borderColor: '#24324A', color: '#E5E7EB' }}
          >
            <option value="all">All Devices</option>
            <option value="cam-nw">CAM-NW</option>
            <option value="cam-lobby">CAM-LOBBY</option>
            <option value="cam-gate">CAM-GATE</option>
          </select>
        </div>

        {/* Date Range */}
        <div className="md:col-span-2 flex gap-2">
          <div className="flex-1">
            <label className="text-xs uppercase tracking-widest font-bold mb-2 block" style={{ color: '#94A3B8' }}>
              From
            </label>
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className="w-full px-3 py-2 rounded border text-sm"
              style={{ backgroundColor: '#1A253B', borderColor: '#24324A', color: '#E5E7EB' }}
            />
          </div>
          <div className="flex-1">
            <label className="text-xs uppercase tracking-widest font-bold mb-2 block" style={{ color: '#94A3B8' }}>
              To
            </label>
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className="w-full px-3 py-2 rounded border text-sm"
              style={{ backgroundColor: '#1A253B', borderColor: '#24324A', color: '#E5E7EB' }}
            />
          </div>
        </div>
      </div>

      {/* Search and Refresh Row */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-3" style={{ color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search by ID, Label or Device..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded border text-sm"
            style={{ backgroundColor: '#1A253B', borderColor: '#24324A', color: '#E5E7EB' }}
          />
        </div>
        <button
          onClick={onRefresh}
          className="px-4 py-2 rounded font-bold uppercase text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#3B82F6', color: '#FFF' }}
        >
          <RefreshCw size={16} />
          Refresh Data
        </button>
      </div>
    </div>
  )
}
