export interface Device {
  id: string
  name: string
  location: string
  icon: string
  status: 'online' | 'offline'
  cpu: number
  gpu: number
  ram: {
    used: number
    total: number
  }
  temperature: number
  faceDetection: boolean
  weaponDetection: boolean
}

export const DEVICES: Device[] = [
  {
    id: 'sec-001-alpha',
    name: 'Gate 1',
    location: 'SEC-001-ALPHA',
    icon: 'door_front',
    status: 'online',
    cpu: 72,
    gpu: 45,
    ram: { used: 4.8, total: 8 },
    temperature: 58,
    faceDetection: true,
    weaponDetection: false,
  },
  {
    id: 'sec-002-bravo',
    name: 'Gate 2',
    location: 'SEC-002-BRAVO',
    icon: 'door_front',
    status: 'online',
    cpu: 68,
    gpu: 51,
    ram: { used: 4.4, total: 8 },
    temperature: 62,
    faceDetection: true,
    weaponDetection: true,
  },
  {
    id: 'sec-005-ext',
    name: 'Parking',
    location: 'SEC-005-EXT',
    icon: 'local_parking',
    status: 'offline',
    cpu: 0,
    gpu: 0,
    ram: { used: 0, total: 8 },
    temperature: 0,
    faceDetection: false,
    weaponDetection: false,
  },
  {
    id: 'sec-012-main',
    name: 'Lobby',
    location: 'SEC-012-MAIN',
    icon: 'door_front',
    status: 'online',
    cpu: 41,
    gpu: 30,
    ram: { used: 3.8, total: 8 },
    temperature: 51,
    faceDetection: true,
    weaponDetection: true,
  },
]

export interface SystemMetrics {
  networkHealth: number
  activeSensors: { active: number; total: number }
  dataThroughput: string
}

export const SYSTEM_METRICS: SystemMetrics = {
  networkHealth: 98.2,
  activeSensors: { active: 124, total: 128 },
  dataThroughput: '4.2 GB/s',
}
