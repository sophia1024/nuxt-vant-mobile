import process from 'node:process'
import { appDescription } from './app/constants/index'
import preload from './app/utils/preload'
import { currentLocales } from './i18n/i18n'

// 获取环境代理配置
function getProxyConfig() {
  const env = process.env.NODE_ENV
  const isMock = process.env.NUXT_MOCK_ENABLED === 'true'

  // Mock模式不需要代理，直接使用本地server API
  if (isMock) {
    return ''
  }

  // 测试环境代理配置
  if (env === 'test') {
    return {
      '/api': {
        target: 'https://m.hismk.club/api',
        changeOrigin: true,
        pathRewrite: { '^/api/': '' },
      },
      '/obs': {
        target: 'https://m.hismk.club/obs',
        changeOrigin: true,
        pathRewrite: { '^/obs/': '' },
      },
    } as Record<string, any>
  }

  // 开发环境代理配置
  return {
    '/api': {
      target: 'http://192.168.232.180:51000/api',
      changeOrigin: true,
      pathRewrite: { '^/api/': '' },
    },
    '/md': {
      target: 'http://192.168.232.180:51000/md',
      changeOrigin: true,
      pathRewrite: { '^/md/': '' },
    },
  } as Record<string, any>
}

export default defineNuxtConfig({
  modules: [
    '@vant/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://192.168.232.180:51000',
      obsBase: process.env.NUXT_PUBLIC_OBS_BASE || 'http://192.168.232.180:51000',
      mdBase: process.env.NUXT_PUBLIC_MD_BASE || 'http://192.168.232.180:51000',
      mockEnabled: process.env.NUXT_MOCK_ENABLED === 'true',
      cdnHost: process.env.NUXT_PUBLIC_CDN_HOST || '',
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'nuxt-vant-mobile',
      appVersion: process.env.NUXT_PUBLIC_APP_VERSION || '0.6.0',
    },
  },

  css: [
    './app/styles/vars.css',
    './app/styles/global.css',
    './app/styles/default-theme.css',
  ],

  postcss: {
    plugins: {
      'autoprefixer': {},

      // https://github.com/wswmsword/postcss-mobile-forever
      'postcss-mobile-forever': {
        appSelector: '#__nuxt',
        viewportWidth: 375,
        maxDisplayWidth: 600,
        // devtools excluded
        exclude: /@nuxt/,
        border: true,
        // Need to convert fixed selector list
        rootContainingBlockSelectorList: [
          '.van-tabbar',
          '.van-popup',
          '.van-popup--bottom',
          '.van-popup--top',
          '.van-popup--left',
          '.van-popup--right',
        ],
      },
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'nuxt-color-mode',
  },

  i18n: {
    locales: currentLocales,
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
    },
    langDir: 'locales',
    defaultLocale: 'zh-CN',
    // Reletive to the i18n directory
    vueI18n: './i18n.config.ts',
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#ffffff' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
      script: [
        { innerHTML: preload(), type: 'text/javascript', tagPosition: 'head' },
      ],
    },
  },

  // Vite配置
  vite: {
    server: {
      proxy: getProxyConfig(),
    },
    build: {
      target: 'esnext',
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router'],
            'vant-vendor': ['vant'],
            'pinia-vendor': ['pinia'],
          },
        },
      },
    },
    optimizeDeps: {
      include: [
        '@intlify/core-base',
        '@intlify/shared',
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
    },
  },

  // Nitro构建配置
  nitro: {
    minify: process.env.NITRO_MINIFY === 'true',
    prerender: {
      crawlLinks: false,
      routes: ['/'],
    },
  },

  experimental: {
    typedPages: true,
  },

  devtools: {
    enabled: true,
  },

  typescript: {
    shim: false,
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  compatibilityDate: '2025-07-18',
})
