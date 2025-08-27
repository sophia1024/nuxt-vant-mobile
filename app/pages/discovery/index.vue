<script setup lang="ts">
import type { ShopItem } from '~/constants'
import { useShopInteractions, useShopsStore } from '~/composables/shops'

definePageMeta({
  layout: 'default',
  name: 'Discovery',
})

useHead({
  title: 'Where to? - Find Vape Shops',
})

const store = useShopsStore()
const { handleLike, handleSearch } = useShopInteractions()

const searchQuery = ref('')
const showSearchResults = ref(false)

// Initialize data
onMounted(() => {
  store.fetchShops()
})

// Watch search query
watch(searchQuery, (newQuery) => {
  if (newQuery.trim()) {
    showSearchResults.value = true
    handleSearch(newQuery)
  }
  else {
    showSearchResults.value = false
    store.clearSearch()
  }
})

function handleShopClick(shop: ShopItem) {
  // Navigate to shop detail page
  // navigateTo(`/shops/${shop.id}`)
  // For now, just show a toast
  showToast(`Clicked on ${shop.name}`)
}

function handleVideoPlay(shop: ShopItem) {
  // Handle video playback
  showToast(`Playing video for ${shop.name}`)
}

function clearSearch() {
  searchQuery.value = ''
  showSearchResults.value = false
  store.clearSearch()
}
</script>

<template>
  <div class="discovery-page bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="px-4 py-6 bg-white shadow-sm">
      <h1 class="text-4xl text-gray-900 font-bold mb-6">
        Where to?
      </h1>

      <!-- Search Input -->
      <div class="relative">
        <van-search
          v-model="searchQuery"
          placeholder="Find vape shops"
          show-action
          :clearable="true"
          @search="handleSearch"
          @clear="clearSearch"
        >
          <template #left-icon>
            <van-icon name="search" class="text-gray-400" />
          </template>
          <template #action>
            <van-button
              v-if="searchQuery"
              type="primary"
              size="small"
              @click="clearSearch"
            >
              Cancel
            </van-button>
          </template>
        </van-search>

        <!-- Filters Button -->
        <van-button
          class="right-3 top-1/2 absolute -translate-y-1/2"
          icon="filter-o"
          size="small"
          plain
        />
      </div>
    </div>

    <!-- Search Results -->
    <div v-if="showSearchResults" class="bg-white">
      <div class="px-4 py-3 border-b border-gray-100">
        <h2 class="text-xl text-gray-900 font-semibold">
          Search Results
          <span v-if="!store.searchLoading" class="text-base text-gray-500 font-normal">
            ({{ store.searchResults.length }} found)
          </span>
        </h2>
      </div>

      <WaterfallLayout
        :shops="store.searchResults"
        :loading="store.searchLoading"
        @like="handleLike"
        @click="handleShopClick"
        @play="handleVideoPlay"
      />
    </div>

    <!-- Main Content -->
    <div v-else>
      <!-- Nearby Section -->
      <div class="mt-2 bg-white">
        <div class="px-4 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 class="text-xl text-gray-900 font-semibold">
            Nearby
          </h2>
          <van-button
            type="default"
            size="small"
            plain
            icon="arrow"
            icon-position="right"
          >
            See all
          </van-button>
        </div>

        <!-- Shops Waterfall Layout -->
        <WaterfallLayout
          :shops="store.shops"
          :loading="store.loading"
          @like="handleLike"
          @click="handleShopClick"
          @play="handleVideoPlay"
        />
      </div>
    </div>

    <!-- Bottom Navigation Spacer -->
    <div class="h-[var(--van-nav-bar-height)]" />
  </div>
</template>

<style scoped>
.discovery-page {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
