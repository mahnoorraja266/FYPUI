import { CheckCircle, AlertCircle, XCircle } from 'lucide-react'

interface SyncNode {
  id: string
  device: string
  syncVersion: string
  status: 'updated' | 'outdated' | 'offline'
  lastSync: string
  lastUpdate: string
}

const SYNC_NODES: SyncNode[] = [
  {
    id: '1',
    device: 'ALPHA-NOD-001',
    syncVersion: 'HTTPS/TLS 1.3',
    status: 'updated',
    lastSync: '12ms',
    lastUpdate: '2 min ago',
  },
  {
    id: '2',
    device: 'ALPHA-NOD-002',
    syncVersion: 'WEBSOCKET',
    status: 'updated',
    lastSync: '45ms',
    lastUpdate: '45 sec ago',
  },
  {
    id: '3',
    device: 'BETA-NOD-004',
    syncVersion: 'MQTT v5.0',
    status: 'outdated',
    lastSync: '156ms',
    lastUpdate: '14 min ago',
  },
  {
    id: '4',
    device: 'GAMMA-STR-102',
    syncVersion: 'RTSP/UDP',
    status: 'offline',
    lastSync: '∞',
    lastUpdate: '--',
  },
  {
    id: '5',
    device: 'DELTA-NOD-088',
    syncVersion: 'HTTPS/TLS 1.3',
    status: 'updated',
    lastSync: '22ms',
    lastUpdate: '3 min ago',
  },
  {
    id: '6',
    device: 'EPSILON-ARC-12',
    syncVersion: 'WEBSOCKET',
    status: 'outdated',
    lastSync: '98ms',
    lastUpdate: '8 min ago',
  },
]

export default function SyncTable() {
  const getStatusColor = (status: 'updated' | 'outdated' | 'offline') => {
    switch (status) {
      case 'updated':
        return '#22C55E'
      case 'outdated':
        return '#F59E0B'
      case 'offline':
        return '#EF4444'
    }
  }

  const getStatusIcon = (status: 'updated' | 'outdated' | 'offline') => {
    switch (status) {
      case 'updated':
        return <CheckCircle size={16} />
      case 'outdated':
        return <AlertCircle size={16} />
      case 'offline':
        return <XCircle size={16} />
    }
  }

  const getStatusLabel = (status: 'updated' | 'outdated' | 'offline') => {
    switch (status) {
      case 'updated':
        return 'Updated'
      case 'outdated':
        return 'Outdated'
      case 'offline':
        return 'Offline'
    }
  }

  return (
    <div className="border rounded overflow-hidden" style={{ borderColor: '#1E293B', backgroundColor: 'transparent' }}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b" style={{ borderColor: '#1E293B' }}>
            <th className="p-4 font-bold text-xs uppercase tracking-widest" style={{ color: '#94A3B8' }}>
              Device
            </th>
            <th className="p-4 font-bold text-xs uppercase tracking-widest" style={{ color: '#94A3B8' }}>
              Sync Version
            </th>
            <th className="p-4 font-bold text-xs uppercase tracking-widest" style={{ color: '#94A3B8' }}>
              Status
            </th>
            <th className="p-4 font-bold text-xs uppercase tracking-widest" style={{ color: '#94A3B8' }}>
              Last Sync
            </th>
            <th className="p-4 font-bold text-xs uppercase tracking-widest" style={{ color: '#94A3B8' }}>
              Last Update
            </th>
            <th className="p-4 font-bold text-xs uppercase tracking-widest text-right" style={{ color: '#94A3B8' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="font-mono text-xs" style={{ color: '#E1E2EC' }}>
          {SYNC_NODES.map((node) => (
            <tr
              key={node.id}
              className="border-b hover:opacity-80 transition-opacity"
              style={{ borderColor: '#1E293B' }}
            >
              <td className="p-4 font-semibold" style={{ color: '#E1E2EC' }}>
                {node.device}
              </td>
              <td className="p-4" style={{ color: '#94A3B8' }}>
                {node.syncVersion}
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2" style={{ color: getStatusColor(node.status) }}>
                  {getStatusIcon(node.status)}
                  <span>{getStatusLabel(node.status)}</span>
                </div>
              </td>
              <td className="p-4" style={{ color: '#E1E2EC' }}>
                {node.lastSync}
              </td>
              <td className="p-4" style={{ color: '#94A3B8' }}>
                {node.lastUpdate}
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-3">
                  <button
                    className="px-4 py-1.5 rounded text-xs font-bold uppercase border transition-all hover:opacity-80"
                    style={{
                      borderColor: '#38BDF8',
                      backgroundColor: 'transparent',
                      color: '#38BDF8',
                      border: '1px solid #38BDF8',
                    }}
                  >
                    Logs
                  </button>
                  <button
                    className="px-4 py-1.5 rounded text-xs font-bold uppercase transition-all hover:opacity-80"
                    style={{
                      backgroundColor: '#3B82F6',
                      color: '#FFF',
                    }}
                  >
                    Force Sync
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
