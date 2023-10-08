<script setup>
import { PlusIcon } from '@heroicons/vue/20/solid';
import { QuestionMarkCircleIcon, LightBulbIcon } from '@heroicons/vue/24/outline';
import { vitals, createBodyWeightVital, createHeartRateVital } from '../../store/vitals';
import VitalListItem from './VitalListItem.vue';
</script>

<template>
  <div>
    <header class="sticky grid grid-cols-[auto_min-content] top-0 pb-2.5 sm:pt-4 mb-2.5 sm:-mt-4 bg-gradient-to-b from-gray-200 from-90% z-10">
      <hgroup>
        <h2 class="text-2xl font-bold">Vitals</h2>
        <p class="text-sm text-gray-500">Add, edit, and delete vitals to measure.</p>
      </hgroup>
      <div class="grid justify-end">
        <RouterLink class="rounded-full hover:bg-gray-300" :to="{ name: 'VitalCreate' }">
          <PlusIcon class="h-10 w-10" />
        </RouterLink>
      </div>
    </header>
    <div v-if="vitals.length > 0" class="box-columns">
      <VitalListItem v-for="vital in vitals" :key="vital.id" :vital="vital" />
    </div>
    <div v-else class="border border-amber-200 p-4 rounded-lg text-amber-500 bg-amber-100 text-sm">
      <p class="grid grid-flow-col items-center grid-cols-[min-content_auto] mb-4 pb-4 border-b border-amber-200">
        <QuestionMarkCircleIcon class="h-6 w-6 mr-4" />
        A Vital is a metric that can be measured like heart rate, body weight, or a lab result.
      </p>
      <p class="grid grid-flow-col grid-cols-[min-content_auto] items-center">
        <LightBulbIcon class="h-6 w-6 mr-3" />
        <span>You are not measuring any vitals. <RouterLink class="underline" :to="{ name: 'VitalCreate' }">Add&nbsp;a&nbsp;vital</RouterLink> or start with <span class="underline cursor-pointer" @click="createBodyWeightVital()">body weight</span> or <span class="underline cursor-pointer" @click="createHeartRateVital()">heart rate</span>.</span>
      </p>
    </div>
    <RouterView name="modal" />
  </div>
</template>
