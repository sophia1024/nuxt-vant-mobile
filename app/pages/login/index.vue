<script setup lang="ts">
import { useAuthInteractions } from '~/composables/auth'
import { COUNTRY_CODES, DEFAULT_COUNTRY } from '~/constants/auth'

definePageMeta({
  layout: 'default',
  name: 'Login',
})

useHead({
  title: 'Login HiSMK',
})

const { handleLogin, handleSendCaptcha } = useAuthInteractions()

// Form data
const formData = reactive({
  countryCode: DEFAULT_COUNTRY.code,
  emailAddress: '1029051@gmail.com',
  captchaCode: '4900',
  age: 21,
  evaluateType: 'scan_code',
  source: '',
})

// UI state
const loading = ref(false)
const sendingCaptcha = ref(false)
const showCountryPicker = ref(false)
const agreedToTerms = ref(false)
const agreedToRegister = ref(false)
const showVerificationCode = ref(false)

// Country picker data
const countryColumns = COUNTRY_CODES.map(country => ({
  text: `${country.flag} ${country.name}`,
  value: country.code,
  code: country.code,
}))

const selectedCountry = computed(() => {
  return COUNTRY_CODES.find(c => c.code === formData.countryCode) || DEFAULT_COUNTRY
})

// Send verification code
async function sendVerificationCode() {
  if (!formData.emailAddress) {
    showFailToast('Please enter email address')
    return
  }

  sendingCaptcha.value = true
  try {
    await handleSendCaptcha(formData.emailAddress)
    showVerificationCode.value = true
  }
  catch {
    // Error already handled in composable
  }
  finally {
    sendingCaptcha.value = false
  }
}

// Handle country selection
function onCountryConfirm(value: any) {
  formData.countryCode = value.selectedOptions[0]?.code || DEFAULT_COUNTRY.code
  showCountryPicker.value = false
}

