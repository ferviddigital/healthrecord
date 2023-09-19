import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'HealthRecord',
        short_name: 'HealthRecord',
        background_color: 'rgb(243, 244, 246)',
        theme_color: 'rgb(243, 244, 246)',
        start_url: '/dashboard?standalone=true'
      },
      icons: [
        {
          src: '/pwa-assets/pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: '/pwa-assets/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/pwa-assets/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'  
        },
        {
          src: '/pwa-assets/maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ],
      shortcuts: [
        {
          name: 'Add Measurement',
          url: '/measurements/add',
          description: 'Add new vital measurement'
        }
      ]
    })
  ],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version)
  }
})
