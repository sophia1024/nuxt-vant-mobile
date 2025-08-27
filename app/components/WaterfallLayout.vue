<script setup lang="ts">
import type { ShopItem } from '~/constants'
import { SHOP_CARD_TYPES } from '~/constants'

interface Props {
  shops: ShopItem[]
  loading?: boolean
}

interface Emits {
  (e: 'like', shopId: string): void
  (e: 'click', shop: ShopItem): void
  (e: 'play', shop: ShopItem): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})
const emit = defineEmits<Emits>()

// Split shops into two columns for waterfall layout
const leftColumnShops = computed(() => {
  return props.shops.filter((_, index) => index % 2 === 0)
})

const rightColumnShops = computed(() => {
  return props.shops.filter((_, index) => index % 2 === 1)
})

function handleLike(shopId: string) {
  emit('like', shopId)
}

function handleClick(shop: ShopItem) {
  emit('click', shop)
}

function handlePlay(shop: ShopItem) {
  emit('play', shop)
}
</script>

<template>
  <div class="waterfall-container">
    <div v-if="loading" class="py-8 flex justify-center">
      <van-loading type="spinner" />
    </div>

    <div v-else class="waterfall-grid px-4 gap-3 grid grid-cols-2">
      <!-- Left Column -->
      <div class="waterfall-column space-y-3">
        <div
          v-for="shop in leftColumnShops"
          :key="shop.id"
          class="waterfall-item"
        >
          <ShopVideoCard
            v-if="shop.type === SHOP_CARD_TYPES.VIDEO"
            :shop="shop"
            @like="handleLike"
            @click="handleClick"
            @play="handlePlay"
          />
          <ShopCard
            v-else
            :shop="shop"
            @like="handleLike"
            @click="handleClick"
          />
        </div>
      </div>

      <!-- Right Column -->
      <div class="waterfall-column space-y-3">
        <div
          v-for="shop in rightColumnShops"
          :key="shop.id"
          class="waterfall-item"
        >
          <ShopVideoCard
            v-if="shop.type === SHOP_CARD_TYPES.VIDEO"
            :shop="shop"
            @like="handleLike"
            @click="handleClick"
            @play="handlePlay"
          />
          <ShopCard
            v-else
            :shop="shop"
            @like="handleLike"
            @click="handleClick"
          />
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && shops.length === 0" class="py-12 text-center">
      <div class="i-carbon:location text-4xl text-gray-400 mx-auto mb-4" />
      <p class="text-gray-500">
        No shops found nearby
      </p>
    </div>
  </div>
</template>

<style scoped>
.waterfall-grid {
  align-items: start;
}

.waterfall-column {
  display: flex;
  flex-direction: column;
}

.waterfall-item {
  break-inside: avoid;
  page-break-inside: avoid;
}
</style>
