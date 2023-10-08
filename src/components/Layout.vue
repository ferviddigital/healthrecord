<script setup>
import { SquaresPlusIcon, UsersIcon, Cog8ToothIcon, HomeIcon, ChartBarIcon, HeartIcon } from '@heroicons/vue/20/solid';
import { record } from '../store/record';
import { peers, webrtcConnected } from '../providers/webrtc';
import pluralize from 'pluralize';
import { store as preferencesStore } from '../store/preferences';
</script>

<template>
  <div>
    <div class="dash-layout grid grid-rows-[min-content_auto] sm:grid-rows-none sm:grid-flow-col sm:grid-cols-[min-content_auto] sm:gap-6 min-h-screen sm:min-h-0 m-4 mb-0 sm:mb-4 mt-0 sm:mt-4">
      <header class="main-header sticky grid grid-flow-col sm:grid-rows-[min-content_auto_min-content] gap-2 sm:gap-4 overflow-scroll sm:overflow-visible sm:min-h-[calc(100vh-2em)] items-center sm:items-start justify-start sm:justify-normal order-last sm:order-none self-end sm:self-start p-4 py-2 sm:py-6 bottom-6 md:bottom-auto left-4 sm:left-auto right-4 sm:right-auto sm:top-4 rounded-3xl bg-gray-900 text-white z-20">
        <h2 class="app-title grid grid-flow-col items-center sm:block self-start font-bold text-xl lg:mb-3 transition-all">
          <RouterLink
            class="grid grid-flow-col items-center sm:justify-start gap-1 sm:gap-4 p-2 sm:p-0 sm:px-3"
            :to="{ name: 'Dashboard' }"
            aria-label="Dashboard"
          >
            <SquaresPlusIcon class="h-6 w-6"/> <span>HealthRecord</span>
          </RouterLink>
        </h2>
        <nav class="main-nav">
          <ul class="grid gap-2 sm:gap-4 grid-flow-col sm:grid-flow-row">
            <li>
              <RouterLink 
                :to="{ name: 'Dashboard' }"
                aria-label="Dashboard"
              >
                <HomeIcon class="h-6 w-6" /> <span>Dashboard</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink 
                :to="{ name: 'People' }"
                aria-label="People"
              >
                <UsersIcon class="h-6 w-6" /> <span>People</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink 
                :to="{ name: 'Vitals' }"
                aria-label="Vitals"
              >
                <HeartIcon class="h-6 w-6" /> <span>Vitals</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink 
                :to="{ name: 'Measurements' }"
                aria-label="Measurements"
              >
                <ChartBarIcon class="h-6 w-6" /> <span>Measurements</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
        <nav class="main-nav">
          <ul>
            <li>
              <RouterLink 
              class="group"
                :to="{ name: 'Settings' }"
                aria-label="Settings"
              >
                  <span>
                    <span 
                      v-if="preferencesStore.webRTC.enabled && webrtcConnected"
                      class="h-3 w-3 inline-block bg-orange-300 rounded-full absolute border-2 border-gray-900 group-hover:border-gray-800"
                      :class="{ '!bg-green-500' : peers > 0 }"
                      :title="peers > 0 ? pluralize('peer', peers, true) + ' connected' : 'Waiting for peers...'"
                    ></span>
                    <Cog8ToothIcon class="h-6 w-6" />
                  </span>
                  <span class="hidden md:inline">Settings</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </header>
      <main class="grid">
        <RouterView name="main" />
      </main>
    </div>
  </div>
</template>
