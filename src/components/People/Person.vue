<script setup>
import { LightBulbIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { PlusIcon } from '@heroicons/vue/20/solid';
import VitalChart from './VitalChart.vue';
import { computed } from 'vue';
import { record } from '../../store/record';
import { measurements } from '../../store/measurements';
import { vitals, createBodyWeightVital, createHeartRateVital } from '../../store/vitals';
import { useRoute } from 'vue-router';
import pluralize from 'pluralize';
import MeasurementListItem from '../Measurements/MeasurementListItem.vue';
import VitalSummary from './VitalSummary.vue';

const route = useRoute();

const personId = route.params.personId;

const person = computed(() => {
  return record.value.people.find(person => person.id === personId)
});

const personMeasurements = computed(() => {
  return measurements.value.filter(measurement => measurement.personId === personId);
});

const trackedVitals = computed(() => {
  var vitalIds = personMeasurements.value.map(measurement => measurement.vitalId);
  vitalIds = [...new Set(vitalIds)];
  return vitals.value.filter(vital => vitalIds.includes(vital.id));
});

const vitalMeasurements = (vitalId) => {
  return personMeasurements.value.filter(measurement => measurement.vitalId === vitalId)
}
</script>

<template>
  <div v-if="person">
    <div class="z-10 sticky top-0 pt-0 mt-0 pb-5 grid grid-flow-col items-start bg-gradient-to-b from-gray-200 from-90%">
      <header>
        <h2 class="text-2xl font-bold">{{ person.firstName + ' ' + person.lastName }}</h2>
        <p class="text-sm text-gray-500">{{ pluralize('measurement', personMeasurements.length, true) }} across {{ pluralize('vital', trackedVitals.length, true) }}.</p>
      </header>
      <div class="grid justify-end">
        <RouterLink class="rounded-full hover:bg-gray-300" :to="{ name: 'PersonMeasurementCreate' }">
          <PlusIcon class="h-10 w-10" />
        </RouterLink>
      </div>
    </div>
    <div>
      <div v-if="trackedVitals.length > 0">
        <VitalSummary :person="person" />
      </div>
      <div v-if="trackedVitals.length > 0" class="grid grid-cols-2 xl:grid-cols-3 gap-3">
        <div v-for="vital in trackedVitals" :key="vital.id" class="group bg-gray-50 p-3 rounded-xl cursor-pointer shadow-sm hover:shadow-md hover:bg-white transition-all" @click="$router.push({ name: 'PersonVital', params: { vitalId: vital.id } })">
          <header class="grid grid-cols-[auto_min-content]">
            <h3 class="font-semibold mb-1">{{ vital.name }}</h3>
            <ChevronRightIcon class="h-5 w-5 self-start text-gray-400 group-hover:text-black transition-all" />
          </header>
          <p class="text-gray-500 text-sm">{{ pluralize('measurement', vitalMeasurements(vital.id).length, true) }}</p>
          <VitalChart class="mt-3" :vital="vital" :measurements="vitalMeasurements(vital.id)" :small="true" />
        </div>
      </div>
      <div v-else class="border border-amber-200 p-4 rounded-lg text-amber-500 bg-amber-100 text-sm">
        <p class="grid grid-flow-col grid-cols-[min-content_auto] items-center">
          <LightBulbIcon class="h-6 w-6 mr-3" />
          <span v-if="vitals.length === 0">You are not measuring any vitals. <RouterLink class="underline" :to="{ name: 'VitalCreate' }">Add&nbsp;a&nbsp;vital</RouterLink> or start with <span class="underline cursor-pointer" @click="createBodyWeightVital()">body weight</span> or <span class="underline cursor-pointer" @click="createHeartRateVital()">heart rate</span>.</span>
          <span v-else>You have not recorded any measurements. <RouterLink class="underline" :to="{ name: 'PersonMeasurementCreate' }">Add&nbsp;a&nbsp;measurement</RouterLink>.</span>
        </p>
      </div>
    </div>
    <div v-if="personMeasurements.length > 0" class="pb-28 pt-9 md:pb-0 grid gap-3">
      <h3 class="z-10 text-xl font-bold sticky top-8 pb-1 bg-gradient-to-b from-gray-200 from-70%">
        Measurements
        <span class="text-xs font-normal text-gray-500 align-middle">({{ personMeasurements.length }})</span>
      </h3>
      <MeasurementListItem v-for="measurement in personMeasurements" :key="measurement.id" :measurement="measurement" />
    </div>
    <RouterView name="modal" />
  </div>
</template>
