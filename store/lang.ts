import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'

export const useLangStore = defineStore('lang', () => {
  const language = ref<'zh-CN' | 'en-US'>('zh-CN')

  function setLanguage(lang: 'zh-CN' | 'en-US') {
    language.value = lang
  }

  return {
    language: readonly(language),
    setLanguage,
  }
})
