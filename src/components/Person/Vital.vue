<script setup>
import { vitals } from '../../store/vitals';
import { measurements } from '../../store/measurements';
import { people } from '../../store/people';
import { useRoute } from 'vue-router';
import VitalChart from './VitalChart.vue';
import { computed, ref } from 'vue';
import MeasurementListItem from '../Measurements/MeasurementListItem.vue';
import { PencilIcon, ChevronLeftIcon } from '@heroicons/vue/24/solid';
import { PlusIcon } from '@heroicons/vue/20/solid';
import Insight from '../Vitals/Insight.vue';
import { previousRoute, scrolled } from '../../store/ui';

const route = useRoute();

const vitalId   = route.params.vitalId;
const personId  = route.params.personId;

/** @type {import('vue').Ref<import('../../typedefs').VitalChartRange>} */
const vitalRange = ref('all');

const person = computed(() => {
  const person = people.value.find(person => person.id === personId);

  if (! person) throw new Error(`Could not find person with ID: ${personId}.`);

  return person;
});

const vital = computed(() => {
  const vital = vitals.value.find(vital => vital.id === vitalId);

  if (! vital) throw new Error(`Could not find vital with ID: ${vitalId}.`)

  return vital;
});

const vitalMeasurements = computed(() => {
  return measurements.value.filter(measurement => {
    return measurement.personId === personId && measurement.vitalId === vitalId;
  }).toSpliced(0,-1).toSorted((a, b) => b.date - a.date );
});

const backText = computed(() => {
  switch (previousRoute.value.name) {
    case 'Person':
    case undefined:
      return person.value.firstName;
    case 'PersonVitals':
      return 'Vitals';
  }
});

const backRoute = computed(() => {
  switch (previousRoute.value.name) {
    case 'Person':
    case undefined:
      return { name: 'Person', params: { personId }};
    case 'PersonVitals':
      return { name: 'PersonVitals', params: { personId }};
    default:
      return { name: 'Person', params: { personId }};
  }
});
</script>

<template>
  <div>
    <header
      class="sticky grid grid-cols-[auto_min-content] top-0 p-4 py-2 sm:pt-4 bg-gray-200/70 backdrop-blur-xl border-b border-transparent transition-all"
      :class="{'!border-gray-300': scrolled }"
    >
      <hgroup class="grid grid-cols-[1fr_1fr_1fr] items-center">
        <RouterLink class="text-indigo-500 justify-self-start" :to="backRoute">
          <ChevronLeftIcon class="w-6 h-6 inline align-top" /> {{ backText }}
        </RouterLink>
        <h2 class="text-xl font-bold text-center">{{ vital.name }}</h2>
        <div class="grid grid-flow-col gap-3 justify-self-end">
          <RouterLink class="grid rounded-full bg-gray-300 hover:bg-gray-100 h-9 w-9 sm:h-10 sm:w-10 items-center justify-items-center" :to="{ name: 'VitalUpdate' }">
            <PencilIcon class="h-4 w-4" />
          </RouterLink>
          <RouterLink class="grid rounded-full bg-gray-300 hover:bg-gray-100 h-9 w-9 sm:h-10 sm:w-10 items-center justify-items-center" :to="{ name: 'PersonVitalMeasurementCreate' }">
            <PlusIcon class="h-6 w-6" />
          </RouterLink>
        </div>
      </hgroup>
    </header>
    <div class="m-4 mt-0">
      <p class="text-center text-gray-500 mb-5 leading-none">{{ vital.description }}</p>
      <Insight :person="person" :vital="vital" class="pb-3"/>
      <div class="grid grid-flow-col gap-2 place-content-between -mb-2 bg-gray-300 rounded-xl rounded-br-none rounded-bl-none p-2 pb-3.5">
        <button
          class="rounded-full p-0.5 px-3 text-sm transition-all"
          :class="{'!bg-indigo-500 text-white': vitalRange === 'week'}"
          @click="vitalRange = 'week'"
        >
          Week
        </button>
        <button
          class="rounded-full p-0.5 px-3 text-sm transition-all"
          :class="{'!bg-indigo-500 text-white': vitalRange === 'month'}"
          @click="vitalRange = 'month'"
        >
          Month
        </button>
        <button
          class="rounded-full p-0.5 px-3 text-sm transition-all"
          :class="{'!bg-indigo-500 text-white': vitalRange === 'quarter'}"
          @click="vitalRange = 'quarter'"
        >
          Quarter
        </button>
        <button
          class="rounded-full p-0.5 px-3 text-sm transition-all"
          :class="{'!bg-indigo-500 text-white': vitalRange === 'year'}"
          @click="vitalRange = 'year'"
        >
          Year
        </button>
        <button
          class="rounded-full p-0.5 px-3 text-sm transition-all"
          :class="{'!bg-indigo-500 text-white': vitalRange === 'all'}"
          @click="vitalRange = 'all'"
        >
          All
        </button>
      </div>
      <div class="bg-white rounded-xl p-4 shadow">
        <VitalChart :vital="vital" :measurements="vitalMeasurements" :range="vitalRange" />
      </div>
      <div class="pt-9 grid gap-3">
        <h3 class="text-xl font-bold pb-3">
          Measurements
          <span class="text-xs font-normal text-gray-500 align-middle">({{ vitalMeasurements.length }})</span>
        </h3>
        <MeasurementListItem v-for="measurement in vitalMeasurements" :key="measurement.id" :measurement="measurement" />
      </div>
    </div>
    <RouterView name="modal" />
  </div>
</template>