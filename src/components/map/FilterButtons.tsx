'use client'

import { ZoomIn, ZoomOut } from 'lucide-react'

type FilterType = 'all' | 'online' | 'offline' | 'alerting'

interface MapFilterButtonsProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export default function MapFilterButtons({ activeFilter, onFilterChange }: MapFilterButtonsProps) {
  const filters: Array<{ type: FilterType; label: string }> = [
    { type: 'all', label: 'All' },
    { type: 'online', label: 'Online' },
    { type: 'offline', label: 'Offline' },
    { type: 'alerting', label: 'Alerting' },
  ]

  return (
    <div className="absolute top-6 left-64 flex items-center gap-3 z-20">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.type
        const isAlerting = filter.type === 'alerting'

        return (
          <button
            key={filter.type}
            onClick={() => onFilterChange(filter.type)}
            className="px-4 py-2 rounded font-bold uppercase text-sm transition-all hover:opacity-90 flex items-center gap-2"
            style={{
              backgroundColor: isActive ? '#3B82F6' : 'transparent',
              color: isAlerting && isActive ? '#FFF' : isAlerting ? '#EF4444' : isActive ? '#FFF' : '#94A3B8',
              border: isActive ? 'none' : isAlerting ? '2px solid #EF4444' : '1px solid #24324A',
            }}
          >
            {isAlerting && <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: isAlerting ? '#EF4444' : '#3B82F6' }} />}
            {filter.label}
          </button>
        )
      })}

      {/* Right side controls */}
      <div className="ml-auto flex items-center gap-3 pr-4">
        <button
          className="p-1.5 rounded hover:bg-opacity-80 transition-colors"
          style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}
        >
          <ZoomIn size={18} />
        </button>
        <button
          className="p-1.5 rounded hover:bg-opacity-80 transition-colors"
          style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}
        >
          <ZoomOut size={18} />
        </button>
      </div>
    </div>
  )
}
