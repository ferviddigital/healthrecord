<script setup>
import { people } from '../../../store/people';
import { vitals } from '../../../store/vitals';
import { measurements } from '../../../store/measurements';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import pluralize from 'pluralize';
</script>

<template>
  <div >
    <div class="sticky top-0 pt-0 mt-0 pb-5 grid grid-flow-col items-start bg-gradient-to-b from-gray-200 from-90%">
      <header>
        <h2 class="text-2xl font-bold">Dashboard</h2>
        <p class="text-sm text-gray-500">HealthRecord data overview.</p>
      </header>
    </div>
    <div class="grid grid-rows-2 grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
      <div class="group grid grid-cols-[auto_min-content] min-h-[10em] bg-gray-50 p-3 rounded-xl cursor-pointer shadow-sm hover:shadow hover:bg-white transition-all" @click="$router.push({ name: 'People' })">
        <div class="grid">
          <h3 class="font-semibold mb-1">People</h3>
          <p class="text-gray-500 text-sm self-end">You are tracking {{ pluralize('person', people.length, true) }}.</p>
        </div>
        <ChevronRightIcon class="h-5 w-5 text-gray-400 group-hover:text-black transition-all" />
      </div>
      <div class="group grid grid-cols-[auto_min-content] bg-gray-50 p-3 rounded-xl cursor-pointer shadow-sm hover:shadow hover:bg-white transition-all" @click="$router.push({ name: 'Vitals' })">
        <div class="grid">
          <h3 class="font-semibold mb-1">Vitals</h3>
          <p class="text-gray-500 text-sm self-end">You are measuring {{ pluralize('vital', vitals.length, true) }}.</p>
        </div>
        <ChevronRightIcon class="h-5 w-5 text-gray-400 group-hover:text-black transition-all" />
      </div>
      <div class="group grid grid-cols-[auto_min-content] bg-gray-50 p-3 rounded-xl cursor-pointer shadow-sm hover:shadow hover:bg-white transition-all" @click="$router.push({ name: 'Measurements' })">
        <div class="grid">
          <h3 class="font-semibold mb-1">Measurements</h3>
          <p class="text-gray-500 text-sm self-end">You have recorded {{ pluralize('measurement', measurements.length, true) }}.</p>
        </div>
        <ChevronRightIcon class="h-5 w-5 text-gray-400 group-hover:text-black transition-all" />
      </div>
    </div>
  </div>
</template>