// Submit login form
async function submitLogin() {
  if (!formData.emailAddress) {
    showFailToast('Please enter email address')
    return
  }

  if (!formData.captchaCode) {
    showFailToast('Please enter verification code')
    return
  }

  if (!agreedToTerms.value) {
    showFailToast('Please agree to Terms of service and Privacy Policy')
    return
  }

  if (!agreedToRegister.value) {
    showFailToast('Please agree to register as a user')
    return
  }

  loading.value = true
  try {
    await handleLogin({
      emailAddress: formData.emailAddress,
      captchaCode: formData.captchaCode,
      evaluateType: formData.evaluateType,
      isoCountryCode: formData.countryCode,
      age: formData.age,
      source: formData.source,
    })
  }
  catch {
    // Error already handled in composable
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page min-h-screen relative overflow-hidden">
    <!-- Background with blue smoke effect -->
    <div class="inset-0 absolute from-blue-900 to-purple-900 via-blue-800 bg-gradient-to-br">
      <!-- Smoke effect overlay -->
      <div class="opacity-60 inset-0 absolute">
        <div class="rounded-full bg-blue-300 opacity-30 h-32 w-32 left-10 top-20 absolute animate-pulse blur-3xl filter" />
        <div class="rounded-full bg-purple-300 opacity-20 h-24 w-24 right-5 top-40 absolute animate-pulse blur-3xl filter" style="animation-delay: 1s" />
        <div class="rounded-full bg-blue-200 opacity-25 h-40 w-40 bottom-40 left-5 absolute animate-pulse blur-3xl filter" style="animation-delay: 2s" />
        <div class="rounded-full bg-purple-200 opacity-30 h-28 w-28 bottom-20 right-10 absolute animate-pulse blur-3xl filter" style="animation-delay: 0.5s" />
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-col min-h-screen relative z-10">
      <!-- Header -->
      <div class="p-4 pt-12 flex items-center justify-between">
        <van-button
          icon="arrow-left"
          class="!text-white !border-0 !bg-transparent"
          @click="$router.back()"
        />
      </div>

      <!-- Title Section -->
      <div class="px-6 pb-12 pt-8">
        <h1 class="text-white font-bold mb-3">
          Login HiSMK
        </h1>
        <p class="text-white/80">
          Sign in to redeem your points prizes!
        </p>
      </div>

      <!-- Form Section -->
      <div class="px-6 flex-1">
        <!-- Country Code and Email Input -->
        <div class="mb-6">
          <div class="rounded-2xl bg-white/95 flex shadow-lg items-center overflow-hidden">
            <!-- Country Code Selector -->
            <button
              class="px-4 py-4 border-r border-gray-200 flex items-center"
              @click="showCountryPicker = true"
            >
              <span class="text-lg mr-2">{{ selectedCountry.flag }}</span>
              <span class="text-gray-700 font-medium">{{ selectedCountry.code }}</span>
              <van-icon name="arrow-down" class="text-gray-500 ml-2" />
            </button>

            <!-- Email Input -->
            <div class="flex-1 relative">
              <input
                v-model="formData.emailAddress"
                type="email"
                placeholder="Email address"
                class="text-gray-800 px-4 py-4 outline-none bg-transparent w-full"
              >
              <button
                v-if="formData.emailAddress"
                class="rounded-full bg-gray-300 flex h-6 w-6 items-center right-3 top-1/2 justify-center absolute -translate-y-1/2"
                @click="formData.emailAddress = ''"
              >
                <van-icon name="cross" class="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <!-- Verification Code Input -->
        <div class="mb-6">
          <div class="rounded-2xl bg-white/95 flex shadow-lg items-center overflow-hidden">
            <input
              v-model="formData.captchaCode"
              type="text"
              placeholder="Verification code"
              maxlength="4"
              class="text-gray-800 px-4 py-4 outline-none bg-transparent flex-1"
            >
            <button
              v-if="formData.captchaCode"
              class="rounded-full bg-gray-300 flex h-6 w-6 items-center right-3 top-1/2 justify-center absolute -translate-y-1/2"
              @click="formData.captchaCode = ''"
            >
              <van-icon name="cross" class="text-gray-600" />
            </button>
          </div>
        </div>

        <!-- No verification code button -->
        <div class="mb-8 text-center">
          <button
            class="text-white/80 underline"
            :disabled="sendingCaptcha"
            @click="sendVerificationCode"
          >
            {{ sendingCaptcha ? 'Sending...' : 'No verification code' }}
          </button>
        </div>

        <!-- Agreement Checkboxes -->
        <div class="mb-8 space-y-4">
          <div class="flex items-start">
            <van-checkbox
              v-model="agreedToTerms"
              shape="square"
              class="mr-3"
            />
            <span class="text-white/90 leading-relaxed">
              I agree to
              <span class="underline">Terms of service</span>
              and
              <span class="underline">Policy Privacy</span>
            </span>
          </div>

          <div class="flex items-start">
            <van-checkbox
              v-model="agreedToRegister"
              shape="square"
              class="mr-3"
            />
            <span class="text-white/90 leading-relaxed">
              Login represents your agreement to register as a user
            </span>
          </div>
        </div>

        <!-- Sign In Button -->
        <van-button
          class="w-full !text-white !font-semibold !border-0 !rounded-2xl !h-14 !from-orange-400 !to-purple-600 !via-pink-500 !bg-gradient-to-r"
          :loading="loading"
          @click="submitLogin"
        >
          Sign In
        </van-button>
      </div>
    </div>

    <!-- Country Picker Popup -->
    <van-popup
      v-model:show="showCountryPicker"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        :columns="countryColumns"
        @confirm="onCountryConfirm"
        @cancel="showCountryPicker = false"
      />
    </van-popup>
  </div>
</template>

<style scoped>
.login-page {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #7c3aed 100%);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.1);
  }
}

.animate-pulse {
  animation: pulse 3s ease-in-out infinite;
}
</style>
