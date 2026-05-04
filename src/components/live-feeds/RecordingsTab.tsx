'use client'

import { useState } from 'react'
import { Calendar, Filter, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { RECORDINGS, DEVICES } from '@/lib/data/recordings'
import VideoPlayerModal from './VideoPlayerModal'

export default function RecordingsTab() {
  const [selectedDevice, setSelectedDevice] = useState('gate-1')
  const [selectedDate, setSelectedDate] = useState('2026-04-05')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRecording, setSelectedRecording] = useState<any>(null)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)

  const selectedDeviceName = DEVICES.find((d) => d.id === selectedDevice)?.name || 'Gate 1 Camera'
  const filteredRecordings = RECORDINGS.filter((r) => r.deviceId === selectedDevice)

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-4 mb-8">
        {/* Device Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
            Device Selector
          </label>
          <select
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            className="px-4 py-2 rounded text-sm font-semibold outline-none transition-all"
            style={{
              backgroundColor: '#1A253B',
              borderColor: '#24324A',
              color: '#E5E7EB',
              border: '1px solid #24324A',
              minWidth: '200px',
            }}
          >
            {DEVICES.map((device) => (
              <option key={device.id} value={device.id}>
                {device.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
            Operational Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 rounded text-sm font-semibold outline-none transition-all"
              style={{
                backgroundColor: '#1A253B',
                borderColor: '#24324A',
                color: '#E5E7EB',
                border: '1px solid #24324A',
                minWidth: '180px',
              }}
            />
            <Calendar
              size={18}
              className="absolute right-3 top-2.5 pointer-events-none"
              style={{ color: '#94A3B8' }}
            />
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="flex flex-col gap-2 justify-end">
          <button
            className="px-4 py-2 rounded text-xs font-bold uppercase tracking-widest border transition-all hover:opacity-80 flex items-center gap-2"
            style={{
              borderColor: '#38BDF8',
              backgroundColor: 'transparent',
              color: '#38BDF8',
              border: '1px solid #38BDF8',
            }}
          >
            <Filter size={16} />
            Advanced Filters
          </button>
        </div>
      </div>

      {/* Recordings Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: '#E5E7EB' }}>
            Recordings — {selectedDeviceName} — {selectedDate}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22C55E' }} />
          <span className="text-xs font-semibold uppercase" style={{ color: '#38BDF8' }}>
            System Ready
          </span>
        </div>
      </div>

      {/* Recordings Table */}
      <div className="border rounded overflow-hidden" style={{ borderColor: '#24324A' }}>
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: '#0B1020', borderBottom: '1px solid #24324A' }}>
              <th className="p-4 text-left text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                Start Time
              </th>
              <th className="p-4 text-left text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                End Time
              </th>
              <th className="p-4 text-left text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                Duration
              </th>
              <th className="p-4 text-left text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                Size
              </th>
              <th className="p-4 text-right text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRecordings.map((recording) => (
              <tr
                key={recording.id}
                style={{ borderBottom: '1px solid #24324A' }}
              >
                <td className="p-4 font-mono text-sm" style={{ color: '#E5E7EB' }}>
                  {recording.startTime}
                </td>
                <td className="p-4 font-mono text-sm" style={{ color: recording.status === 'recording' ? '#6B7280' : '#E5E7EB' }}>
                  {recording.endTime || '--:--:--'}
                </td>
                <td className="p-4 font-mono text-sm" style={{ color: recording.status === 'recording' ? '#F59E0B' : '#E5E7EB' }}>
                  {recording.duration}
                </td>
                <td className="p-4 font-mono text-sm" style={{ color: recording.status === 'recording' ? '#6B7280' : '#E5E7EB' }}>
                  {recording.size}
                </td>
                <td className="p-4 text-right">
                  {recording.status === 'completed' ? (
                    <button
                      onClick={() => {
                        setSelectedRecording({
                          id: recording.id,
                          deviceName: selectedDeviceName,
                          location: 'NORTH PERIMETER - SECTOR 7',
                          timeRange: `${recording.startTime} - ${recording.endTime}`,
                          duration: recording.duration,
                        })
                        setIsPlayerOpen(true)
                      }}
                      className="px-3 py-1.5 rounded text-xs font-bold uppercase border transition-all hover:opacity-80 inline-flex items-center gap-1"
                      style={{
                        borderColor: '#38BDF8',
                        backgroundColor: 'transparent',
                        color: '#38BDF8',
                        border: '1px solid #38BDF8',
                      }}
                    >
                      <Play size={14} />
                      Play
                    </button>
                  ) : (
                    <span className="text-xs uppercase" style={{ color: '#6B7280' }}>
                      Recording...
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-8 flex justify-between items-center" style={{ borderTop: '1px solid #24324A', paddingTop: '24px' }}>
        <div className="flex gap-6">
          <div className="text-xs uppercase tracking-widest" style={{ color: '#94A3B8' }}>
            Retention: <span style={{ color: '#E5E7EB' }}>7 days</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22C55E' }} />
            <span className="text-xs uppercase tracking-widest" style={{ color: '#94A3B8' }}>
              Recording: <span style={{ color: '#22C55E' }}>ON</span>
            </span>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-4">
          <button className="p-1 hover:opacity-80 transition-opacity" style={{ color: '#94A3B8' }}>
            <ChevronLeft size={20} />
          </button>
          <span className="text-xs font-semibold uppercase" style={{ color: '#E5E7EB' }}>
            Page {currentPage} / 04
          </span>
          <button className="p-1 hover:opacity-80 transition-opacity" style={{ color: '#94A3B8' }}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Video Player Modal */}
      <VideoPlayerModal
        isOpen={isPlayerOpen}
        recording={selectedRecording}
        onClose={() => setIsPlayerOpen(false)}
      />
    </div>
  )
}
