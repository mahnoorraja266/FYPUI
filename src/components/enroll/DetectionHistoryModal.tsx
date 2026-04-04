'use client'

import { X, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { getDetectionHistory, type DetectionRecord } from '@/lib/data/detectionHistory'

interface DetectionHistoryModalProps {
  isOpen: boolean
  personName: string | null
  personId: string | null
  onClose: () => void
}

export default function DetectionHistoryModal({
  isOpen,
  personName,
  personId,
  onClose,
}: DetectionHistoryModalProps) {
  const [displayCount, setDisplayCount] = useState(5)
  const history = personId ? getDetectionHistory(personId) : []
  const displayedHistory = history.slice(0, displayCount)

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 5)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Blurred background overlay */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-4xl rounded-lg border"
          style={{
            backgroundColor: '#121A2B',
            borderColor: '#24324A',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-6 border-b"
            style={{ borderColor: '#24324A' }}
          >
            <div className="flex items-center gap-3">
              <X size={24} style={{ color: '#3B82F6' }} />
              <h2 className="text-xl font-bold" style={{ color: '#E5E7EB' }}>
                Detection History: {personName}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-opacity-80 transition-colors"
              style={{ color: '#94A3B8' }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: 'rgba(26, 37, 59, 0.3)' }}>
                  <th
                    className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest border-b"
                    style={{ color: '#94A3B8', borderColor: '#24324A' }}
                  >
                    Frame
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest border-b"
                    style={{ color: '#94A3B8', borderColor: '#24324A' }}
                  >
                    Source Device
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest border-b"
                    style={{ color: '#94A3B8', borderColor: '#24324A' }}
                  >
                    Confidence
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest border-b"
                    style={{ color: '#94A3B8', borderColor: '#24324A' }}
                  >
                    Timestamp (UTC)
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest border-b"
                    style={{ color: '#94A3B8', borderColor: '#24324A' }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedHistory.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b hover:bg-opacity-50 transition-colors"
                    style={{ borderColor: '#24324A', backgroundColor: 'rgba(26, 37, 59, 0.2)' }}
                  >
                    {/* Frame */}
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded overflow-hidden border" style={{ borderColor: '#24324A' }}>
                        <img
                          src={record.thumbnail}
                          alt="Detection frame"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Source Device */}
                    <td className="px-6 py-4">
                      <span style={{ color: '#E5E7EB' }}>{record.sourceDevice}</span>
                    </td>

                    {/* Confidence */}
                    <td className="px-6 py-4">
                      <span style={{ color: '#3B82F6', fontFamily: 'monospace' }}>
                        {(record.confidence * 100).toFixed(2)}%
                      </span>
                    </td>

                    {/* Timestamp */}
                    <td className="px-6 py-4">
                      <span style={{ color: '#94A3B8', fontFamily: 'monospace', fontSize: '12px' }}>
                        {record.timestamp}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className="px-3 py-1 rounded text-xs font-bold uppercase border"
                        style={{
                          backgroundColor: record.status === 'reviewed' ? 'transparent' : 'transparent',
                          borderColor: record.status === 'reviewed' ? '#22C55E' : '#F59E0B',
                          color: record.status === 'reviewed' ? '#22C55E' : '#F59E0B',
                        }}
                      >
                        {record.status === 'reviewed' ? 'REVIEWED' : 'PENDING'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Load More Button */}
          {displayCount < history.length && (
            <div className="flex justify-center p-6">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 rounded font-bold uppercase text-sm transition-opacity hover:opacity-80 flex items-center gap-2"
                style={{ backgroundColor: '#3B82F6', color: '#FFF' }}
              >
                Load More Logs
                <ChevronDown size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
