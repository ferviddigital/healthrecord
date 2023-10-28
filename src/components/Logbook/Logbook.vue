<script setup lang="ts">
import { QuestionMarkCircleIcon, LightBulbIcon } from '@heroicons/vue/24/outline';
import { PlusIcon } from '@heroicons/vue/20/solid';
import { sortedPersonLogEntries } from '@store/person';
import LogbookListItem from '@components/Logbook/LogbookListItem.vue';
import HeaderTitleLeft from '@components/Interface/HeaderTitleLeft.vue';
import { vitals, createHeartRateVital, createBodyWeightVital, createWellBeingVital } from '@store/vitals';
</script>

<template>
  <div>
    <HeaderTitleLeft title="Logbook" subtitle="Create and view Notes and other activity.">
      <template #right>
        <RouterLink
          class="grid rounded-full bg-gray-300 hover:bg-gray-100 h-9 w-9 sm:h-10 sm:w-10 items-center justify-items-center"
          :to="{ name: 'PersonNoteCreate' }">
          <PlusIcon class="h-6 w-6" />
        </RouterLink>
      </template>
    </HeaderTitleLeft>
    <div class="m-4">
      <div v-if="sortedPersonLogEntries.length > 0" class="grid gap-2">
        <LogbookListItem v-for="logEntry in sortedPersonLogEntries" :logEntry="logEntry" />
      </div>
      <div
        v-else
        class="border border-amber-200 p-4 rounded-lg text-amber-500 bg-amber-100 text-sm">
        <p
          class="grid grid-flow-col items-center grid-cols-[min-content_auto] mb-4 pb-4 border-b border-amber-200">
          <QuestionMarkCircleIcon class="h-6 w-6 mr-4" />
          Logbook is where you can find previously recorded notes and measurements.
        </p>
        <p class="grid grid-flow-col grid-cols-[min-content_auto] items-center">
          <LightBulbIcon class="h-6 w-6 mr-3" />
          <span v-if="vitals.length === 0">
            You are not measuring any vitals.
            <RouterLink class="underline" :to="{ name: 'VitalCreate' }">
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
          <span v-else>
            You have not recorded any measurements.
            <RouterLink class="underline" :to="{ name: 'PersonMeasurementCreate' }">
              Add&nbsp;a&nbsp;measurement
            </RouterLink>
            .
          </span>
        </p>
      </div>
    </div>
    <RouterView name="modal" />
  </div>
</template>
