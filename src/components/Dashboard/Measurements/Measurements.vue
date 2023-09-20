<script setup>
import { PlusIcon } from '@heroicons/vue/20/solid';
import { QuestionMarkCircleIcon, LightBulbIcon } from '@heroicons/vue/24/outline';
import { measurements } from '../../../store/measurements';
import MeasurementListItem from './MeasurementListItem.vue';
</script>

<template>
  <div>
    <div class="z-10 sticky top-0 pt-0 mt-0 pb-5 grid grid-flow-col gap-2 items-start bg-gradient-to-b from-gray-100 from-90%">
      <header>
        <h2 class="text-2xl font-bold">Measurements</h2>
        <p class="text-sm text-gray-500">Add, edit, and delete measurements to record.</p>
      </header>
      <div class="grid justify-end">
        <RouterLink class="group rounded-full hover:bg-gray-200" :to="{ name: 'MeasurementAdd' }">
          <PlusIcon class="group-hover:text-indigo-600 h-10 w-10" />
        </RouterLink>
      </div>
    </div>
    <div v-if="measurements.length > 0" class="pb-28 md:pb-0 grid gap-3">
      <MeasurementListItem v-for="measurement in measurements" :key="measurement.id" :measurement="measurement" />
    </div>
    <div v-else class="mx-6 border border-amber-200 p-4 rounded-lg text-amber-500 bg-amber-100 text-sm">
      <p class="grid grid-flow-col grid-cols-[min-content_auto] items-center mb-4 pb-4 border-b border-amber-200">
        <QuestionMarkCircleIcon class="h-6 w-6 mr-3" />
        A Measurement is a recording of a specific person's Vital.
      </p>
      <p class="grid grid-flow-col grid-cols-[min-content_auto] items-center">
        <LightBulbIcon class="h-6 w-6 mr-3" />
        <span>You have not recorded any measurements. <RouterLink class="underline" :to="{ name: 'MeasurementAdd' }">Add&nbsp;a&nbsp;measurement</RouterLink>.</span>
      </p>
    </div>
    <RouterView name="modal" />
  </div>
</template>
