<script setup>
import { SquaresPlusIcon, UsersIcon, Cog8ToothIcon, Bars3Icon, XMarkIcon, HomeIcon, ChartBarIcon, HeartIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';
import { store as recordStore } from '../../store/record';
import { useRouter } from 'vue-router';

const router = useRouter();

const menuOpen = ref(false);

const scrollToTop = () => {
  window.scrollTo({ top: 0 });
}

const logout = () => {
  if (! confirm('Have you downloaded your health record?') ) {
    return router.push({ name: 'Settings' });
  }
  router.push({ name: 'Start' });
  recordStore.delete();
}
</script>

<template>
  <div>
    <div class="grid grid-rows-[min-content_auto] grid-cols-1 p-6 py-1 h-screen md:max-h-screen md:min-h-screen md:gap-6 md:p-4 md:pr-0 md:grid-rows-none md:grid-flow-col md:grid-cols-[200px_auto]">
      <div class="z-20 bg-gray-900 text-white p-4 py-3 rounded-3xl order-last fixed grid self-start bottom-6 right-6 left-6 md:h-full md:sticky md:top-0 md:left-auto md:right-auto md:bottom-6 md:order-none md:rounded-xl md:py-6 md:gap-4 md:grid-rows-[min-content_auto_min-content]">
        <h2 class="grid order-last md:order-first grid-flow-col items-center md:block self-start font-bold text-xl md:mb-3">
          <RouterLink class="grid grid-flow-col items-center justify-start gap-1" :to="{ name: 'Dashboard' }">
            <SquaresPlusIcon class="h-5 w-5 stroke-2"/> HealthRecord
          </RouterLink>
          <Bars3Icon v-if="!menuOpen" @click="menuOpen = true" class="h-7 w-7 md:hidden justify-self-end" />
          <XMarkIcon v-else @click="menuOpen = false" class="h-7 w-7 md:hidden justify-self-end" />
        </h2>
        <nav class="mt-3 mb-4 md:mb-0 md:mt-0 md:block" :class="{ 'block': menuOpen, 'hidden': !menuOpen }" @click="menuOpen = menuOpen ? false : true; scrollToTop();">
          <ul class="grid gap-2">
            <li>
              <RouterLink 
                class="grid grid-flow-col gap-3 p-2 px-3 text-sm justify-start items-center rounded-md text-gray-300 hover:bg-gray-800 hover:text-white" 
                :to="{ name: 'Dashboard' }"
                active-class="bg-gray-700 text-white hover:bg-gray-700 active"
                exact-active-class="bg-gray-700 text-white exact-active"
              >
                <HomeIcon class="h-4 w-4" /> Dashboard
              </RouterLink>
            </li>
            <li>
              <RouterLink 
                class="grid grid-flow-col gap-3 p-2 px-3 text-sm justify-start items-center rounded-md text-gray-300 hover:bg-gray-800 hover:text-white" 
                :to="{ name: 'People' }"
                active-class="bg-gray-700 text-white hover:bg-gray-700 active"
                exact-active-class="bg-gray-700 text-white exact-active"
              >
                <UsersIcon class="h-4 w-4" /> People
              </RouterLink>
            </li>
            <li>
              <RouterLink 
                class="grid grid-flow-col gap-3 p-2 px-3 text-sm justify-start items-center rounded-md text-gray-300 hover:bg-gray-800 hover:text-white" 
                :to="{ name: 'Vitals' }"
                active-class="bg-gray-700 text-white hover:bg-gray-700 active"
                exact-active-class="bg-gray-700 text-white exact-active"
              >
                <HeartIcon class="h-4 w-4" /> Vitals
              </RouterLink>
            </li>
            <li>
              <RouterLink 
                class="grid grid-flow-col gap-3 p-2 px-3 text-sm justify-start items-center rounded-md text-gray-300 hover:bg-gray-800 hover:text-white" 
                :to="{ name: 'Measurements' }"
                active-class="bg-gray-700 text-white hover:bg-gray-700 active"
                exact-active-class="bg-gray-700 text-white exact-active"
              >
                <ChartBarIcon class="h-4 w-4" /> Measurements
              </RouterLink>
            </li>
            <li>
              <RouterLink 
                class="grid grid-flow-col gap-3 p-2 px-3 text-sm justify-start items-center rounded-md text-gray-300 hover:bg-gray-800 hover:text-white" 
                :to="{ name: 'Settings' }"
                active-class="bg-gray-700 text-white hover:bg-gray-700 active"
                exact-active-class="bg-gray-700 text-white exact-active"
              >
                <Cog8ToothIcon class="h-4 w-4" /> Settings
              </RouterLink>
            </li>
          </ul>
        </nav>
        <nav class="ml-3 mb-9 md:mb-0 md:ml-3 md:block" :class="{ 'block': menuOpen, 'hidden': !menuOpen }" @click="menuOpen = menuOpen ? false : true">
          <button class="w-full text-sm text-gray-300 grid grid-flow-col gap-3 items-center justify-start" @click.prevent="logout">
            <ArrowRightOnRectangleIcon class="h-4 w-4" /> Logout
          </button>
        </nav>
      </div>
      <div class="grid grid-cols-1 md:overflow-y-scroll md:pr-4 md:pb-4 md:-mb-4">
        <RouterView name="main" />
      </div>
    </div>
  </div>
</template>
