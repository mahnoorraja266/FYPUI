'use client'

import Image from 'next/image'
import { Edit2, History, Trash2 } from 'lucide-react'
import type { EnrolledPerson } from '@/lib/data/enrollments'

interface PersonCardProps {
  person: EnrolledPerson
  onEdit: (id: string) => void
  onViewHistory: (id: string) => void
  onDelete: (id: string) => void
}

export default function PersonCard({ person, onEdit, onViewHistory, onDelete }: PersonCardProps) {
  return (
    <div
      className="rounded-sm overflow-hidden group border transition-all duration-300 hover:border-opacity-100 flex flex-col"
      style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/5', backgroundColor: '#0B1020' }}>
        <Image
          src={person.image}
          alt={person.name}
          fill
          className="object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40" />
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Name and Age */}
        <div className="mb-5">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors" style={{ color: '#E5E7EB' }}>
            {person.name}
          </h3>
          <div className="flex items-center gap-2" style={{ color: '#94A3B8' }}>
            <History size={14} />
            <span className="text-sm font-mono" style={{ color: '#14B8A6' }}>
              AGE: {person.age}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onEdit(person.id)}
            className="flex-1 py-2.5 border rounded transition-all hover:border-opacity-100 flex items-center justify-center group/btn"
            style={{
              borderColor: '#24324A',
              backgroundColor: 'rgba(26, 37, 59, 0.6)',
              color: '#94A3B8',
            }}
            title="Edit"
          >
            <Edit2 size={18} className="group-hover/btn:text-blue-400 transition-colors" />
          </button>
          <button
            onClick={() => onViewHistory(person.id)}
            className="flex-1 py-2.5 border rounded transition-all hover:border-opacity-100 flex items-center justify-center group/btn"
            style={{
              borderColor: '#24324A',
              backgroundColor: 'rgba(26, 37, 59, 0.6)',
              color: '#94A3B8',
            }}
            title="View History"
          >
            <History size={18} className="group-hover/btn:text-blue-400 transition-colors" />
          </button>
          <button
            onClick={() => onDelete(person.id)}
            className="flex-1 py-2.5 border rounded transition-all hover:border-opacity-100 flex items-center justify-center group/btn"
            style={{
              borderColor: '#24324A',
              backgroundColor: 'rgba(26, 37, 59, 0.6)',
              color: '#94A3B8',
            }}
            title="Delete"
          >
            <Trash2 size={18} className="group-hover/btn:text-red-400 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  )
}
