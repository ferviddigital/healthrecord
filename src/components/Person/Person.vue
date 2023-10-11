<script setup>
import { LightBulbIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { PlusIcon } from '@heroicons/vue/20/solid';
import { PencilIcon } from '@heroicons/vue/24/solid';
import VitalChart from './VitalChart.vue';
import { computed, ref } from 'vue';
import { record } from '../../store/record';
import { measurements } from '../../store/measurements';
import { vitals, createBodyWeightVital, createHeartRateVital } from '../../store/vitals';
import { useRoute } from 'vue-router';
import pluralize from 'pluralize';
import MeasurementListItem from '../Measurements/MeasurementListItem.vue';
import { scrolled } from '../../store/ui';

const route = useRoute();

const personId = route.params.personId;

const vitalSort = ref('date');

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

const recentlyTrackedVitals = computed(() => {
  var vitalIds = personMeasurements.value.map(measurement => measurement.vitalId);
  vitalIds = [...new Set(vitalIds)];
  return vitalIds.map(vitalId => {
    return vitals.value.find(vital => vital.id === vitalId);
  });
});

const sortedVitals = computed(() => {
  switch (vitalSort.value) {
    case 'alpha':
      return trackedVitals.value
    case 'date':
      return recentlyTrackedVitals.value
  }
})

const vitalMeasurements = (vitalId) => {
  return personMeasurements.value.filter(measurement => measurement.vitalId === vitalId)
}
</script>

<template>
  <div>
    <header
      class="sticky grid grid-cols-[auto_min-content] top-0 p-4 py-2 sm:pt-4 bg-gray-200/70 backdrop-blur-xl border-b border-transparent transition-all"
      :class="{'!border-gray-300': scrolled }"
    >
      <hgroup>
        <h2 class="text-2xl font-bold">{{ person.firstName + ' ' + person.lastName }}</h2>
        <p class="text-sm text-gray-500">{{ pluralize('measurement', personMeasurements.length, true) }} across {{ pluralize('vital', trackedVitals.length, true) }}.</p>
      </hgroup>
      <div class="grid grid-flow-col gap-3">
        <RouterLink class="grid rounded-full bg-gray-300 hover:bg-gray-100 h-9 w-9 sm:h-10 sm:w-10 items-center justify-items-center" :to="{ name: 'PersonUpdate' }">
          <PencilIcon class="h-4 w-4" />
        </RouterLink>
        <RouterLink class="grid rounded-full bg-gray-300 hover:bg-gray-100 h-9 w-9 sm:h-10 sm:w-10 items-center justify-items-center" :to="{ name: 'PersonMeasurementCreate' }">
          <PlusIcon class="h-6 w-6" />
        </RouterLink>
      </div>
    </header>
    <div class="m-4">
      <div v-if="sortedVitals.length > 0" class="mt-2">
        <h3 class="grid grid-flow-col text-xl font-bold mb-4 cursor-pointer" @click="$router.push({ name: 'PersonVitals' })">
          Vitals
          <span class="font-normal text-base text-indigo-500 justify-self-end whitespace-nowrap">
            View all {{ sortedVitals.length }} <ChevronRightIcon class="w-6 h-6 inline align-top" />
          </span>
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            v-for="vital in sortedVitals.slice(0,4)"
            :key="vital.id"
            class="group bg-gray-50 p-3 rounded-xl cursor-pointer shadow-sm hover:shadow-md hover:bg-white transition-all"
            @click="$router.push({ name: 'PersonVital', params: { vitalId: vital.id } })"
          >
            <header class="grid grid-cols-[auto_min-content]">
              <h3 class="font-semibold mb-1">{{ vital.name }}</h3>
              <ChevronRightIcon class="h-5 w-5 self-start text-gray-400 group-hover:text-black transition-all" />
            </header>
            <VitalChart class="mt-3 cursor-pointer" :vital="vital" :measurements="vitalMeasurements(vital.id)" :small="true"/>
          </div>
        </div>
        <div class="pt-9 grid gap-3">
          <h3 class="grid grid-flow-col text-xl font-bold mb-1 cursor-pointer" @click="$router.push({ name: 'PersonMeasurements' })">
            Measurements
            <span class="font-normal text-base text-indigo-500 justify-self-end whitespace-nowrap">
              View all {{ personMeasurements.length }} <ChevronRightIcon class="w-6 h-6 inline align-top" />
            </span>
          </h3>
          <div class="grid grid-cols-2 grid-rows-2 gap-3">
            <MeasurementListItem v-for="measurement in personMeasurements.slice(0,4)" :key="measurement.id" :measurement="measurement" />
          </div>
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
    <RouterView name="modal" />
  </div>
</template>