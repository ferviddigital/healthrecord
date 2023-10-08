<script setup>
import { vitals } from '../../store/vitals';
import { measurements } from '../../store/measurements';
import { people } from '../../store/people';
import { useRoute } from 'vue-router';
import VitalChart from './VitalChart.vue';
import { computed } from 'vue';
import MeasurementListItem from '../Measurements/MeasurementListItem.vue';
import { PlusIcon } from '@heroicons/vue/20/solid';
import { ChevronLeftIcon } from '@heroicons/vue/24/outline';
import { VitalInsight } from '../../insights/insight';
import Insight from '../Vitals/Insight.vue';

const vitalId   = useRoute().params.vitalId;
const personId  = useRoute().params.personId;

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
</script>

<template>
  <div>
    <header class="sticky grid grid-cols-[auto_min-content] top-0 pb-2.5 sm:pt-4 mb-2.5 sm:-mt-4 bg-gradient-to-b from-gray-200 from-90% z-10">
      <hgroup>
        <RouterLink class="text-sm text-gray-500 -ml-1" :to="{ name: 'Person', params: { personId }}">
          <ChevronLeftIcon class="w-4 h-4 inline -mt-0.5" /> {{ person.firstName + ' ' + person.lastName }}
        </RouterLink>
        <h2 class="text-2xl font-bold">{{ vital.name }}</h2>
        <p class="text-sm text-gray-500">{{ vital.description }}</p>
      </hgroup>
      <div class="grid justify-end">
        <RouterLink class="rounded-full hover:bg-gray-300" :to="{ name: 'PersonVitalMeasurementCreate' }">
          <PlusIcon class="h-10 w-10" />
        </RouterLink>
      </div>
    </header>
    <Insight :person="person" :vital="vital" />
    <div class="bg-white rounded-xl p-4">
      <VitalChart :vital="vital" :measurements="vitalMeasurements" />
    </div>
    <div class="pb-10 md:pb-0 pt-9 grid gap-3">
      <h3 class="z-10 text-xl font-bold sticky top-14 sm:top-[3.5em] pb-3 bg-gradient-to-b from-gray-200 from-70%">
        Measurements
        <span class="text-xs font-normal text-gray-500 align-middle">({{ vitalMeasurements.length }})</span>
      </h3>
      <MeasurementListItem v-for="measurement in vitalMeasurements" :key="measurement.id" :measurement="measurement" />
    </div>
    <RouterView name="modal" />
  </div>
</template>