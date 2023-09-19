<script setup>
import { LightBulbIcon } from '@heroicons/vue/24/outline';
import { PlusIcon } from '@heroicons/vue/20/solid';
import VitalChart from './VitalChart.vue';
import { computed } from 'vue';
import { people } from '../../../store/people';
import { measurements } from '../../../store/measurements';
import { vitals, addBodyWeightVital, addHeartRateVital } from '../../../store/vitals';
import { useRoute } from 'vue-router';
import pluralize from 'pluralize';
import MeasurementListItem from '../Measurements/MeasurementListItem.vue';

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
    <div class="z-10 sticky top-0 pt-0 mt-0 pb-5 grid grid-flow-col items-start bg-gradient-to-b from-gray-100 from-90%">
      <header>
        <h2 class="text-2xl font-bold">{{ person.firstName + ' ' + person.lastName }}</h2>
        <p class="text-sm text-gray-500">{{ pluralize('measurement', userMeasurements.length, true) }} across {{ pluralize('vital', trackedVitals.length, true) }}.</p>
      </header>
      <div class="grid justify-end">
        <RouterLink class="group rounded-full hover:bg-gray-200" :to="{ name: 'AddPersonMeasurement' }">
          <PlusIcon class="group-hover:text-indigo-600 h-10 w-10" />
        </RouterLink>
      </div>
    </div>
    <div>
      <div v-if="trackedVitals.length > 0" class="grid md:grid-cols-2 gap-3">
        <div v-for="vital in trackedVitals" :key="vital.id" class="group bg-white p-3 rounded-md cursor-pointer hover:shadow">
          <h3 class="font-semibold group-hover:text-indigo-600 mb-1">{{ vital.name }}</h3>
          <p class="text-gray-500 text-sm">{{ pluralize('measurement', vitalMeasurements(vital.id).length, true) }}</p>
          <VitalChart class="mt-3" :vital="vital" :measurements="vitalMeasurements(vital.id)" />
        </div>
      </div>
      <div v-else class="border border-amber-200 p-4 rounded-lg text-amber-500 bg-amber-100 text-sm">
        <p class="grid grid-flow-col grid-cols-[min-content_auto] items-center">
          <LightBulbIcon class="h-6 w-6 mr-3" />
          <span v-if="vitals.length === 0">You are not measuring any vitals. <RouterLink class="underline" :to="{ name: 'AddVital' }">Add&nbsp;a&nbsp;vital</RouterLink> or start with <span class="underline cursor-pointer" @click="addBodyWeightVital()">body weight</span> or <span class="underline cursor-pointer" @click="addHeartRateVital()">heart rate</span>.</span>
          <span v-else>You have not recorded any measurements. <RouterLink class="underline" :to="{ name: 'AddPersonMeasurement' }">Add&nbsp;a&nbsp;measurement</RouterLink>.</span>
        </p>
      </div>
    </div>
    <div v-if="measurements.length > 0" class="pb-28 pt-9 md:pb-0 grid gap-3">
      <h3 class="z-10 text-xl font-bold sticky top-14 pb-3 bg-gradient-to-b from-gray-100 from-70%">Measurements</h3>
      <MeasurementListItem v-for="measurement in measurements" :key="measurement.id" :measurement="measurement" />
    </div>
  </div>
</template>
