<script setup lang="ts">
import { ArrowSmallDownIcon, ArrowSmallUpIcon } from '@heroicons/vue/20/solid';

const props = defineProps<{
  vital: Vital;
  measurement: Measurement;
}>();
</script>

<template>
  <span
    v-if="props.vital.high && props.measurement.value >= Number(props.vital.high)"
    class="border border-amber-200 p-1 py-0 pl-0 pr-1.5 rounded-lg text-amber-500 bg-amber-100 text-xs font-normal cursor-default whitespace-nowrap"
  >
    <ArrowSmallUpIcon class="inline w-4 h-4 -mt-1" />High
  </span>
  <span
    v-else-if="props.vital.low && props.measurement.value <= Number(props.vital.low)"
    class="border border-amber-200 p-1 py-0 pl-0 pr-1.5 rounded-lg text-amber-500 bg-amber-100 text-xs font-normal cursor-default whitespace-nowrap"
  >
    <ArrowSmallDownIcon class="inline w-4 h-4 -mt-0.5" />Low
  </span>
</template>
