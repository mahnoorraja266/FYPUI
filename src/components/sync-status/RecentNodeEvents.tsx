import { Info, AlertTriangle } from 'lucide-react'

interface NodeEvent {
  id: string
  type: 'info' | 'critical'
  title: string
  message: string
  timestamp: string
}

const RECENT_EVENTS: NodeEvent[] = [
  {
    id: '1',
    type: 'info',
    title: 'SYSTEM',
    message: 'Automated sweep initiated on Cluster Alpha.',
    timestamp: '12:45:01 UTC',
  },
  {
    id: '2',
    type: 'critical',
    title: 'CRITICAL',
    message: 'Socket timeout on GAMMA-STR-102. Retrying in 30s.',
    timestamp: '12:44:32 UTC',
  },
]

export default function RecentNodeEvents() {
  return (
    <div>
      <h2 className="font-bold text-xs uppercase tracking-widest mb-4" style={{ color: '#94A3B8' }}>
        Recent Node Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {RECENT_EVENTS.map((event) => (
          <div
            key={event.id}
            className="border rounded p-4 flex items-start gap-4"
            style={{ borderColor: '#1E293B', backgroundColor: 'transparent' }}
          >
            {event.type === 'info' ? (
              <Info size={20} style={{ color: '#38BDF8', flexShrink: 0, marginTop: '2px' }} />
            ) : (
              <AlertTriangle size={20} style={{ color: '#EF4444', flexShrink: 0, marginTop: '2px' }} />
            )}
            <div>
              <p className="font-mono text-sm" style={{ color: '#E1E2EC' }}>
                <span className="font-bold">{event.title}:</span> {event.message}
              </p>
              <p className="font-mono text-xs mt-2 uppercase" style={{ color: '#94A3B8' }}>
                {event.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
