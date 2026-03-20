import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
  status?: 'online' | 'offline' | 'danger' | 'warning'
  alerts?: { online?: number; offline?: number }
  children?: React.ReactNode
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  status,
  alerts,
  children,
}: StatCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'danger':
        return '#EF4444'
      case 'warning':
        return '#F59E0B'
      default:
        return '#E5E7EB'
    }
  }

  return (
    <div
      className="border p-4 flex flex-col justify-between"
      style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}
    >
      <div>
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: '#94A3B8' }}
        >
          {title}
        </span>
        <div className="flex items-baseline gap-2 mt-2">
          <span
            className="text-2xl font-bold font-data-mono"
            style={{ color: getStatusColor() }}
          >
            {value}
          </span>
          {subtitle && (
            <span className="text-sm font-data-mono" style={{ color: '#94A3B8' }}>
              {subtitle}
            </span>
          )}
          {icon && (
            <div className="ml-auto text-base" style={{ color: getStatusColor() }}>
              <icon.type size={20} />
            </div>
          )}
        </div>
      </div>

      {alerts && (
        <div className="mt-4 flex gap-4">
          {alerts.online !== undefined && (
            <div className="flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#22C55E' }}
              />
              <span className="text-xs font-data-mono" style={{ color: '#22C55E' }}>
                {alerts.online} Online
              </span>
            </div>
          )}
          {alerts.offline !== undefined && (
            <div className="flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#EF4444' }}
              />
              <span className="text-xs font-data-mono" style={{ color: '#EF4444' }}>
                {alerts.offline} Offline
              </span>
            </div>
          )}
        </div>
      )}

      {children}
    </div>
  )
}
