import type { ShopItem } from '~/constants'
import { defineStore } from 'pinia'
import { getShops, searchShops } from '~/api/shops'

export const useShopsStore = defineStore('shops', () => {
  const shops = ref<ShopItem[]>([])
  const loading = ref(false)
  const searchQuery = ref('')
  const searchResults = ref<ShopItem[]>([])
  const searchLoading = ref(false)

  // Fetch all shops
  async function fetchShops() {
    loading.value = true
    try {
      const res = await getShops()
      shops.value = res.result
    }
    catch (error) {
      console.error('Failed to fetch shops:', error)
    }
    finally {
      loading.value = false
    }
  }

  // Search shops
  async function searchShopsData(query: string) {
    searchLoading.value = true
    searchQuery.value = query
    try {
      if (!query.trim()) {
        searchResults.value = []
        return
      }
      const res = await searchShops(query)
      searchResults.value = res.result
    }
    catch (error) {
      console.error('Failed to search shops:', error)
      searchResults.value = []
    }
    finally {
      searchLoading.value = false
    }
  }

  // Toggle like status
  function toggleLike(shopId: string) {
    const shop = shops.value.find(s => s.id === shopId)
    if (shop) {
      shop.isLiked = !shop.isLiked
    }

    const searchShop = searchResults.value.find(s => s.id === shopId)
    if (searchShop) {
      searchShop.isLiked = !searchShop.isLiked
    }
  }

  // Clear search
  function clearSearch() {
    searchQuery.value = ''
    searchResults.value = []
  }

  return {
    shops,
    loading,
    searchQuery,
    searchResults,
    searchLoading,
    fetchShops,
    searchShopsData,
    toggleLike,
    clearSearch,
  }
})

// Simple debounce utility
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout | null = null
  return ((...args: Parameters<T>) => {
    if (timeout)
      clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }) as T
}

// Composable for shop interactions
export function useShopInteractions() {
  const store = useShopsStore()

  const handleLike = (shopId: string) => {
    store.toggleLike(shopId)
    // Here you could also call an API to update the like status
  }

  const handleSearch = debounce((query: string) => {
    store.searchShopsData(query)
  }, 300)

  return {
    handleLike,
    handleSearch,
  }
}
