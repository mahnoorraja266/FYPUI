export interface Recording {
  id: string
  deviceId: string
  startTime: string
  endTime: string | null
  duration: string
  size: string | null
  status: 'completed' | 'recording'
}

export const RECORDINGS: Recording[] = [
  {
    id: 'rec-001',
    deviceId: 'gate-1',
    startTime: '08:00:01',
    endTime: '08:59:59',
    duration: '00:59:58',
    size: '1.2 GB',
    status: 'completed',
  },
  {
    id: 'rec-002',
    deviceId: 'gate-1',
    startTime: '09:00:00',
    endTime: '09:59:59',
    duration: '00:59:59',
    size: '1.4 GB',
    status: 'completed',
  },
  {
    id: 'rec-003',
    deviceId: 'gate-1',
    startTime: '10:00:00',
    endTime: '10:59:59',
    duration: '00:59:59',
    size: '1.1 GB',
    status: 'completed',
  },
  {
    id: 'rec-004',
    deviceId: 'gate-1',
    startTime: '11:00:00',
    endTime: '11:59:59',
    duration: '00:59:59',
    size: '1.3 GB',
    status: 'completed',
  },
  {
    id: 'rec-005',
    deviceId: 'gate-1',
    startTime: '12:00:00',
    endTime: null,
    duration: 'IN PROGRESS',
    size: 'BUFF...',
    status: 'recording',
  },
]

export const DEVICES = [
  { id: 'gate-1', name: 'Gate 1 Camera' },
  { id: 'gate-2', name: 'Gate 2 Camera' },
  { id: 'parking', name: 'Parking Lot' },
  { id: 'lobby', name: 'Lobby Camera' },
]
