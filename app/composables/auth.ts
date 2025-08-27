import type { UserBalance, UserInfo, UserStatistics } from '~/constants/auth'
import { defineStore } from 'pinia'
import {
  checkLoginStatus,
  getUserBalance,
  getUserInfo,
  getUserStatistics,
  registerUser,
  sendEmailCaptcha,
} from '~/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const token = ref('')
  const userInfo = ref<UserInfo | null>(null)
  const userBalance = ref<UserBalance | null>(null)
  const userStatistics = ref<UserStatistics | null>(null)
  const loading = ref(false)

  // Check login status
  async function checkLogin() {
    try {
      const response = await checkLoginStatus()
      isLoggedIn.value = response.data.hasLogin

      // If logged in, fetch user data
      if (isLoggedIn.value) {
        await Promise.all([
          fetchUserInfo(),
          fetchUserBalance(),
          fetchUserStatistics(),
        ])
      }
    }
    catch (error) {
      console.error('Failed to check login status:', error)
      isLoggedIn.value = false
    }
  }

  // Send captcha
  async function sendCaptcha(email: string) {
    try {
      const response = await sendEmailCaptcha(email)
      return response.data
    }
    catch (error) {
      console.error('Failed to send captcha:', error)
      throw error
    }
  }

  // Register/Login user
  async function login(params: {
    emailAddress: string
    captchaCode: string
    evaluateType: string
    isoCountryCode: string
    age: number
    source?: string
  }) {
    loading.value = true
    try {
      const response = await registerUser(params)
      const authData = response.data

      // Store token
      token.value = authData.access_token
      isLoggedIn.value = true

      // Store token in localStorage for persistence
      if (import.meta.client) {
        localStorage.setItem('token', authData.access_token)
      }

      // Fetch user data after successful login
      await Promise.all([
        fetchUserInfo(),
        fetchUserBalance(),
        fetchUserStatistics(),
      ])

      return authData
    }
    catch (error) {
      console.error('Failed to login:', error)
      throw error
    }
    finally {
      loading.value = false
    }
  }

  // Logout user
  function logout() {
    isLoggedIn.value = false
    token.value = ''
    userInfo.value = null
    userBalance.value = null
    userStatistics.value = null

    if (import.meta.client) {
      localStorage.removeItem('token')
    }
  }

  // Fetch user info
  async function fetchUserInfo() {
    try {
      const response = await getUserInfo()
      userInfo.value = response.data
    }
    catch (error) {
      console.error('Failed to fetch user info:', error)
    }
  }

  // Fetch user balance
  async function fetchUserBalance() {
    try {
      const response = await getUserBalance()
      userBalance.value = response.data
    }
    catch (error) {
      console.error('Failed to fetch user balance:', error)
    }
  }

  // Fetch user statistics
  async function fetchUserStatistics() {
    try {
      const response = await getUserStatistics()
      userStatistics.value = response.data
    }
    catch (error) {
      console.error('Failed to fetch user statistics:', error)
    }
  }

  // Initialize auth state from localStorage
  function initializeAuth() {
    if (import.meta.client) {
      const savedToken = localStorage.getItem('token')
      if (savedToken) {
        token.value = savedToken
        checkLogin()
      }
    }
  }

  return {
    isLoggedIn,
    token,
    userInfo,
    userBalance,
    userStatistics,
    loading,
    checkLogin,
    sendCaptcha,
    login,
    logout,
    fetchUserInfo,
    fetchUserBalance,
    fetchUserStatistics,
    initializeAuth,
  }
}, {
  persist: true,
})

// Auth interaction composables
export function useAuthInteractions() {
  const store = useAuthStore()
  const router = useRouter()

  const handleLogin = async (loginData: {
    emailAddress: string
    captchaCode: string
    evaluateType: string
    isoCountryCode: string
    age: number
    source?: string
  }) => {
    try {
      await store.login(loginData)
      showSuccessToast('Login successful!')
      // Navigate to profile page after login
      await router.push('/profile')
    }
    catch (error) {
      showFailToast('Login failed. Please try again.')
      throw error
    }
  }

  const handleLogout = () => {
    store.logout()
    showToast('Logged out successfully')
    // Navigate to home page after logout
    router.push('/')
  }

  const handleSendCaptcha = async (email: string) => {
    try {
      const captcha = await store.sendCaptcha(email)
      showSuccessToast('Verification code sent!')
      return captcha
    }
    catch (error) {
      showFailToast('Failed to send verification code')
      throw error
    }
  }

  return {
    handleLogin,
    handleLogout,
    handleSendCaptcha,
  }
}
