'use client'

import { AlertTriangle, UserMinus, X } from 'lucide-react'
import type { EnrolledPerson } from '@/lib/data/enrollments'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  person: EnrolledPerson | null
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export default function DeleteConfirmationModal({
  isOpen,
  person,
  onConfirm,
  onCancel,
  isLoading = false,
}: DeleteConfirmationModalProps) {
  if (!isOpen || !person) return null

  return (
    <>
      {/* Blurred Background Overlay */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-sm transition-opacity"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        onClick={onCancel}
      />

      {/* Modal Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-md rounded-lg overflow-hidden shadow-2xl flex flex-col border"
          style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}
        >
          {/* Header */}
          <div
            className="p-6 border-b flex items-start justify-between"
            style={{ backgroundColor: '#0B1020', borderColor: '#24324A' }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#EF4444' }}>
                <UserMinus size={24} style={{ color: '#EF4444' }} />
              </div>
              <h2 className="text-xl font-bold" style={{ color: '#E5E7EB' }}>
                Delete Person Confirmation
              </h2>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-white transition-colors"
              disabled={isLoading}
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <p style={{ color: '#94A3B8' }} className="text-sm leading-relaxed">
              Are you sure? This will remove{' '}
              <span style={{ color: '#E5E7EB' }} className="font-semibold">
                {person.name}
              </span>{' '}
              and all their embeddings. Historical alerts will retain the person&apos;s name.
            </p>

            {/* Warning Box */}
            <div
              className="p-4 rounded border flex items-start gap-3"
              style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: '#F59E0B' }}
            >
              <AlertTriangle size={20} style={{ color: '#F59E0B', flexShrink: 0 }} className="mt-0.5" />
              <span className="text-xs font-bold uppercase" style={{ color: '#F59E0B', lineHeight: '1.4' }}>
                SYSTEM WARNING: This action cannot be undone. Facial biometric data will be permanently purged from
                Sentinel-X database.
              </span>
            </div>
          </div>

          {/* Actions */}
          <div
            className="p-6 border-t flex items-center justify-end gap-3"
            style={{ backgroundColor: '#0B1020', borderColor: '#24324A' }}
          >
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="px-6 py-2 rounded font-semibold uppercase text-sm border transition-all hover:opacity-80 disabled:opacity-50"
              style={{
                backgroundColor: '#1A253B',
                borderColor: '#24324A',
                color: '#E5E7EB',
              }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="px-6 py-2 rounded font-semibold uppercase text-sm transition-all hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
              style={{
                backgroundColor: '#EF4444',
                color: '#FFF',
              }}
            >
              {isLoading ? 'Deleting...' : 'Confirm Delete'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
