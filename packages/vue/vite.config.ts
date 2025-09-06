import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'BaselineBannerVue',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue', '@baseline-banner/core'],
      output: {
        globals: {
          vue: 'Vue',
          '@baseline-banner/core': 'BaselineBannerCore'
        }
      }
    },
    cssCodeSplit: false
  }
})
