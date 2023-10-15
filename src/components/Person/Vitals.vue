<script setup>
import { QuestionMarkCircleIcon, LightBulbIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { PlusIcon } from '@heroicons/vue/20/solid';
import VitalChart from './VitalChart.vue';
import { computed, ref } from 'vue';
import { vitals, createBodyWeightVital, createHeartRateVital } from '../../store/vitals';
import VitalSummary from './VitalSummary.vue';
import { selectedPerson, sortedPersonMeasurements } from '../../store/person';
import HeaderTitleCenter from '../Interface/HeaderTitleCenter.vue';

const vitalSort = ref('date');

const trackedVitals = computed(() => {
  var vitalIds = sortedPersonMeasurements.value.map(measurement => measurement.vitalId);
  vitalIds = [...new Set(vitalIds)];
  return vitals.value.filter(vital => vitalIds.includes(vital.id));
});

const recentlyTrackedVitals = computed(() => {
  var vitalIds = sortedPersonMeasurements.value.map(measurement => measurement.vitalId);
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
  return sortedPersonMeasurements.value.filter(measurement => measurement.vitalId === vitalId)
}
</script>

<template>
  <div>
    <HeaderTitleCenter title="Vitals" :backText="selectedPerson.firstName" :backRoute="{ name: 'Person', params: { personId: selectedPerson.id }}">
      <template #right>
        <RouterLink class="grid rounded-full bg-gray-300 hover:bg-gray-100 h-9 w-9 sm:h-10 sm:w-10 items-center justify-items-center" :to="{ name: 'PersonVitalsMeasurementCreate' }">
          <PlusIcon class="h-6 w-6" />
        </RouterLink>
      </template>
    </HeaderTitleCenter>
    <div class="m-4">
      <div v-if="sortedVitals.length > 0">
        <VitalSummary :person="selectedPerson" />
        <div class="grid justify-items-end">
          <div class="grid grid-flow-col gap-2 self-end justify-end mb-2 bg-gray-300 rounded-full p-1 shadow-inner">
            <button
              class="rounded-full p-0.5 px-3 text-sm hover:bg-gray-200 transition-all"
              :class="{'!bg-indigo-500 text-white shadow': vitalSort === 'alpha'}"
              @click="vitalSort = 'alpha'"
            >
              A-Z
            </button>
            <button
              class="rounded-full p-0.5 px-3 text-sm hover:bg-gray-200 transition-all"
              :class="{'!bg-indigo-500 text-white shadow': vitalSort === 'date'}"
              @click="vitalSort = 'date'"
            >
              Recent
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div
            v-for="vital in sortedVitals"
            :key="vital.id"
            class="group bg-gray-50 rounded-xl cursor-pointer shadow-sm hover:shadow-md hover:bg-white transition-all overflow-hidden"
            @click="$router.push({ name: 'PersonVital', params: { vitalId: vital.id } })"
          >
            <header class="grid grid-cols-[auto_min-content] p-3 pb-0">
              <h3 class="font-semibold">{{ vital.name }}</h3>
              <ChevronRightIcon class="h-5 w-5 self-start text-gray-400 group-hover:text-black transition-all" />
            </header>
            <VitalChart class="cursor-pointer" :vital="vital" :measurements="vitalMeasurements(vital.id)" :small="true"/>
          </div>
        </div>
      </div>
      <div v-else class="border border-amber-200 p-4 rounded-lg text-amber-500 bg-amber-100 text-sm">
        <p class="grid grid-flow-col grid-cols-[min-content_auto] items-center mb-4 pb-4 border-b border-amber-200">
          <QuestionMarkCircleIcon class="h-6 w-6 mr-3" />
          A Vital is a health statistic to measure.
        </p>
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
