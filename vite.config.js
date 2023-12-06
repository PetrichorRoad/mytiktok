import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'src')
    }
  },
  server:{
    proxy:{
      '/api': {
        target: 'http://127.0.0.1:5500',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/my': {
        target: 'http://127.0.0.1:5500',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/my/, ''),
      },
    }
  }
})
