<script setup>
import { ArrowSmallDownIcon, ArrowSmallUpIcon } from '@heroicons/vue/20/solid';
import { useRoute } from 'vue-router';

const props = defineProps({
  measurement: {
    /** @type {import('vue').PropType<import("../../../typedefs").Measurement>} */
    type: Object,
    required: true
  },
  vital: {
    /** @type {import('vue').PropType<import("../../../typedefs").Vital>} */
    type: Object,
    required: true
  }
});

</script>

<template>
  <div
    class="grid bg-gray-200 p-3 px-4 gap-2 md:gap-10 rounded-md hover:shadow hover:bg-gray-100 cursor-pointer transition-all mt-2"
    @click.stop="$router.push({ name: 'PersonVital', params: { vitalId: props.vital.id }, query: { measurementId: props.measurement.id }})"
  >
    <div>
      <h3 class="font-semibold">
        {{ Number(measurement.value).toLocaleString() }}
        <span class="text-xs text-gray-500 font-light mr-3">{{ vital.unit }}</span>
        <span v-if="vital.high && measurement.value >= Number(vital.high)"
          class="border border-amber-200 p-1 py-0 pl-0 pr-1.5 rounded-lg text-amber-500 bg-amber-100 text-xs font-normal cursor-default whitespace-nowrap"><ArrowSmallUpIcon class="inline w-4 h-4 -mt-1" />High</span>
        <span v-if="vital.low && measurement.value <= Number(vital.low)"
          class="border border-amber-200 p-1 py-0 pl-0 pr-1.5 rounded-lg text-amber-500 bg-amber-100 text-xs font-normal cursor-default whitespace-nowrap"><ArrowSmallDownIcon class="inline w-4 h-4 -mt-0.5" />Low</span>
      </h3>
    </div>
  </div>
</template>
