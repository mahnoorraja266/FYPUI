export interface Camera {
  id: string
  name: string
  label: string
  sector: string
  position: { x: string; y: string }
  status: 'online' | 'offline'
  lastSeen: string
  isAlerting: boolean
  health: {
    cpu: number
    gpu: number
    vram: number
    temp: number
  }
  aiModels: {
    faceModel: boolean
    weaponModel: boolean
  }
  alerts: {
    count: number
    message: string
  }
}

export const CAMERAS: Camera[] = [
  {
    id: 'gate1',
    name: 'Gate 1 Camera',
    label: 'GATE 1',
    sector: 'Sector 1 - Entrance',
    position: { x: '33%', y: '25%' },
    status: 'online',
    lastSeen: '3s ago',
    isAlerting: false,
    health: {
      cpu: 38,
      gpu: 28,
      vram: 42,
      temp: 45,
    },
    aiModels: {
      faceModel: true,
      weaponModel: true,
    },
    alerts: {
      count: 0,
      message: 'No active alerts',
    },
  },
  {
    id: 'gate2',
    name: 'Gate 2 Camera',
    label: 'GATE 2',
    sector: 'Sector 2 - Perimeter',
    position: { x: '50%', y: '50%' },
    status: 'online',
    lastSeen: '2s ago',
    isAlerting: true,
    health: {
      cpu: 72,
      gpu: 45,
      vram: 61,
      temp: 58,
    },
    aiModels: {
      faceModel: true,
      weaponModel: false,
    },
    alerts: {
      count: 2,
      message: 'Unrecognized personnel detected near perimeter fence B-4.',
    },
  },
  {
    id: 'lobbynorth',
    name: 'Lobby North Camera',
    label: 'LOBBY_NORTH',
    sector: 'Sector 3 - Main Lobby',
    position: { x: '70%', y: '33%' },
    status: 'online',
    lastSeen: '1s ago',
    isAlerting: false,
    health: {
      cpu: 42,
      gpu: 35,
      vram: 48,
      temp: 52,
    },
    aiModels: {
      faceModel: true,
      weaponModel: true,
    },
    alerts: {
      count: 0,
      message: 'No active alerts',
    },
  },
  {
    id: 'parkinga',
    name: 'Parking A Camera',
    label: 'PARKING_A',
    sector: 'Sector 4 - Parking Area',
    position: { x: '25%', y: '70%' },
    status: 'online',
    lastSeen: '5s ago',
    isAlerting: false,
    health: {
      cpu: 55,
      gpu: 32,
      vram: 54,
      temp: 49,
    },
    aiModels: {
      faceModel: true,
      weaponModel: false,
    },
    alerts: {
      count: 0,
      message: 'No active alerts',
    },
  },
  {
    id: 'rooftop',
    name: 'Rooftop Camera',
    label: 'ROOFTOP',
    sector: 'Sector 5 - Rooftop',
    position: { x: '75%', y: '15%' },
    status: 'offline',
    lastSeen: '45s ago',
    isAlerting: false,
    health: {
      cpu: 0,
      gpu: 0,
      vram: 0,
      temp: 0,
    },
    aiModels: {
      faceModel: false,
      weaponModel: false,
    },
    alerts: {
      count: 0,
      message: 'Camera offline - no signal',
    },
  },
  {
    id: 'warehouse',
    name: 'Warehouse Camera',
    label: 'WAREHOUSE',
    sector: 'Sector 6 - Warehouse',
    position: { x: '60%', y: '75%' },
    status: 'online',
    lastSeen: '2s ago',
    isAlerting: false,
    health: {
      cpu: 35,
      gpu: 22,
      vram: 38,
      temp: 48,
    },
    aiModels: {
      faceModel: true,
      weaponModel: true,
    },
    alerts: {
      count: 0,
      message: 'No active alerts',
    },
  },
  {
    id: 'mainentrance',
    name: 'Main Entrance Camera',
    label: 'MAIN_ENTRANCE',
    sector: 'Sector 7 - Main Entrance',
    position: { x: '15%', y: '35%' },
    status: 'offline',
    lastSeen: '2m ago',
    isAlerting: false,
    health: {
      cpu: 0,
      gpu: 0,
      vram: 0,
      temp: 0,
    },
    aiModels: {
      faceModel: false,
      weaponModel: false,
    },
    alerts: {
      count: 0,
      message: 'Camera offline - connection lost',
    },
  },
]
