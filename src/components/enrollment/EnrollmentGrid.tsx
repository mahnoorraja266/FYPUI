'use client'

import PersonCard from './PersonCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { EnrolledPerson } from '@/lib/data/enrollments'

interface EnrollmentGridProps {
  persons: EnrolledPerson[]
  currentPage: number
  itemsPerPage: number
  onPrevious: () => void
  onNext: () => void
  onEdit: (id: string) => void
  onViewHistory: (id: string) => void
  onDelete: (id: string) => void
}

export default function EnrollmentGrid({
  persons,
  currentPage,
  itemsPerPage,
  onPrevious,
  onNext,
  onEdit,
  onViewHistory,
  onDelete,
}: EnrollmentGridProps) {
  const totalPages = Math.ceil(persons.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedPersons = persons.slice(startIndex, endIndex)

  return (
    <div>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {displayedPersons.map((person) => (
          <PersonCard
            key={person.id}
            person={person}
            onEdit={onEdit}
            onViewHistory={onViewHistory}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-6 border rounded-sm" style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}>
        <div className="text-sm font-mono" style={{ color: '#94A3B8' }}>
          DISPLAYING {startIndex + 1}-{Math.min(endIndex, persons.length)} OF {persons.length} TOTAL ENROLLMENTS
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onPrevious}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-2 border rounded text-sm font-bold uppercase transition-all disabled:opacity-50"
            style={{
              borderColor: '#24324A',
              color: '#3B82F6',
              backgroundColor: 'rgba(26, 37, 59, 0.6)',
            }}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <span className="text-xs font-mono" style={{ color: '#94A3B8' }}>
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={onNext}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-2 border rounded text-sm font-bold uppercase transition-all disabled:opacity-50"
            style={{
              borderColor: '#24324A',
              color: '#3B82F6',
              backgroundColor: 'rgba(26, 37, 59, 0.6)',
            }}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
