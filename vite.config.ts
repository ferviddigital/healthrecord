import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: process.env.NODE_ENV === 'development' ? true : false,
        type: 'module',
      },
      useCredentials: true,
      manifest: {
        id: 'digital.fervid.healthrecord',
        name: 'HealthRecord',
        short_name: 'HealthRecord',
        description: 'Record, track, and visualize your personal health data.',
        start_url: '/',
        display: 'standalone',
        display_override: ['standalone', 'fullscreen'],
        orientation: 'portrait-primary',
        lang: 'en',
        scope: '/',
        background_color: 'rgb(229, 231, 235)',
        theme_color: 'rgb(229, 231, 235)',
        launch_handler: {
          client_mode: 'navigate-existing',
        },
        categories: ['medical', 'health', 'utilities'],
        icons: [
          {
            src: '/assets/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/assets/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/assets/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/assets/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  resolve: {
    alias: {
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@project-types': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
    },
  },
});
