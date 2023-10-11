<script setup>
import { SquaresPlusIcon, Cog8ToothIcon, HomeIcon, ChartBarIcon, HeartIcon, UserIcon } from '@heroicons/vue/20/solid';
import { record } from '../store/record';
import { peers, webrtcConnected } from '../providers/webrtc';
import pluralize from 'pluralize';
import { scrolled } from '../store/ui';
import { selectedPersonId } from '../store/person';

window.addEventListener('scroll', () => {
  scrolled.value = window.scrollY > 0;
});

</script>

<template>
  <div v-if="record">
    <div class="dash-layout grid grid-rows-[auto_min-content] sm:grid-rows-none sm:grid-flow-col sm:grid-cols-[min-content_auto] min-h-screen sm:min-h-0">
      <header
        class="main-header sticky grid grid-flow-col sm:grid-rows-[min-content_auto_min-content] gap-2 sm:gap-4 overflow-scroll sm:overflow-visible sm:min-h-[calc(100vh-2rem)] items-center sm:items-start sm:justify-normal order-last sm:order-none self-end sm:self-start p-4 py-2 sm:py-6 bottom-6 md:bottom-auto mb-4 sm:mb-auto mr-4 sm:mr-0 ml-4 mt-4 top-4 rounded-3xl bg-gray-900 text-white z-20">
        <h2 class="app-title grid grid-flow-col items-center sm:block self-start font-bold text-xl lg:mb-3 transition-all">
          <RouterLink
            class="grid grid-flow-col items-center sm:justify-start gap-1 sm:gap-4 p-2 sm:p-0 sm:px-3"
            :to="{ name: 'Dashboard' }"
            aria-label="Dashboard"
          >
            <SquaresPlusIcon class="h-6 w-6"/> <span class="hidden lg:inline">HealthRecord</span>
          </RouterLink>
        </h2>
        <nav class="main-nav">
          <ul v-if="selectedPersonId" class="grid gap-2 sm:gap-4 grid-flow-col sm:grid-flow-row">
            <li>
              <RouterLink 
                :to="{ name: 'Person', params: { personId: selectedPersonId } }"
                aria-label="Person"
              >
                <UserIcon class="h-6 w-6" /> <span>Overview</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink 
                :to="{ name: 'PersonVitals', params: { personId: selectedPersonId } }"
                aria-label="Vitals"
              >
                <HeartIcon class="h-6 w-6" /> <span>Vitals</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink 
                :to="{ name: 'PersonMeasurements', params: { personId: selectedPersonId } }"
                aria-label="Measurements"
              >
                <ChartBarIcon class="h-6 w-6" /> <span>Measurements</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
        <nav class="main-nav place-self-end sm:place-self-auto">
          <ul>
            <li>
              <RouterLink 
              class="group"
                :to="{ name: 'Settings' }"
                aria-label="Settings"
              >
                  <span>
                    <span 
                      v-if="record.user.preferences && record.user.preferences.webRTC.enabled && webrtcConnected"
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
      <main>
        <RouterView name="main" />
      </main>
    </div>
  </div>
</template>
