import { CheckCircle, Activity, Zap } from 'lucide-react'

export default function AlertSystemStatus() {
  return (
    <div
      className="fixed bottom-6 right-6 p-4 border rounded w-72"
      style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}
    >
      <div className="space-y-3">
        {/* System Status */}
        <div className="flex justify-between items-center">
          <span className="text-xs uppercase tracking-widest font-bold" style={{ color: '#94A3B8' }}>
            System Status
          </span>
          <div className="flex items-center gap-2">
            <CheckCircle size={14} style={{ color: '#22C55E' }} />
            <span className="text-xs font-bold uppercase" style={{ color: '#22C55E' }}>
              Nominal
            </span>
          </div>
        </div>

        {/* Active Feeds */}
        <div className="flex justify-between items-center">
          <span className="text-xs uppercase tracking-widest font-bold" style={{ color: '#94A3B8' }}>
            Active Feeds
          </span>
          <span className="text-xs font-mono" style={{ color: '#E5E7EB' }}>
            428 / 428
          </span>
        </div>

        {/* Latency */}
        <div className="flex justify-between items-center">
          <span className="text-xs uppercase tracking-widest font-bold" style={{ color: '#94A3B8' }}>
            Latency
          </span>
          <span className="text-xs font-mono" style={{ color: '#E5E7EB' }}>
            52ms
          </span>
        </div>
      </div>
    </div>
  )
}
