<script setup>
import { PlusIcon } from '@heroicons/vue/20/solid';
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';
import { QuestionMarkCircleIcon, LightBulbIcon } from '@heroicons/vue/24/outline';
import { measurements } from '../../store/measurements';
import MeasurementListItem from '../Measurements/MeasurementListItem.vue';
import { scrolled } from '../../store/ui';
import { computed } from 'vue';
import { selectedPerson } from '../../store/person';

const personMeasurements = computed(() => {
  return measurements.value.filter(measurement => measurement.personId === selectedPerson.value.id);
});
</script>

<template>
  <div>
    <header
      class="sticky grid grid-cols-[auto_min-content] top-0 p-4 py-2 sm:pt-4 bg-gray-200/70 backdrop-blur-xl border-b border-transparent transition-all"
      :class="{'!border-gray-300': scrolled }"
    >
      <hgroup class="grid grid-cols-[1fr_1fr_1fr] items-center">
        <RouterLink class="text-indigo-500 justify-self-start" :to="{ name: 'Person', params: { personId: selectedPerson.id }}">
          <ChevronLeftIcon class="w-6 h-6 inline align-top" /> {{ selectedPerson.firstName }}
        </RouterLink>
        <h2 class="text-xl font-bold text-center">Measurements</h2>
        <div class="grid grid-flow-col gap-3 justify-self-end">
          <RouterLink class="grid rounded-full bg-gray-300 hover:bg-gray-100 h-9 w-9 sm:h-10 sm:w-10 items-center justify-items-center" :to="{ name: 'PersonMeasurementCreate' }">
            <PlusIcon class="h-6 w-6" />
          </RouterLink>
        </div>
      </hgroup>
    </header>
    <div class="m-4">
      <div v-if="personMeasurements.length > 0" class="grid gap-3">
        <MeasurementListItem v-for="measurement in personMeasurements" :key="measurement.id" :measurement="measurement" />
      </div>
      <div v-else class="border border-amber-200 p-4 rounded-lg text-amber-500 bg-amber-100 text-sm">
        <p class="grid grid-flow-col grid-cols-[min-content_auto] items-center mb-4 pb-4 border-b border-amber-200">
          <QuestionMarkCircleIcon class="h-6 w-6 mr-3" />
          A Measurement is a recording of a specific person's Vital.
        </p>
        <p class="grid grid-flow-col grid-cols-[min-content_auto] items-center">
          <LightBulbIcon class="h-6 w-6 mr-3" />
          <span>You have not recorded any measurements. <RouterLink class="underline" :to="{ name: 'MeasurementCreate' }">Add&nbsp;a&nbsp;measurement</RouterLink>.</span>
        </p>
      </div>
    </div>
    <RouterView name="modal" />
  </div>
</template>
