export interface EnrolledPerson {
  id: string
  name: string
  age: number
  image: string
  enrollmentDate: string
}

export const ENROLLED_PERSONS: EnrolledPerson[] = [
  {
    id: 'marcus-thorne',
    name: 'Marcus Thorne',
    age: 34,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    enrollmentDate: '2024-01-15',
  },
  {
    id: 'elena-vance',
    name: 'Elena Vance',
    age: 29,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
    enrollmentDate: '2024-01-20',
  },
  {
    id: 'david-chen',
    name: 'David Chen',
    age: 41,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
    enrollmentDate: '2024-02-01',
  },
  {
    id: 'sarah-kinsley',
    name: 'Sarah Kinsley',
    age: 25,
    image: 'https://images.unsplash.com/photo-1517070213482-ea83e48f7676?w=400&h=500&fit=crop',
    enrollmentDate: '2024-02-05',
  },
  {
    id: 'robert-miller',
    name: 'Robert Miller',
    age: 47,
    image: 'https://images.unsplash.com/photo-1516622671519-c21a5651c46b?w=400&h=500&fit=crop',
    enrollmentDate: '2024-02-10',
  },
  {
    id: 'linda-ross',
    name: 'Linda Ross',
    age: 32,
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=500&fit=crop',
    enrollmentDate: '2024-02-15',
  },
  {
    id: 'alex-volkov',
    name: 'Alex Volkov',
    age: 38,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
    enrollmentDate: '2024-02-20',
  },
  {
    id: 'maya-patel',
    name: 'Maya Patel',
    age: 31,
    image: 'https://images.unsplash.com/photo-1507692307330-fff3e6d0a5c2?w=400&h=500&fit=crop',
    enrollmentDate: '2024-02-25',
  },
]
