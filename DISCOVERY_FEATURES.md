# Vape Shop Discovery Features

## Overview

This project now includes a comprehensive vape shop discovery system with a waterfall layout, mock data support, and responsive design.

## Features

### 1. Discovery Page (`/discovery`)

- **1:1 UI Recreation**: Matches the provided design with "Where to?" header and search functionality
- **Two-Column Waterfall Layout**: Optimized for mobile viewing with staggered card heights
- **Search Functionality**: Real-time search with debouncing (300ms delay)
- **Nearby Shops Section**: Shows local vape shops with distance indicators

### 2. Shop Card Components

#### ShopCard.vue

- Standard image-based shop cards
- Like/favorite functionality with heart icon
- Distance badges
- Rating display with star icons
- Tag system for shop categories
- Responsive hover effects

#### ShopVideoCard.vue

- Video-enabled shop cards with play button overlay
- Video badge indicator
- All features from standard cards plus video playback
- Larger card heights for better video thumbnail display

#### WaterfallLayout.vue

- Two-column masonry-style layout
- Automatic distribution of cards between columns
- Loading states with Vant spinner
- Empty state handling
- Responsive design for different screen sizes

### 3. Mock Data System

#### Setup

```bash
# Run with mock data enabled
npm run dev:mock

# Run normally (uses real API)
npm run dev
```

#### Configuration

- Mock data controlled via `NUXT_MOCK_ENABLED` environment variable
- Configurable in `nuxt.config.ts` runtime config
- Simulated API delays for realistic testing

#### Mock Data Features

- 6 sample vape shops with varied content
- Mixed image and video card types
- Different card heights for waterfall effect
- Realistic shop information (names, addresses, ratings, tags)
- Location coordinates for future map integration

### 4. Data Management

#### Store (Pinia)

- `useShopsStore`: Centralized state management
- Separate loading states for main content and search
- Like status persistence
- Search result caching

#### Composables

- `useShopInteractions`: Reusable interaction handlers
- Debounced search functionality
- Like toggle with potential API integration
- Decoupled from UI components for reusability

#### API Layer

- `app/api/shops.ts`: Service layer for shop data
- Mock/real API switching
- Search functionality with filtering
- Consistent response format

### 5. Routing & Navigation

#### New Route

- `/discovery` - Main discovery page
- Integrated with existing navigation system
- Added to footer tabbar with location icon
- Internationalization support (EN/ZH)

#### Navigation

- Added "Discovery" tab to bottom navigation
- Proper route meta configuration
- Layout inheritance from existing system

### 6. Styling & Design

#### CSS Approach

- Tailwind CSS classes for styling
- UnoCSS integration for icon system
- Responsive design patterns
- Consistent with existing app design system

#### Card Heights

- Image cards: Variable heights based on content
- Video cards: Taller aspect ratios for better video display
- Waterfall algorithm automatically balances columns

### 7. Internationalization

#### Supported Languages

- English (en-US)
- Chinese (zh-CN)

#### New Translations

```json
{
  "navbar": {
    "Discovery": "发现" // "Discovery"
  },
  "tabbar": {
    "discovery": "发现" // "Discovery"
  }
}
```

## Technical Implementation

### Component Architecture

```
Discovery Page
├── WaterfallLayout
│   ├── ShopCard (for image shops)
│   └── ShopVideoCard (for video shops)
├── Search Interface (Vant Search)
└── Navigation Integration
```

### State Management Flow

```
User Action → Composable → Store → API → UI Update
```

### Mock System Flow

```
API Call → Check Mock Flag → Return Mock Data OR Real API Call
```

## Usage Examples

### Basic Shop Display

```vue
<WaterfallLayout
  :shops="shops"
  :loading="loading"
  @like="handleLike"
  @click="handleShopClick"
  @play="handleVideoPlay"
/>
```

### Search Integration

```vue
<van-search
  v-model="searchQuery"
  placeholder="Find vape shops"
  @search="handleSearch"
/>
```

### Mock Data Toggle

```typescript
// In API service
if (config.public.mockEnabled) {
  return { result: MOCK_SHOPS }
}
```

## Development Notes

### Performance Optimizations

- Image lazy loading with `loading="lazy"`
- Debounced search to reduce API calls
- Component-level state management
- Efficient waterfall column distribution

### Accessibility

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly structure
- High contrast design elements

### Future Enhancements

- Map integration for location-based discovery
- Advanced filtering options
- Shop detail pages
- Video playback modal
- Real-time distance calculation
- Push notifications for nearby shops

## File Structure

```
app/
├── api/shops.ts              # Shop API service
├── components/
│   ├── ShopCard.vue          # Image shop card
│   ├── ShopVideoCard.vue     # Video shop card
│   └── WaterfallLayout.vue   # Two-column layout
├── composables/shops.ts      # Shop interactions & state
├── constants/index.ts        # Shop data types & mock data
└── pages/discovery/index.vue # Main discovery page
```

This implementation provides a solid foundation for a vape shop discovery feature with modern mobile app patterns and excellent user experience.
