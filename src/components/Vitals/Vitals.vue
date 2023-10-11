<script setup>
import { PlusIcon } from '@heroicons/vue/20/solid';
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';
import { QuestionMarkCircleIcon, LightBulbIcon } from '@heroicons/vue/24/outline';
import { vitals, createBodyWeightVital, createHeartRateVital } from '../../store/vitals';
import VitalListItem from './VitalListItem.vue';
import { scrolled } from '../../store/ui';
</script>

<template>
  <div>
    <header
      class="sticky grid grid-cols-[auto_min-content] top-0 p-4 py-2 sm:pt-4 bg-gray-200/70 backdrop-blur-xl border-b border-transparent transition-all"
      :class="{'!border-gray-300': scrolled }"
    >
      <hgroup class="grid grid-cols-[1fr_1fr_1fr] items-center">
        <RouterLink class="text-indigo-500 justify-self-start" :to="{ name: 'Settings' }">
          <ChevronLeftIcon class="w-6 h-6 inline align-top" /> Settings
        </RouterLink>
        <span>
          <h2 class="text-xl font-bold text-center">Vitals</h2>
        </span>
        <div class="grid grid-flow-col gap-3 justify-self-end">
          <RouterLink class="grid rounded-full bg-gray-300 hover:bg-gray-100 h-9 w-9 sm:h-10 sm:w-10 items-center justify-items-center" :to="{ name: 'VitalCreate' }">
            <PlusIcon class="h-6 w-6" />
          </RouterLink>
        </div>
      </hgroup>
    </header>
    <div class="m-4">
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
    </div>
    <RouterView name="modal" />
  </div>
</template>
