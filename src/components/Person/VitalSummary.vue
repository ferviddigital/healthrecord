<script setup>
import { VitalInsightsSummary } from '../../insights/insight';

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
  <div>
    <p class="mb-5 p-3 px-4 rounded-xl text-sm leading-tight md:leading-snug bg-gray-300 text-gray-500">
      {{ summary.description }}
    </p>
  </div>
</template>
