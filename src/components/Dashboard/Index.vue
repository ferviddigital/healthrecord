<script setup>
import { SquaresPlusIcon, UsersIcon, Cog8ToothIcon, Bars3Icon, XMarkIcon, HomeIcon, ChartBarIcon, HeartIcon } from '@heroicons/vue/24/outline';
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';
import { store as recordStore } from '../../store/record';
import { useRouter } from 'vue-router';

const router = useRouter();

const menuOpen = ref(false);

const scrollToTop = () => {
  window.scrollTo({ top: 0 });
}

const logout = () => {
  recordStore.delete();
  router.push({ name: 'Start' });
}
</script>

<template>
  <div>
    <div class="md:grid md:grid-flow-col md:grid-cols-[200px_auto] bg-slate-50 h-screen">
      <div class="sticky top-0 bg-gray-900 text-white p-4 py-3 md:py-6 md:grid md:gap-4 md:grid-rows-[min-content_auto_min-content]">
        <h2 class="grid grid-flow-col items-center md:block self-start font-bold text-xl md:mb-3">
          <RouterLink class="grid grid-flow-col items-center justify-start gap-1" :to="{ name: 'Dash' }">
            <SquaresPlusIcon class="h-5 w-5 stroke-2"/> HealthRecord
          </RouterLink>
          <Bars3Icon v-if="!menuOpen" @click="menuOpen = true" class="h-7 w-7 md:hidden justify-self-end" />
          <XMarkIcon v-else @click="menuOpen = false" class="h-7 w-7 md:hidden justify-self-end" />
        </h2>
        <nav class="mt-3 mb-3 md:mb-0 md:mt-0 md:block" :class="{ 'block': menuOpen, 'hidden': !menuOpen }" @click="menuOpen = menuOpen ? false : true; scrollToTop();">
          <ul class="grid gap-2">
            <li>
              <RouterLink 
                class="grid grid-flow-col gap-3 p-2 px-3 text-sm justify-start items-center rounded-md text-gray-300 hover:bg-gray-800 hover:text-white" 
                :to="{ name: 'Dash' }"
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
        <nav class="ml-3 mb-3 md:mb-0 md:ml-0 md:block" :class="{ 'block': menuOpen, 'hidden': !menuOpen }">
          <button class="text-sm text-gray-300 grid grid-flow-col gap-3 items-center" @click.prevent="logout">
            <ArrowRightOnRectangleIcon class="h-4 w-4" /> Logout
          </button>
        </nav>
      </div>
      <div class="col-span-3 p-4 md:p-6 bg-gray-50">
        <RouterView name="main" />
      </div>
    </div>
    <RouterView name="modal" />
  </div>
</template>
