export interface Device {
  id: string
  name: string
  location: string
  status: 'online' | 'offline'
  alertsCount: number
  alertType?: 'critical' | 'minor' | 'connection_loss'
}

export const LIVE_FEED_DEVICES: Device[] = [
  {
    id: '1',
    name: 'CAM-NORTH-01',
    location: 'PERIMETER GATE A',
    status: 'online',
    alertsCount: 0,
  },
  {
    id: '2',
    name: 'CAM-SOUTH-04',
    location: 'LOADING DOCK 2',
    status: 'online',
    alertsCount: 2,
    alertType: 'minor',
  },
  {
    id: '3',
    name: 'CAM-WEST-12',
    location: 'STAFF PARKING',
    status: 'offline',
    alertsCount: 1,
    alertType: 'critical',
  },
  {
    id: '4',
    name: 'CAM-INTERNAL-08',
    location: 'SERVER ROOM A',
    status: 'online',
    alertsCount: 0,
  },
  {
    id: '5',
    name: 'CAM-ROOF-03',
    location: 'HVAC UNIT 01',
    status: 'online',
    alertsCount: 0,
  },
  {
    id: '6',
    name: 'CAM-E-STORAGE',
    location: 'EAST STORAGE HALL',
    status: 'offline',
    alertsCount: 1,
    alertType: 'connection_loss',
  },
]
