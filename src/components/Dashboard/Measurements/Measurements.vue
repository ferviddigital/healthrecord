<script setup>
import { PlusIcon } from '@heroicons/vue/24/solid';
import { QuestionMarkCircleIcon, LightBulbIcon } from '@heroicons/vue/24/outline';
import { measurements, store as measurementStore } from '../../../store/measurements';
import { vitals } from '../../../store/vitals';
import { people } from '../../../store/people';

const getVitalName = (vitalId) => {
  return vitals.value.find(vital => vital.id === vitalId).name;
}

const getVitalUnit = (vitalId) => {
  return vitals.value.find(vital => vital.id === vitalId).unit;
}

const getPersonName = (personId) => {
  return people.value.find(person => person.id === personId).firstName;
}

const getFormattedDate = (date) => {
  return new Date(date).toLocaleDateString();
}
</script>

<template>
  <div>
    <div class="grid grid-flow-col gap-3 items-start mb-10 p-4 pb-0 md:p-6 md:pb-0">
      <header>
        <h2 class="text-xl font-bold">Measurements</h2>
        <p class="text-sm text-gray-500">Add, edit, and delete measurements to record.</p>
      </header>
      <div class="grid justify-end">
        <RouterLink class="btn" :to="{ name: 'AddMeasurement' }">
          <PlusIcon /> Add
        </RouterLink>
      </div>
    </div>
    <div class="overflow-auto">
      <table v-if="measurements.length > 0" class="table-auto w-full">
        <thead class="text-left border-b-2">
          <tr>
            <th class="font-light uppercase text-xs text-gray-400 w-full p-2 pl-4 md:pl-6">Vital</th>
            <th class="font-light uppercase text-xs text-gray-400 p-2 py-1">Value</th>
            <th class="font-light uppercase text-xs text-gray-400 p-2 py-1">Person</th>
            <th class="font-light text-center uppercase text-xs text-gray-400 p-2 py-1">Date</th>
            <th colspan="2"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b even:bg-gray-100" v-for="measurement in measurements" :key="measurement.id">
            <td class="text-sm p-3 pl-4 md:pl-6">{{ getVitalName(measurement.vitalId) }}</td>
            <td class="text-sm p-3 text-gray-400 whitespace-nowrap">{{ Number(measurement.value).toLocaleString() + ' ' + getVitalUnit(measurement.vitalId) }}</td>
            <td class="text-sm p-3 text-gray-400"> <RouterLink class="text-indigo-600 hover:underline " :to="{ name: 'Person', params: { id: measurement.personId }}">{{ getPersonName(measurement.personId) }}</RouterLink></td>
            <td class="text-sm p-3 text-gray-400">{{ getFormattedDate(measurement.date) }}</td>
            <td class="p-3"><RouterLink class="text-indigo-600 hover:underline text-sm font-medium" :to="{ name: 'EditMeasurement', params: { id: measurement.id }}">Edit</RouterLink></td>
            <td class="p-3 pr-4 md:pr-6"><button class="text-indigo-600 hover:underline text-sm font-medium" @click.prevent="measurementStore.delete(measurement.id)">Delete</button></td>
          </tr>
        </tbody>
      </table>
      <div v-else class="mx-6 border border-amber-200 p-4 rounded-lg text-amber-500 bg-amber-100 text-sm">
        <p class="grid grid-flow-col grid-cols-[min-content_auto] items-center mb-4 pb-4 border-b border-amber-200">
          <QuestionMarkCircleIcon class="h-6 w-6 mr-3" />
          A Measurement is a recording of a specific person's Vital.
        </p>
        <p class="grid grid-flow-col grid-cols-[min-content_auto] items-center">
          <LightBulbIcon class="h-6 w-6 mr-3" />
          <span>You have not recorded any measurements. <RouterLink class="underline" :to="{ name: 'AddMeasurement' }">Add&nbsp;a&nbsp;measurement</RouterLink>.</span>
        </p>
      </div>
    </div>
  </div>
</template>
