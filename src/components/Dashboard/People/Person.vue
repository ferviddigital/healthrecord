<script setup>
import VitalChart from './VitalChart.vue';
import { computed } from 'vue';
import { people } from '../../../store/people';
import { measurements } from '../../../store/measurements';
import { vitals } from '../../../store/vitals';
import { useRoute } from 'vue-router';
import pluralize from 'pluralize';

const route = useRoute();

const personId = route.params.id;

const person = computed(() => {
  return people.value.find(person => person.id === personId);
});

const userMeasurements = computed(() => {
  return measurements.value.filter(measurement => measurement.personId === personId);
});

const trackedVitals = computed(() => {
  var vitalIds = userMeasurements.value.map(measurement => measurement.vitalId);
  vitalIds = Array.from(new Set(vitalIds));
  return vitals.value.filter(vital => vitalIds.includes(vital.id));
});

const vitalMeasurements = (vitalId) => {
  return userMeasurements.value.filter(measurement => measurement.vitalId === vitalId)
}
</script>

<template>
  <div>
    <div class="grid grid-flow-col items-start mb-10 p-4 pb-0 md:p-6 md:pb-0">
      <header>
        <h2 class="text-xl font-bold">{{ person.firstName + ' ' + person.lastName }}</h2>
        <p class="text-sm text-gray-500">Tracking {{ pluralize('measurement', userMeasurements.length, true) }} across {{ pluralize('vital', trackedVitals.length, true) }}.</p>
      </header>
    </div>
    <div class="grid grid-cols-2 grid-rows-2 gap-3 px-4 md:px-6">
      <div v-for="vital in trackedVitals" :key="vital.id" class="group bg-white shadow-sm border p-3 rounded-md cursor-pointer hover:shadow">
        <h3 class="font-semibold group-hover:text-indigo-600 mb-1">{{ vital.name }}</h3>
        <p class="text-gray-500 text-sm">{{ pluralize('measurement', vitalMeasurements(vital.id).length, true) }}</p>
        <VitalChart class="mt-3" :vital="vital" :measurements="vitalMeasurements(vital.id)"  />
      </div>
    </div>
  </div>
</template>
