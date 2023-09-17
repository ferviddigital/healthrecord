<script setup>
import { PlusIcon } from '@heroicons/vue/24/solid';
import { QuestionMarkCircleIcon, LightBulbIcon } from '@heroicons/vue/24/outline';
import { vitals, store as vitalStore, addBodyWeightVital, addHeartRateVital } from '../../../store/vitals';
</script>

<template>
  <div>
    <div class="grid grid-flow-col gap-3 items-start mb-10 p-4 pb-0 md:p-6 md:pb-0">
      <header>
        <h2 class="text-xl font-bold">Vitals</h2>
        <p class="text-sm text-gray-500">Add, edit, and delete vitals to measure.</p>
      </header>
      <div class="grid justify-end">
        <RouterLink class="btn" :to="{ name: 'AddVital' }">
          <PlusIcon /> Add
        </RouterLink>
      </div>
    </div>
    <div class="overflow-auto">
      <table v-if="vitals.length > 0" class="table-auto w-full">
        <thead class="text-left border-b-2">
          <tr>
            <th class="font-light uppercase text-xs text-gray-400 w-full p-2 pl-4 md:pl-6">Name</th>
            <th class="font-light uppercase text-xs text-gray-400 p-2 py-1">Unit</th>
            <th class="font-light uppercase text-xs text-gray-400 p-2 py-1 text-center">High</th>
            <th class="font-light uppercase text-xs text-gray-400 p-2 py-1 text-center">Low</th>
            <th colspan="2"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b even:bg-gray-100" v-for="vital in vitals" :key="vital.id">
            <td class="text-sm p-3 pl-4 md:pl-6">{{ vital.name }} <span class="block text-xs text-gray-400">{{ vital.description }}</span></td>
            <td class="text-sm p-3 text-gray-400">{{ vital.unit }}</td>
            <td class="text-sm p-3 text-center text-gray-400">{{ vital.high }}</td>
            <td class="text-sm p-3 text-center text-gray-400">{{ vital.low }}</td>
            <td class="p-3"><RouterLink class="text-indigo-600 hover:underline text-sm font-medium" :to="{ name: 'EditVital', params: { id: vital.id }}">Edit</RouterLink></td>
            <td class="p-3 pr-4 md:pr-6"><button class="text-indigo-600 hover:underline text-sm font-medium" @click.prevent="vitalStore.delete(vital.id)">Delete</button></td>
          </tr>
        </tbody>
      </table>
      <div v-else class="mx-6 border border-amber-200 p-4 rounded-lg text-amber-500 bg-amber-100 text-sm">
        <p class="grid grid-flow-col items-center grid-cols-[min-content_auto] mb-4 pb-4 border-b border-amber-200">
          <QuestionMarkCircleIcon class="h-6 w-6 mr-4" />
          A Vital is a metric that can be measured like heart rate, body weight, or a lab result.
        </p>
        <p class="grid grid-flow-col grid-cols-[min-content_auto] items-center">
          <LightBulbIcon class="h-6 w-6 mr-3" />
          <span>You are not measuring any vitals. <RouterLink class="underline" :to="{ name: 'AddVital' }">Add&nbsp;a&nbsp;vital</RouterLink> or start with <span class="underline cursor-pointer" @click="addBodyWeightVital()">body weight</span> or <span class="underline cursor-pointer" @click="addHeartRateVital()">heart rate</span>.</span>
        </p>
      </div>
    </div>
  </div>
</template>
