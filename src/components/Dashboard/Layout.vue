<script setup>
import { SquaresPlusIcon, UsersIcon, Cog8ToothIcon, Bars3Icon, XMarkIcon, HomeIcon, ChartBarIcon, HeartIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';
import { clear } from '../../helpers/storage'
import { useRouter } from 'vue-router';
import { record } from '../../store/record';

const router = useRouter();

const menuOpen = ref(false);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const logout = async () => {
  if (! confirm('Have you downloaded your health record?') ) {
    return router.push({ name: 'Settings' });
  }
  clear();
}
</script>

<template>
  <div v-if="record">
    <div class="dash-layout grid grid-rows-[min-content_auto] grid-cols-1 p-4 py-1 h-screen md:max-h-screen md:min-h-screen md:gap-6 md:py-4 md:pr-0 md:grid-rows-none md:grid-flow-col md:grid-cols-[200px_auto]">
      <div class="main-nav overflow-scroll md:overflow-visible items-center md:items-start z-20 justify-start md:justify-normal bg-gray-900 text-white p-4 py-2 rounded-3xl order-last fixed grid grid-flow-col self-start bottom-6 right-4 left-4 md:h-full md:sticky md:top-0 md:left-auto md:right-auto md:bottom-6 md:order-none md:rounded-xl md:py-6 gap-2 md:gap-4 md:grid-rows-[min-content_auto_min-content]">
        <h2 class="grid grid-flow-col items-center md:block self-start font-bold text-xl md:mb-3">
          <RouterLink class="grid grid-flow-col items-center md:justify-start gap-1 p-2 md:p-0" :to="{ name: 'Dashboard' }">
            <SquaresPlusIcon class="h-6 w-6 md:h-5 md:w-5"/> <span class="hidden md:inline">HealthRecord</span>
          </RouterLink>
        </h2>
        <nav @click="scrollToTop();">
          <ul class="grid gap-2 md:gap-2 grid-flow-col md:grid-flow-row">
            <li>
              <RouterLink 
                class="grid grid-flow-col gap-3 p-2 px-3 text-sm justify-start items-center rounded-md text-gray-400 hover:bg-gray-800 hover:text-white" 
                :to="{ name: 'Dashboard' }"
                active-class="bg-gray-700 text-white hover:bg-gray-700 active"
                exact-active-class="bg-gray-700 text-white exact-active"
              >
                <HomeIcon class="h-6 w-6 md:h-4 md:w-4" /> <span class="hidden md:inline">Dashboard</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink 
                class="grid grid-flow-col gap-3 p-2 px-3 text-sm justify-start items-center rounded-md text-gray-400 hover:bg-gray-800 hover:text-white" 
                :to="{ name: 'People' }"
                active-class="bg-gray-700 text-white hover:bg-gray-700 active"
                exact-active-class="bg-gray-700 text-white exact-active"
              >
                <UsersIcon class="h-6 w-6 md:h-4 md:w-4" /> <span class="hidden md:inline">People</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink 
                class="grid grid-flow-col gap-3 p-2 px-3 text-sm justify-start items-center rounded-md text-gray-400 hover:bg-gray-800 hover:text-white" 
                :to="{ name: 'Vitals' }"
                active-class="bg-gray-700 text-white hover:bg-gray-700 active"
                exact-active-class="bg-gray-700 text-white exact-active"
              >
                <HeartIcon class="h-6 w-6 md:h-4 md:w-4" /> <span class="hidden md:inline">Vitals</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink 
                class="grid grid-flow-col gap-3 p-2 px-3 text-sm justify-start items-center rounded-md text-gray-400 hover:bg-gray-800 hover:text-white" 
                :to="{ name: 'Measurements' }"
                active-class="bg-gray-700 text-white hover:bg-gray-700 active"
                exact-active-class="bg-gray-700 text-white exact-active"
              >
                <ChartBarIcon class="h-6 w-6 md:h-4 md:w-4" /> <span class="hidden md:inline">Measurements</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink 
                class="grid grid-flow-col gap-3 p-2 px-3 text-sm justify-start items-center rounded-md text-gray-400 hover:bg-gray-800 hover:text-white" 
                :to="{ name: 'Settings' }"
                active-class="bg-gray-700 text-white hover:bg-gray-700 active"
                exact-active-class="bg-gray-700 text-white exact-active"
              >
                <Cog8ToothIcon class="h-6 w-6 md:h-4 md:w-4" /> <span class="hidden md:inline">Settings</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
        <nav class="hidden md:mb-0 md:ml-3 md:block" @click="menuOpen = menuOpen ? false : true">
          <button class="w-full text-sm text-gray-500 grid grid-flow-col p-2 pl-0 md:p-0 gap-3 items-center justify-start" @click.prevent="logout">
            <ArrowRightOnRectangleIcon class="h-6 w-6 md:h-4 md:w-4" /> <span class="hidden md:inline">Logout</span>
          </button>
        </nav>
      </div>
      <div class="grid grid-cols-1 md:overflow-y-scroll md:pr-4 md:pb-4 md:-mb-4">
        <RouterView name="main" />
      </div>
    </div>
  </div>
</template>
