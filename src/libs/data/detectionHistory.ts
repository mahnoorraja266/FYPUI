export interface DetectionRecord {
  id: string
  personId: string
  thumbnail: string
  sourceDevice: string
  confidence: number
  timestamp: string
  status: 'reviewed' | 'pending'
}

export const getDetectionHistory = (personId: string): DetectionRecord[] => {
  const histories: Record<string, DetectionRecord[]> = {
    person1: [
      {
        id: 'det1',
        personId: 'person1',
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        sourceDevice: 'Gate 2 - Primary Entry',
        confidence: 0.9824,
        timestamp: '2024-05-22 14:32:01',
        status: 'reviewed',
      },
      {
        id: 'det2',
        personId: 'person1',
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        sourceDevice: 'Zone B - West Wing',
        confidence: 0.9411,
        timestamp: '2024-05-22 14:15:22',
        status: 'pending',
      },
      {
        id: 'det3',
        personId: 'person1',
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        sourceDevice: 'Parking L3 - Cam 04',
        confidence: 0.8972,
        timestamp: '2024-05-22 13:58:45',
        status: 'reviewed',
      },
      {
        id: 'det4',
        personId: 'person1',
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        sourceDevice: 'Loading Dock A',
        confidence: 0.9910,
        timestamp: '2024-05-22 13:42:10',
        status: 'pending',
      },
      {
        id: 'det5',
        personId: 'person1',
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        sourceDevice: 'Main Lobby - Desk',
        confidence: 0.8255,
        timestamp: '2024-05-22 13:10:05',
        status: 'reviewed',
      },
    ],
  }
  return histories[personId] || []
}
