import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@docs': path.resolve(__dirname, 'docs'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@style': path.resolve(__dirname, 'src/assets/style'),
      '@router': path.resolve(__dirname, 'src/router'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: "@import '@style/index';"
      }
    }
  },
  plugins: [vue()],
  build: {
    minify: 'terser', 
  },
  server: {
    cors: true,
    open: true,
  },
})
