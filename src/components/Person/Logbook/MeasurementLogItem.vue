<script setup>
import LowHighBadge from '../../Measurements/LowHighBadge.vue';

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
        <LowHighBadge :vital="vital" :measurement="measurement" />
      </h3>
    </div>
  </div>
</template>
