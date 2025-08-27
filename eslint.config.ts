import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default nuxt(
  await antfu({
    unocss: true,
    formatters: true,
    ignores: [
      '*.md',
      '**/*.md',
      '.nuxt/**',
      '.output/**',
      'dist/**',
      'node_modules/**',
      '.env*',
      '*.config.*',
    ],
  }),
)
