import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
  },
  resolve: {
    alias: {
      '@baseline-banner/core': resolve(__dirname, './packages/core/src'),
      '@baseline-banner/react': resolve(__dirname, './packages/react/src'), 
      '@baseline-banner/vue': resolve(__dirname, './packages/vue/src'),
    }
  },
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
  }
})
