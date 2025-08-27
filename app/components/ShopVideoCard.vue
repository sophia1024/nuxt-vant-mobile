<script setup lang="ts">
import type { ShopItem } from '~/constants'

interface Props {
  shop: ShopItem
}

interface Emits {
  (e: 'like', shopId: string): void
  (e: 'click', shop: ShopItem): void
  (e: 'play', shop: ShopItem): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function handleLike() {
  emit('like', props.shop.id)
}

function handleClick() {
  emit('click', props.shop)
}

function handlePlay() {
  emit('play', props.shop)
}
</script>

<template>
  <div
    class="shop-video-card border border-gray-100 rounded-lg bg-white cursor-pointer shadow-sm transition-transform overflow-hidden hover:scale-[1.02]"
    @click="handleClick"
  >
    <!-- Video Container -->
    <div class="relative">
      <img
        :src="shop.image"
        :alt="shop.name"
        class="h-auto w-full object-cover"
        loading="lazy"
      >

      <!-- Play Button Overlay -->
      <button
        class="bg-black/20 flex transition-opacity items-center inset-0 justify-center absolute hover:bg-black/30"
        @click.stop="handlePlay"
      >
        <van-button
          class="!h-16 !w-16"
          round
          type="default"
          icon="play"
        />
      </button>

      <!-- Like Button -->
      <van-button
        class="right-2 top-2 absolute z-10 !h-10 !w-10"
        :class="shop.isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600'"
        round
        :icon="shop.isLiked ? 'like' : 'like-o'"
        @click.stop="handleLike"
      />

      <!-- Distance Badge -->
      <van-tag
        class="bottom-2 left-2 absolute z-10"
        type="primary"
        round
      >
        {{ shop.distance }}
      </van-tag>

      <!-- Video Badge -->
      <van-tag
        class="left-2 top-2 absolute z-10"
        type="success"
        round
      >
        Video
      </van-tag>
    </div>

    <!-- Content -->
    <div class="p-4">
      <!-- Shop Name -->
      <h3 class="text-base text-gray-900 font-semibold mb-2 line-clamp-1">
        {{ shop.name }}
      </h3>

      <!-- Address -->
      <p class="text-sm text-gray-600 mb-3 line-clamp-1">
        {{ shop.address }}
      </p>

      <!-- Tags and Rating -->
      <div class="flex items-center justify-between">
        <div class="flex flex-wrap gap-1">
          <van-tag
            v-for="tag in shop.tags.slice(0, 2)"
            :key="tag"
            type="default"
          >
            {{ tag }}
          </van-tag>
        </div>

        <div class="text-sm text-gray-600 flex gap-1 items-center">
          <van-icon name="star" class="text-yellow-500" />
          {{ shop.rating }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
