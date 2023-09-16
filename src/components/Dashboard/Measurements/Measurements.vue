<script setup>
import { PlusIcon } from '@heroicons/vue/24/solid';
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
    <div class="grid grid-flow-col gap-3 items-start mb-10">
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
            <th class="font-light text-sm text-gray-400 w-full p-2 py-2">Vital</th>
            <th class="font-light text-sm text-gray-400 p-2 py-2">Value</th>
            <th class="font-light text-sm text-gray-400 p-2 py-2 text-center">Person</th>
            <th class="font-light text-sm text-gray-400 p-2 py-2 text-center">Date</th>
            <th colspan="2"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b even:bg-gray-100" v-for="measurement in measurements" :key="measurement.id">
            <td class="p-2 py-3">{{ getVitalName(measurement.vitalId) }}</td>
            <td class="text-sm p-2 py-3 text-gray-400 whitespace-nowrap">{{ Number(measurement.value).toLocaleString() + ' ' + getVitalUnit(measurement.vitalId) }}</td>
            <td class="text-sm p-2 py-3 text-center text-gray-400"> <RouterLink class="text-indigo-800 hover:underline " :to="{ name: 'Person', params: { id: measurement.personId }}">{{ getPersonName(measurement.personId) }}</RouterLink></td>
            <td class="text-sm p-2 py-3 text-center text-gray-400">{{ getFormattedDate(measurement.date) }}</td>
            <td class="p-2 py-3"><RouterLink class="text-indigo-800 hover:underline text-sm font-medium" :to="{ name: 'EditMeasurement', params: { id: measurement.id }}">Edit</RouterLink></td>
            <td class="p-2 py-3"><button class="text-indigo-800 hover:underline text-sm font-medium" @click.prevent="measurementStore.delete(measurement.id)">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
