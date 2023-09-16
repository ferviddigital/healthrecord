<script setup>
import { PlusIcon } from '@heroicons/vue/24/solid';
import { vitals, store as vitalStore } from '../../../store/vitals';
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
            <td class="p-3"><RouterLink class="text-indigo-800 hover:underline text-sm font-medium" :to="{ name: 'EditVital', params: { id: vital.id }}">Edit</RouterLink></td>
            <td class="p-3 pr-4 md:pr-6"><button class="text-indigo-800 hover:underline text-sm font-medium" @click.prevent="vitalStore.delete(vital.id)">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
