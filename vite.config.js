import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: false,
      devOptions: {
        enabled: process.env.NODE_ENV === 'development' ? true : false,
        type: 'module'
      }
    })
  ],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version)
  }
})
