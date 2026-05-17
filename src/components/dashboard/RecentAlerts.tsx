import { useState } from 'react'
import { Clock, User, Zap, CheckCircle } from 'lucide-react'

interface Alert {
  id: string
  status: 'new' | 'seen'
  type: string
  iconType: 'user' | 'zap'
  location: string
  timestamp: string
  action: 'REVIEW' | 'LOGS'
  statusColor: string
}

const INITIAL_ALERTS: Alert[] = [
  {
    id: '1',
    status: 'new',
    type: 'Person Recognition',
    iconType: 'user',
    location: 'Gate 2 - Restricted Area',
    timestamp: '14:28:42',
    action: 'REVIEW',
    statusColor: '#EF4444',
  },
  {
    id: '2',
    status: 'new',
    type: 'Weapon Detection',
    iconType: 'zap',
    location: 'Gate 2 - Perimeter',
    timestamp: '14:27:15',
    action: 'REVIEW',
    statusColor: '#F59E0B',
  },
  {
    id: '3',
    status: 'seen',
    type: 'Person Recognition',
    iconType: 'user',
    location: 'Main Lobby',
    timestamp: '14:12:05',
    action: 'LOGS',
    statusColor: '#22C55E',
  },
  {
    id: '4',
    status: 'seen',
    type: 'Weapon Detection',
    iconType: 'zap',
    location: 'Gate 1 - Entrance',
    timestamp: '13:58:22',
    action: 'LOGS',
    statusColor: '#22C55E',
  },
]

export default function RecentAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS)

  const handleMarkAsSeen = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          return {
            ...a,
            status: 'seen',
            action: 'LOGS',
          }
        }
        return a
      })
    )
  }

  const getIcon = (iconType: 'user' | 'zap') => {
    if (iconType === 'user') return <User size={16} />
    return <Zap size={16} />
  }

  const newAlerts = alerts.filter((a) => a.status === 'new')
  const seenAlerts = alerts.filter((a) => a.status === 'seen')

  return (
    <div className="border mb-4" style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}>
      {/* Header */}
      <div
        className="p-4 border-b flex justify-between items-center"
        style={{ borderColor: '#24324A' }}
      >
        <div className="flex items-center gap-3">
          <Clock size={20} />
          <h2 className="text-xl font-bold" style={{ color: '#E5E7EB', fontFamily: 'Inter' }}>
            RECENT ALERTS
          </h2>
        </div>
        <a href="#" className="text-xs font-bold uppercase hover:underline" style={{ color: '#3B82F6', fontFamily: 'Inter' }}>
          View All Alerts
        </a>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr style={{ backgroundColor: 'rgba(26, 37, 59, 0.3)' }}>
              <th
                className="p-4 text-xs font-bold uppercase tracking-widest border-b"
                style={{ color: '#94A3B8', borderColor: '#24324A', fontFamily: 'Inter' }}
              >
                Status
              </th>
              <th
                className="p-4 text-xs font-bold uppercase tracking-widest border-b"
                style={{ color: '#94A3B8', borderColor: '#24324A', fontFamily: 'Inter' }}
              >
                Type
              </th>
              <th
                className="p-4 text-xs font-bold uppercase tracking-widest border-b"
                style={{ color: '#94A3B8', borderColor: '#24324A', fontFamily: 'Inter' }}
              >
                Location
              </th>
              <th
                className="p-4 text-xs font-bold uppercase tracking-widest border-b"
                style={{ color: '#94A3B8', borderColor: '#24324A', fontFamily: 'Inter' }}
              >
                Timestamp
              </th>
              <th
                className="p-4 text-xs font-bold uppercase tracking-widest border-b text-right"
                style={{ color: '#94A3B8', borderColor: '#24324A', fontFamily: 'Inter' }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: '#24324A' }}>
            {/* NEW SECTION ROWS */}
            {newAlerts.map((alert) => (
              <tr
                key={alert.id}
                onClick={() => handleMarkAsSeen(alert.id)}
                className="hover:bg-blue-500/5 transition-all duration-200 cursor-pointer"
                title="Click to mark as seen"
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: alert.statusColor }}
                    />
                    <span className="text-xs font-bold uppercase" style={{ color: alert.statusColor, fontFamily: 'Inter' }}>
                      NEW
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div style={{ color: '#E5E7EB' }}>
                      {getIcon(alert.iconType)}
                    </div>
                    <span className="text-sm font-semibold" style={{ color: '#E5E7EB', fontFamily: 'Inter' }}>
                      {alert.type}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-sm" style={{ color: '#94A3B8', fontFamily: 'Inter' }}>
                  {alert.location}
                </td>
                <td className="p-4 text-sm font-data-mono" style={{ color: '#94A3B8' }}>
                  {alert.timestamp}
                </td>
                <td className="p-4 text-right">
                  <span
                    className="px-3 py-1 text-xs font-bold uppercase rounded"
                    style={{
                      backgroundColor: '#3B82F6',
                      color: 'white',
                      fontFamily: 'Inter',
                    }}
                  >
                    REVIEW
                  </span>
                </td>
              </tr>
            ))}

            {/* SEPARATOR ROW */}
            {newAlerts.length > 0 && seenAlerts.length > 0 && (
              <tr className="bg-slate-900/10 pointer-events-none select-none">
                <td colSpan={5} className="p-0">
                  <div className="flex items-center gap-3 px-4 py-2.5" style={{ backgroundColor: 'rgba(26, 37, 59, 0.4)' }}>
                    <div className="h-[1px] flex-1" style={{ backgroundColor: '#24324A' }} />
                    <span className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase" style={{ fontFamily: 'Inter' }}>
                      Seen History
                    </span>
                    <div className="h-[1px] flex-1" style={{ backgroundColor: '#24324A' }} />
                  </div>
                </td>
              </tr>
            )}

            {/* SEEN SECTION ROWS */}
            {seenAlerts.map((alert) => (
              <tr
                key={alert.id}
                className="transition-colors duration-200"
                style={{ opacity: 0.65 }}
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} style={{ color: '#22C55E' }} />
                    <span className="text-xs font-bold uppercase" style={{ color: '#94A3B8', fontFamily: 'Inter' }}>
                      SEEN
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div style={{ color: '#E5E7EB' }}>
                      {getIcon(alert.iconType)}
                    </div>
                    <span className="text-sm" style={{ color: '#E5E7EB', fontFamily: 'Inter' }}>
                      {alert.type}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-sm" style={{ color: '#94A3B8', fontFamily: 'Inter' }}>
                  {alert.location}
                </td>
                <td className="p-4 text-sm font-data-mono" style={{ color: '#94A3B8' }}>
                  {alert.timestamp}
                </td>
                <td className="p-4 text-right">
                  <span
                    className="px-3 py-1 text-xs font-bold uppercase border rounded"
                    style={{
                      borderColor: '#24324A',
                      color: '#94A3B8',
                      borderWidth: '1px',
                      fontFamily: 'Inter',
                    }}
                  >
                    LOGS
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
