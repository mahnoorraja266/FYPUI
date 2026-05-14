'use client'

import { Search, Plus } from 'lucide-react'

interface EnrollmentHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onAddPerson: () => void
}

export default function EnrollmentHeader({ searchQuery, onSearchChange, onAddPerson }: EnrollmentHeaderProps) {
  return (
    <div className="mb-8 p-6 border rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}>
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#E5E7EB' }}>
          Person Enrollment
        </h1>
        <p className="text-sm" style={{ color: '#94A3B8' }}>
          Manage and register security-cleared personnel
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80 group">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors" style={{ color: '#6B7280' }} />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-opacity-50 border rounded px-10 py-2.5 text-sm focus:outline-none transition-all"
            style={{
              backgroundColor: 'rgba(26, 37, 59, 0.5)',
              borderColor: '#24324A',
              color: '#E5E7EB',
            }}
          />
        </div>

        {/* Add Person Button */}
        <button
          onClick={onAddPerson}
          className="w-full sm:w-auto flex items-center justify-center gap-2 font-bold uppercase text-sm px-6 py-2.5 rounded transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#3B82F6', color: '#FFF' }}
        >
          <Plus size={16} />
          Add Person
        </button>
      </div>
    </div>
  )
}
