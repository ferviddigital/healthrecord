<script setup>
import { LogEntry, MeasurementLogEntry, NoteLogEntry } from '../../../classes/logEntry';
import { ChartBarIcon, DocumentTextIcon } from '@heroicons/vue/20/solid';
import dayjs from 'dayjs';
import MeasurementLogItem from './MeasurementLogItem.vue';
import NoteLogItem from './NoteLogItem.vue'

const props = defineProps({
  logEntry: {
    /** @type {import('vue').PropType<LogEntry>} */
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="grid grid-cols-[min-content_auto] gap-3 items-start">
    <ChartBarIcon class="h-5 w-5 mt-4" v-if="(logEntry instanceof MeasurementLogEntry)" />
    <DocumentTextIcon class="h-5 w-5 mt-4" v-else-if="(logEntry instanceof NoteLogEntry)" />
    <div class="bg-gray-50 shadow-sm p-4 rounded-xl">
      <p class="leading-tight">
        A <span class="font-semibold">{{ logEntry.objectType }}</span> was logged on {{ dayjs(logEntry.date).format('MMM D, YYYY') }}.
        <span v-if="logEntry instanceof MeasurementLogEntry && logEntry.note">A <span class="font-semibold">note</span> was added:</span>
      </p>
      <MeasurementLogItem v-if="(logEntry instanceof MeasurementLogEntry)" :measurement="logEntry.measurement" :vital="logEntry.vital" />
      <NoteLogItem v-if="logEntry.note" :note="logEntry.note" />
    </div>
  </div>
</template>