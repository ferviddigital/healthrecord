<script setup lang="ts">
import { vitals } from '@store/vitals';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { PlusIcon } from '@heroicons/vue/20/solid';
import Insight from '@components/Person/Insight.vue';
import { previousRoute } from '@store/ui';
import VitalChartSummary from '@components/Person/VitalChartSummary.vue';
import HeaderTitleCenter from '@components/Interface/HeaderTitleCenter.vue';
import LogbookListItem from '@components/Logbook/LogbookListItem.vue';
import { selectedPerson, sortedPersonMeasurements } from '@store/person';
import { MeasurementLogEntry } from '../../classes/logEntry';

const route = useRoute();

const vitalId = route.params.vitalId;

const vital = computed(() => {
  const vital = vitals.value.find(vital => vital.id === vitalId);
  if (!vital) throw new Error('Vital not found.');
  return vital;
});

const vitalMeasurements = computed(() => {
  return sortedPersonMeasurements.value.filter(measurement => measurement.vitalId === vitalId);
});

const logEntries = computed(() => {
  return vitalMeasurements.value.map(measurement => new MeasurementLogEntry(measurement));
});

const backText = computed(() => {
  if (!previousRoute.value) return 'Back';
  switch (previousRoute.value.name) {
    case 'Person':
    case undefined:
      return selectedPerson.value.firstName;
    case 'PersonVitals':
      return 'Vitals';
    case 'PersonLogbook':
      return 'Logbook';
    default:
      return 'Back';
  }
});

const backRoute = computed(() => {
  if (!previousRoute.value) return { name: 'Person', params: { personId: selectedPerson.value.id } };
  switch (previousRoute.value.name) {
    case 'Person':
    case undefined:
      return { name: 'Person', params: { personId: selectedPerson.value.id } };
    case 'PersonVitals':
      return { name: 'PersonVitals', params: { personId: selectedPerson.value.id } };
    case 'PersonLogbook':
      return previousRoute.value;
    default:
      return { name: 'Person', params: { personId: selectedPerson.value.id } };
  }
});
</script>

<template>
  <div>
    <HeaderTitleCenter :title="vital.name" :backText="backText" :backRoute="backRoute">
      <template #right>
        <RouterLink
          class="grid rounded-full bg-gray-300 hover:bg-gray-100 h-9 w-9 sm:h-10 sm:w-10 items-center justify-items-center"
          :to="{ name: 'PersonVitalMeasurementCreate' }"
        >
          <PlusIcon class="h-6 w-6" />
        </RouterLink>
      </template>
    </HeaderTitleCenter>
    <div class="m-4 mt-0">
      <p class="text-center text-gray-500 mb-5 leading-none">{{ vital.description }}</p>
      <Insight :person="selectedPerson" :vital="vital" class="" />
      <div class="bg-white rounded-xl shadow">
        <VitalChartSummary :vital="vital" :measurements="vitalMeasurements" />
      </div>
      <div class="pt-9 grid gap-3">
        <h3 class="text-xl font-bold pb-3">
          Logbook
          <span class="text-xs font-normal text-gray-500 align-middle"
            >({{ vitalMeasurements.length }})</span
          >
        </h3>
        <div class="grid gap-3">
          <LogbookListItem
            v-for="logEntry in logEntries"
            :logEntry="logEntry"
            :key="logEntry.measurement.id"
          />
        </div>
      </div>
    </div>
    <RouterView name="modal" />
  </div>
</template>
