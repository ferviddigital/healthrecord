<script setup>
import { PlusIcon } from '@heroicons/vue/20/solid';
import { QuestionMarkCircleIcon, LightBulbIcon } from '@heroicons/vue/24/outline';
import { vitals, store as vitalStore, addBodyWeightVital, addHeartRateVital } from '../../../store/vitals';
import VitalListItem from './VitalListItem.vue';
</script>

<template>
  <div>
    <div class="sticky top-0 pt-0 mt-0 pb-5 grid grid-flow-col gap-2 items-start bg-gradient-to-b from-gray-100 from-90%">
      <header>
        <h2 class="text-2xl font-bold">Vitals</h2>
        <p class="text-sm text-gray-500">Add, edit, and delete vitals to measure.</p>
      </header>
      <div class="grid justify-end">
        <RouterLink class="group rounded-full hover:bg-gray-200" :to="{ name: 'VitalAdd' }">
          <PlusIcon class="group-hover:text-indigo-600 h-10 w-10" />
        </RouterLink>
      </div>
    </div>
    <div v-if="vitals.length > 0" class="pb-28 md:pb-0 grid gap-3">
      <VitalListItem v-for="vital in vitals" :key="vital.id" :vital="vital" />
    </div>
    <div v-else class="mx-6 border border-amber-200 p-4 rounded-lg text-amber-500 bg-amber-100 text-sm">
      <p class="grid grid-flow-col items-center grid-cols-[min-content_auto] mb-4 pb-4 border-b border-amber-200">
        <QuestionMarkCircleIcon class="h-6 w-6 mr-4" />
        A Vital is a metric that can be measured like heart rate, body weight, or a lab result.
      </p>
      <p class="grid grid-flow-col grid-cols-[min-content_auto] items-center">
        <LightBulbIcon class="h-6 w-6 mr-3" />
        <span>You are not measuring any vitals. <RouterLink class="underline" :to="{ name: 'VitalAdd' }">Add&nbsp;a&nbsp;vital</RouterLink> or start with <span class="underline cursor-pointer" @click="addBodyWeightVital()">body weight</span> or <span class="underline cursor-pointer" @click="addHeartRateVital()">heart rate</span>.</span>
      </p>
    </div>
    <RouterView name="modal" />
  </div>
</template>
