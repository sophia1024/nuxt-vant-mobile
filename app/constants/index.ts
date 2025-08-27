export const appName = 'nuxt-vant-mobile'
export const appDescription = 'Nuxt H5 Starter Template'

// Shop types
export const SHOP_CARD_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
} as const

export type ShopCardType = typeof SHOP_CARD_TYPES[keyof typeof SHOP_CARD_TYPES]

// Shop interface
export interface ShopItem {
  id: string
  name: string
  type: ShopCardType
  image: string
  videoUrl?: string
  address: string
  distance: string
  rating: number
  tags: string[]
  isLiked: boolean
  location: {
    lat: number
    lng: number
  }
}

// Mock shop data
export const MOCK_SHOPS: ShopItem[] = [
  {
    id: '1',
    name: 'Cloud Nine Vapes',
    type: SHOP_CARD_TYPES.IMAGE,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    address: '123 Main St, Downtown',
    distance: '0.5 km',
    rating: 4.8,
    tags: ['Cigar Shop'],
    isLiked: true,
    location: { lat: 40.7128, lng: -74.0060 },
  },
  {
    id: '2',
    name: 'Vape Horizon',
    type: SHOP_CARD_TYPES.VIDEO,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=500&fit=crop',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    address: '456 Oak Ave, Midtown',
    distance: '1.2 km',
    rating: 4.6,
    tags: ['Video', 'Premium'],
    isLiked: false,
    location: { lat: 40.7589, lng: -73.9851 },
  },
  {
    id: '3',
    name: 'The Fog Room',
    type: SHOP_CARD_TYPES.IMAGE,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=350&fit=crop',
    address: '789 Pine St, Uptown',
    distance: '2.1 km',
    rating: 4.9,
    tags: ['Premium', 'Lounge'],
    isLiked: false,
    location: { lat: 40.7831, lng: -73.9712 },
  },
  {
    id: '4',
    name: 'Vapor Central',
    type: SHOP_CARD_TYPES.VIDEO,
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&h=450&fit=crop',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    address: '321 Elm St, Westside',
    distance: '0.8 km',
    rating: 4.7,
    tags: ['Video', 'New'],
    isLiked: true,
    location: { lat: 40.7505, lng: -73.9934 },
  },
  {
    id: '5',
    name: 'Smoke & Mirrors',
    type: SHOP_CARD_TYPES.IMAGE,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=280&fit=crop',
    address: '654 Maple Dr, Eastside',
    distance: '3.5 km',
    rating: 4.5,
    tags: ['Boutique'],
    isLiked: false,
    location: { lat: 40.7282, lng: -73.7949 },
  },
  {
    id: '6',
    name: 'Electric Cloud',
    type: SHOP_CARD_TYPES.VIDEO,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=520&fit=crop',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_3mb.mp4',
    address: '987 Cedar Ln, Southside',
    distance: '1.9 km',
    rating: 4.8,
    tags: ['Video', 'Popular'],
    isLiked: true,
    location: { lat: 40.6892, lng: -74.0445 },
  },
]
