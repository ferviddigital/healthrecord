<script setup lang="ts">
import { LogEntry, MeasurementLogEntry, NoteLogEntry } from '../../classes/logEntry';
import { ChartBarIcon, DocumentTextIcon } from '@heroicons/vue/20/solid';
import dayjs from 'dayjs';
import MeasurementLogItem from '@components/Logbook/MeasurementLogItem.vue';
import NoteLogItem from '@components/Logbook/NoteLogItem.vue';

const props = defineProps<{
  logEntry: LogEntry;
}>();
</script>

<template>
  <div class="grid grid-cols-[min-content_auto] gap-3 items-start">
    <ChartBarIcon class="h-5 w-5 mt-4" v-if="(props.logEntry instanceof MeasurementLogEntry)" />
    <DocumentTextIcon class="h-5 w-5 mt-4" v-else-if="(props.logEntry instanceof NoteLogEntry)" />
    <div class="bg-gray-50 shadow-sm p-4 rounded-xl">
      <p class="leading-tight">
        A <span class="font-semibold">{{ props.logEntry.description }}</span> was logged on
        {{ dayjs(logEntry.date).format('MMM D, YYYY') }}.
        <span v-if="(props.logEntry instanceof MeasurementLogEntry) && props.logEntry.note"
          >A <span class="font-semibold">note</span> was added:</span
        >
      </p>
      <MeasurementLogItem
        v-if="(props.logEntry instanceof MeasurementLogEntry)"
        :measurement="props.logEntry.measurement"
        :vital="props.logEntry.vital!"
      />
      <NoteLogItem v-if="props.logEntry.note" :note="props.logEntry.note" />
    </div>
  </div>
</template>
