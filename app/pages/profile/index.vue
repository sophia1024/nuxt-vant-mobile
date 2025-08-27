<script setup lang="ts">
import { useAuthStore } from '~/composables/auth'

definePageMeta({
  layout: 'default',
  name: 'Profile',
})

useHead({
  title: 'Account',
})

const authStore = useAuthStore()

// Initialize auth data
onMounted(() => {
  authStore.initializeAuth()
  if (authStore.isLoggedIn) {
    authStore.fetchUserBalance()
    authStore.fetchUserStatistics()
  }
})

// User stats for display
const userStats = computed(() => {
  if (!authStore.userStatistics)
    return []

  const stats = authStore.userStatistics
  return [
    { value: stats.works.totalCount, label: 'Posts' },
    { value: stats.getLikes.totalCount, label: 'Likes' },
    { value: stats.reservation.totalCount, label: 'Appointments' },
  ]
})

// Story types
const storyTypes = computed(() => {
  if (!authStore.userStatistics)
    return []

  const works = authStore.userStatistics.works
  return [
    { label: 'Stories', count: works.dynamicCount, active: true },
    { label: 'Articles', count: works.longCount, active: false },
    { label: 'Reels', count: works.reelsCount, active: false },
  ]
})

function handleLogin() {
  navigateTo('/login')
}
</script>

