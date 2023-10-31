<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/20/solid';
import { QuestionMarkCircleIcon, LightBulbIcon } from '@heroicons/vue/24/outline';
import { vitals, createBodyWeightVital, createHeartRateVital, createWellBeingVital } from '@stores/vitals';
import VitalListItem from './VitalListItem.vue';
import HeaderTitleCenter from '@components/Interface/HeaderTitleCenter.vue';
</script>

<template>
  <div>
    <HeaderTitleCenter title="Vitals" backText="Settings" :back-route="{ name: 'Settings' }">
      <template #right>
        <RouterLink
          class="grid rounded-full bg-gray-300 hover:bg-gray-100 h-9 w-9 sm:h-10 sm:w-10 items-center justify-items-center"
          :to="{ name: 'SettingsVitalCreate' }">
          <PlusIcon class="h-6 w-6" />
        </RouterLink>
      </template>
    </HeaderTitleCenter>
    <div class="m-4">
      <div v-if="vitals.length > 0" class="box-columns">
        <VitalListItem v-for="vital in vitals" :key="vital.id" :vital="vital" />
      </div>
      <div
        v-else
        class="border border-amber-200 p-4 rounded-lg text-amber-500 bg-amber-100 text-sm">
        <p
          class="grid grid-flow-col items-center grid-cols-[min-content_auto] mb-4 pb-4 border-b border-amber-200">
          <QuestionMarkCircleIcon class="h-6 w-6 mr-4" />
          A Vital is a metric that can be measured like heart rate, body weight, or a lab result.
        </p>
        <p class="grid grid-flow-col grid-cols-[min-content_auto] items-center">
          <LightBulbIcon class="h-6 w-6 mr-3" />
          <span>
            You are not measuring any vitals.
            <RouterLink class="underline" :to="{ name: 'SettingsVitalCreate' }">
              Add&nbsp;a&nbsp;vital
            </RouterLink>
            or start with
            <span class="underline cursor-pointer" @click="createBodyWeightVital()">
              body weight</span>, 
            <span class="underline cursor-pointer" @click="createHeartRateVital()">
              heart rate</span>,
            or
            <span class="underline cursor-pointer" @click="createWellBeingVital()">well-being</span>.
          </span>
        </p>
      </div>
    </div>
    <RouterView name="modal" />
  </div>
</template>
