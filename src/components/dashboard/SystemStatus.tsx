import { HardDrive, RefreshCw } from 'lucide-react'

export default function SystemStatus() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* System Status Card */}
      <div className="border p-4" style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: '#24324A' }}>
          <HardDrive size={20} />
          <h3 className="text-lg font-bold uppercase tracking-wide" style={{ color: '#E5E7EB' }}>
            System Status
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#94A3B8' }}>
              Devices
            </div>
            <div className="text-2xl font-bold font-data-mono" style={{ color: '#E5E7EB' }}>
              05
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#22C55E' }}>
              Active
            </div>
            <div className="text-2xl font-bold font-data-mono" style={{ color: '#22C55E' }}>
              04
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#94A3B8' }}>
              Total Alerts
            </div>
            <div className="text-2xl font-bold font-data-mono" style={{ color: '#E5E7EB' }}>
              07
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t space-y-2" style={{ borderColor: '#24324A' }}>
          <div className="flex justify-between text-xs">
            <span style={{ color: '#94A3B8' }}>Diagnostic: Latency 42ms</span>
            <span style={{ color: '#22C55E' }}>SERVICE NOMINAL</span>
          </div>
        </div>
      </div>

      {/* Uptime Card */}
      <div className="border p-4" style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: '#24324A' }}>
          <RefreshCw size={20} />
          <h3 className="text-lg font-bold uppercase tracking-wide" style={{ color: '#E5E7EB' }}>
            Uptime
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-4xl font-bold font-data-mono" style={{ color: '#E5E7EB' }}>
                03
              </span>
              <span className="text-2xl font-bold font-data-mono" style={{ color: '#E5E7EB' }}>
                H
              </span>
              <span className="text-4xl font-bold font-data-mono" style={{ color: '#E5E7EB' }}>
                42
              </span>
              <span className="text-2xl font-bold font-data-mono" style={{ color: '#E5E7EB' }}>
                M
              </span>
            </div>
            <div className="text-xs uppercase tracking-widest" style={{ color: '#94A3B8' }}>
              Backend Service Runtime
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22C55E' }} />
              <span className="text-xs font-bold uppercase" style={{ color: '#22C55E' }}>
                Kernel Sync Active
              </span>
            </div>
          </div>

          {/* Circular Progress */}
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#24324A"
                strokeWidth="2"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeDasharray={`${45 * Math.PI * 2 * 0.99}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm font-bold" style={{ color: '#E5E7EB' }}>
                  99.9%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
