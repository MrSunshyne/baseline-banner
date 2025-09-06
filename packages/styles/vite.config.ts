import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'src/index.css',
      output: {
        assetFileNames: 'index.css'
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0
  }
})