<template>
  <div class="profile-page bg-gray-50 min-h-screen">
    <!-- User Info Section -->
    <div v-if="authStore.isLoggedIn" class="pb-4 bg-white">
      <!-- User Avatar and Basic Info -->
      <div class="relative">
        <!-- Background Image -->
        <div class="h-48 relative overflow-hidden from-gray-200 to-gray-300 bg-gradient-to-br">
          <img
            v-if="authStore.userBalance?.background"
            :src="authStore.userBalance.background"
            alt="Background"
            class="h-full w-full object-cover"
          >
          <!-- Default pattern background -->
          <div v-else class="opacity-30 inset-0 absolute from-purple-400 to-orange-300 via-pink-300 bg-gradient-to-br">
            <div class="inset-0 absolute" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px);" />
          </div>
        </div>

        <!-- Avatar -->
        <div class="left-6 absolute -bottom-8">
          <div class="relative">
            <div class="border-4 border-white rounded-full bg-gray-200 flex h-20 w-20 items-center justify-center overflow-hidden">
              <img
                v-if="authStore.userBalance?.avatar"
                :src="authStore.userBalance.avatar"
                :alt="authStore.userBalance.userName"
                class="h-full w-full object-cover"
              >
              <van-icon v-else name="user-o" class="text-gray-400" />
            </div>
            <!-- Add/Edit Avatar Button -->
            <button class="rounded-full bg-purple-500 flex h-7 w-7 items-center justify-center absolute -bottom-1 -right-1">
              <van-icon name="plus" class="text-white" />
            </button>
          </div>
        </div>

        <!-- Sign up/in Button for Guest -->
        <div class="right-4 top-4 absolute">
          <van-button
            class="!text-gray-800 !px-6 !border-0 !rounded-full !bg-white/90"
            size="small"
          >
            Sign up/ in
          </van-button>
        </div>
      </div>

      <!-- User Details -->
      <div class="px-6 pt-12">
        <h2 class="text-gray-900 font-semibold mb-1">
          {{ authStore.userBalance?.nickName || authStore.userBalance?.userName || 'User' }}
        </h2>

        <!-- Points Section -->
        <div class="mb-6 flex items-center">
          <van-icon name="tosepay" class="text-yellow-500 mr-2" />
          <span class="text-gray-900 font-semibold">
            {{ authStore.userBalance?.balance || '0' }}
          </span>
          <span class="text-gray-600 ml-1">POINTS</span>
          <van-icon name="arrow" class="text-gray-400 ml-2" />
        </div>

        <!-- Stats Row -->
        <div class="mb-6 flex items-center justify-between">
          <div
            v-for="(stat, index) in userStats"
            :key="stat.label"
            class="text-center"
            :class="{ 'flex-1': index < userStats.length - 1 }"
          >
            <div class="text-gray-900 font-semibold mb-1">
              {{ stat.value }}
            </div>
            <div class="text-gray-600">
              {{ stat.label }}
            </div>
          </div>
        </div>

        <!-- Action Buttons Row -->
        <div class="mb-6 flex gap-4 items-center">
          <van-button
            class="!text-gray-700 !border-0 !rounded-lg !bg-gray-100 !flex-1 !h-10"
            icon="scan"
          >
            <van-icon name="scan" class="mr-2" />
          </van-button>

          <van-button
            class="!text-gray-700 !border-0 !rounded-lg !bg-gray-100 !flex-1 !h-10"
            icon="share"
          >
            <van-icon name="share" class="mr-2" />
          </van-button>

          <van-button
            class="!text-gray-700 !border-0 !rounded-lg !bg-gray-100 !flex-1 !h-10"
            icon="ellipsis"
          >
            <van-icon name="ellipsis" class="mr-2" />
          </van-button>
        </div>

        <!-- Story Types Tabs -->
        <div class="border-b border-gray-200 flex items-center">
          <div
            v-for="type in storyTypes"
            :key="type.label"
            class="py-3 text-center flex-1 relative"
          >
            <button
              class="font-medium"
              :class="type.active ? 'text-purple-600' : 'text-gray-600'"
            >
              {{ type.label }} {{ type.count }}
            </button>
            <div
              v-if="type.active"
              class="rounded-full bg-purple-600 h-0.5 w-8 bottom-0 left-1/2 absolute -translate-x-1/2"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Guest State -->
    <div v-else class="pb-4 bg-white">
      <!-- Guest Background -->
      <div class="h-48 relative overflow-hidden from-gray-200 to-gray-300 bg-gradient-to-br">
        <div class="opacity-30 inset-0 absolute from-purple-400 to-orange-300 via-pink-300 bg-gradient-to-br">
          <div class="inset-0 absolute" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px);" />
        </div>
      </div>

      <!-- Guest Avatar -->
      <div class="left-6 absolute -mt-8">
        <div class="relative">
          <div class="border-4 border-white rounded-full bg-gray-200 flex h-20 w-20 items-center justify-center overflow-hidden">
            <van-icon name="user-o" class="text-gray-400" />
          </div>
          <button class="rounded-full bg-purple-500 flex h-7 w-7 items-center justify-center absolute -bottom-1 -right-1">
            <van-icon name="plus" class="text-white" />
          </button>
        </div>
      </div>

      <!-- Sign up/in Button -->
      <div class="px-6 pt-12">
        <van-button
          class="!text-white !font-medium !px-8 !border-0 !rounded-full !bg-purple-600 !h-12"
          @click="handleLogin"
        >
          Sign up/ in
        </van-button>

        <!-- Guest Stats -->
        <div class="mb-6 mt-8 flex items-center justify-between">
          <div class="text-center flex-1">
            <div class="text-gray-900 font-semibold mb-1">
              0
            </div>
            <div class="text-gray-600">
              Posts
            </div>
          </div>
          <div class="text-center flex-1">
            <div class="text-gray-900 font-semibold mb-1">
              0
            </div>
            <div class="text-gray-600">
              Likes
            </div>
          </div>
          <div class="text-center flex-1">
            <div class="text-gray-900 font-semibold mb-1">
              0
            </div>
            <div class="text-gray-600">
              Appointments
            </div>
          </div>
        </div>

        <!-- Guest Story Types -->
        <div class="border-b border-gray-200 flex items-center">
          <div class="py-3 text-center flex-1 relative">
            <button class="text-purple-600 font-medium">
              Stories 0
            </button>
            <div class="rounded-full bg-purple-600 h-0.5 w-8 bottom-0 left-1/2 absolute -translate-x-1/2" />
          </div>
          <div class="py-3 text-center flex-1">
            <button class="text-gray-600 font-medium">
              Articles 0
            </button>
          </div>
          <div class="py-3 text-center flex-1">
            <button class="text-gray-600 font-medium">
              Reels 0
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty Content -->
    <div class="py-16 flex flex-1 flex-col items-center justify-center">
      <div class="mb-4 rounded-lg bg-gray-100 flex h-24 w-24 items-center justify-center">
        <van-icon name="photo-o" class="text-gray-400" />
      </div>
      <p class="text-gray-500">
        There's nothing here.
      </p>
    </div>

    <!-- vConsole Button (if in development) -->
    <div class="bottom-20 right-4 fixed">
      <van-button
        class="!text-white !border-0 !rounded-full !bg-green-500 !h-8 !w-20"
        size="small"
      >
        vConsole
      </van-button>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  min-height: 100vh;
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
