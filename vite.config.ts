import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      // '/api/v1':{
      //   target: 'https://api.supplier.deskit.ru/api/v1',
      //   changeOrigin: true,
      // },
      '/assets': {
        target: 'https://api.supplier.deskit.ru',
        changeOrigin: true,
      }
    }
  }
})
