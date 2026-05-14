export interface Alert {
  id: string
  type: 'person' | 'weapon'
  deviceId: string
  objectLabel: string
  confidence: number
  timestamp: string
  thumbnail: string
  status: 'active' | 'reviewed' | 'ignored' | 'pending'
}

export const ACTIVE_ALERTS: Alert[] = [
  {
    id: '1',
    type: 'person',
    deviceId: 'CAM-NW-042',
    objectLabel: 'Unidentified Subject',
    confidence: 98.4,
    timestamp: '22:14:03:12',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80"%3E%3Crect fill="%23222" width="120" height="80"/%3E%3Crect fill="%23444" x="40" y="20" width="40" height="50"/%3E%3C/svg%3E',
    status: 'active',
  },
  {
    id: '2',
    type: 'weapon',
    deviceId: 'CAM-LOBBY-A',
    objectLabel: 'Firearm Detected',
    confidence: 88.2,
    timestamp: '22:12:45:01',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80"%3E%3Crect fill="%23222" width="120" height="80"/%3E%3Cline x1="20" y1="40" x2="100" y2="40" stroke="%23666" stroke-width="2"/%3E%3C/svg%3E',
    status: 'active',
  },
]

export const ALERT_HISTORY: Alert[] = [
  {
    id: '3',
    type: 'person',
    deviceId: 'CAM-GATE-03',
    objectLabel: 'Staff Member',
    confidence: 94.1,
    timestamp: '21:45:32',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80"%3E%3Crect fill="%23333" width="120" height="80"/%3E%3C/svg%3E',
    status: 'reviewed',
  },
  {
    id: '4',
    type: 'person',
    deviceId: 'CAM-PARK-01',
    objectLabel: 'False Trigger',
    confidence: 61.0,
    timestamp: '21:30:10',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80"%3E%3Crect fill="%23333" width="120" height="80"/%3E%3C/svg%3E',
    status: 'ignored',
  },
  {
    id: '5',
    type: 'weapon',
    deviceId: 'CAM-HALL-W',
    objectLabel: 'Unknown Object',
    confidence: 72.5,
    timestamp: '21:12:44',
    thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80"%3E%3Crect fill="%23333" width="120" height="80"/%3E%3C/svg%3E',
    status: 'pending',
  },
]
