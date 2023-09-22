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
    <div class="grid md:grid-cols-2 grid-rows-2 gap-3">
      <div class="group grid grid-cols-[auto_min-content] bg-white p-3 rounded-md cursor-pointer shadow-sm hover:shadow" @click="$router.push({ name: 'People' })">
        <div>
          <h3 class="font-semibold group-hover:text-indigo-600 mb-1">People</h3>
          <p class="text-gray-500 text-sm">You are tracking {{ pluralize('person', people.length, true) }}.</p>
        </div>
        <ChevronRightIcon class="h-5 w-5 group-hover:stroke-indigo-600" />
      </div>
      <div class="group grid grid-cols-[auto_min-content] bg-white p-3 rounded-md cursor-pointer shadow-sm hover:shadow" @click="$router.push({ name: 'Vitals' })">
        <div>
          <h3 class="font-semibold group-hover:text-indigo-600 mb-1">Vitals</h3>
          <p class="text-gray-500 text-sm">You are measuring {{ pluralize('vital', vitals.length, true) }}.</p>
        </div>
        <ChevronRightIcon class="h-5 w-5 group-hover:stroke-indigo-600" />
      </div>
      <div class="group grid grid-cols-[auto_min-content] bg-white p-3 rounded-md cursor-pointer shadow-sm hover:shadow" @click="$router.push({ name: 'Measurements' })">
        <div>
          <h3 class="font-semibold group-hover:text-indigo-600 mb-1">Measurements</h3>
          <p class="text-gray-500 text-sm">You have recorded {{ pluralize('measurement', measurements.length, true) }}.</p>
        </div>
        <ChevronRightIcon class="h-5 w-5 group-hover:stroke-indigo-600" />
      </div>
    </div>
  </div>
</template>
