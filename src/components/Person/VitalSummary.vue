<script setup>
import { SparklesIcon } from '@heroicons/vue/24/solid';
import { VitalInsightsSummary } from '../../classes/insight';

const props = defineProps({
  person: {
    /** @type {import('vue').PropType<import("../../typedefs").Person>} */
    type: Object,
    required: true
  }
});

const summary = new VitalInsightsSummary(props.person);

</script>

<template>
  <div class="grid grid-cols-[min-content_auto] gap-3 mb-5 p-3 px-4 rounded-xl bg-indigo-50">
    <SparklesIcon class="h-6 w-6 mt-1 text-indigo-600" />
    <p class="text-sm leading-tight md:leading-snug text-indigo-500">
      {{ summary.description }}
    </p>
  </div>
</template>
