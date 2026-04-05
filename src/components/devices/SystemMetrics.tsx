'use client'

import { TrendingUp, Radio, Activity } from 'lucide-react'
import type { SystemMetrics } from '@/lib/data/devices'

interface SystemMetricsProps {
  metrics: SystemMetrics
}

export default function SystemMetricsSection({ metrics }: SystemMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {/* Network Health */}
      <div
        className="p-6 rounded border"
        style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
            Network Health
          </h3>
          <TrendingUp size={20} style={{ color: '#22C55E' }} />
        </div>
        <div className="text-3xl font-bold mb-2" style={{ color: '#22C55E' }}>
          {metrics.networkHealth}%
        </div>
        <div className="text-xs font-mono" style={{ color: '#94A3B8' }}>
          AVG LATENCY: 14ms
        </div>
      </div>

      {/* Active Sensors */}
      <div
        className="p-6 rounded border"
        style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
            Active Sensors
          </h3>
          <Radio size={20} style={{ color: '#3B82F6' }} />
        </div>
        <div className="text-3xl font-bold mb-2" style={{ color: '#3B82F6' }}>
          {metrics.activeSensors.active} / {metrics.activeSensors.total}
        </div>
        <div className="text-xs font-mono" style={{ color: '#94A3B8' }}>
          SECTOR PERIMETER SECURED
        </div>
      </div>

      {/* Data Throughput */}
      <div
        className="p-6 rounded border"
        style={{ backgroundColor: '#121A2B', borderColor: '#24324A' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
            Data Throughput
          </h3>
          <Activity size={20} style={{ color: '#22C55E' }} />
        </div>
        <div className="text-3xl font-bold mb-2" style={{ color: '#22C55E' }}>
          {metrics.dataThroughput}
        </div>
        <div className="text-xs font-mono" style={{ color: '#94A3B8' }}>
          ENC-002 TUNNEL STABLE
        </div>
      </div>
    </div>
  )
}
