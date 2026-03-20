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

const ALERTS: Alert[] = [
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
  const getIcon = (iconType: 'user' | 'zap') => {
    if (iconType === 'user') return <User size={16} />
    return <Zap size={16} />
  }

  return (
    <div className="border mb-4" style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}>
      {/* Header */}
      <div
        className="p-4 border-b flex justify-between items-center"
        style={{ borderColor: '#24324A' }}
      >
        <div className="flex items-center gap-3">
          <Clock size={20} />
          <h2 className="text-xl font-bold" style={{ color: '#E5E7EB' }}>
            RECENT ALERTS
          </h2>
        </div>
        <a href="#" className="text-xs font-bold uppercase hover:underline" style={{ color: '#3B82F6' }}>
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
                style={{ color: '#94A3B8', borderColor: '#24324A' }}
              >
                Status
              </th>
              <th
                className="p-4 text-xs font-bold uppercase tracking-widest border-b"
                style={{ color: '#94A3B8', borderColor: '#24324A' }}
              >
                Type
              </th>
              <th
                className="p-4 text-xs font-bold uppercase tracking-widest border-b"
                style={{ color: '#94A3B8', borderColor: '#24324A' }}
              >
                Location
              </th>
              <th
                className="p-4 text-xs font-bold uppercase tracking-widest border-b"
                style={{ color: '#94A3B8', borderColor: '#24324A' }}
              >
                Timestamp
              </th>
              <th
                className="p-4 text-xs font-bold uppercase tracking-widest border-b text-right"
                style={{ color: '#94A3B8', borderColor: '#24324A' }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: '#24324A' }}>
            {ALERTS.map((alert) => (
              <tr
                key={alert.id}
                className="hover:bg-opacity-30 transition-colors"
                style={{ opacity: alert.status === 'seen' ? 0.7 : 1 }}
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {alert.status === 'new' ? (
                      <>
                        <span
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: alert.statusColor }}
                        />
                        <span className="text-xs font-bold uppercase" style={{ color: alert.statusColor }}>
                          NEW
                        </span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} style={{ color: '#22C55E' }} />
                        <span className="text-xs font-bold uppercase" style={{ color: '#94A3B8' }}>
                          SEEN
                        </span>
                      </>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div style={{ color: '#E5E7EB' }}>
                      {getIcon(alert.iconType)}
                    </div>
                    <span className="text-sm" style={{ color: '#E5E7EB' }}>
                      {alert.type}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-sm" style={{ color: '#94A3B8' }}>
                  {alert.location}
                </td>
                <td className="p-4 text-sm font-data-mono" style={{ color: '#94A3B8' }}>
                  {alert.timestamp}
                </td>
                <td className="p-4 text-right">
                  <button
                    className="px-3 py-1 text-xs font-bold uppercase transition-colors hover:opacity-80"
                    style={{
                      backgroundColor: alert.action === 'REVIEW' ? '#3B82F6' : 'transparent',
                      color: alert.action === 'REVIEW' ? 'white' : '#94A3B8',
                      border: alert.action === 'LOGS' ? '1px solid #24324A' : 'none',
                    }}
                  >
                    {alert.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
