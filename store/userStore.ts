import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref('')

  function setToken(newToken: string) {
    token.value = newToken
  }

  function clearToken() {
    token.value = ''
  }

  return {
    token: readonly(token),
    setToken,
    clearToken,
  }
})
