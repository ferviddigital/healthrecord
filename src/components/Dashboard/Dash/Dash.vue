<script setup>
import { people } from '../../../store/people';
import { vitals } from '../../../store/vitals';
import { measurements } from '../../../store/measurements';
import pluralize from 'pluralize';
</script>

<template>
  <div>
    <div class="grid grid-flow-col items-start mb-10">
      <header>
        <h2 class="text-xl font-bold">Dashboard</h2>
        <p class="text-sm text-gray-500">HealthRecord data overview.</p>
      </header>
    </div>
    <div class="grid grid-cols-2 grid-rows-2 gap-3">
      <div class="group bg-white shadow-sm border p-3 rounded-md cursor-pointer hover:shadow" @click="$router.push({ name: 'People' })">
        <h3 class="font-semibold group-hover:text-indigo-600 mb-1">People</h3>
        <p class="text-gray-500 text-sm">You are tracking {{ pluralize('person', people.length, true) }}.</p>
      </div>
      <div class="group shadow-sm bg-white border p-3 rounded-md cursor-pointer hover:shadow" @click="$router.push({ name: 'Vitals' })">
        <h3 class="font-semibold group-hover:text-indigo-600 mb-1">Vitals</h3>
        <p class="text-gray-500 text-sm">You are measuring {{ pluralize('vital', vitals.length, true) }}.</p>
      </div>
      <div class="group shadow-sm bg-white border p-3 rounded-md cursor-pointer hover:shadow" @click="$router.push({ name: 'Measurements' })">
        <h3 class="font-semibold group-hover:text-indigo-600 mb-1">Measurements</h3>
        <p class="text-gray-500 text-sm">You have recorded {{ pluralize('measurement', measurements.length, true) }}.</p>
      </div>
    </div>
  </div>
</template>
