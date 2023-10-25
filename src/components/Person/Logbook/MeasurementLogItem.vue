<script setup lang="ts">
import LowHighBadge from '../../Measurements/LowHighBadge.vue';

const props = defineProps<{
  measurement: Measurement;
  vital: Vital;
}>();
</script>

<template>
  <div
    class="grid bg-gray-200 p-3 px-4 gap-2 md:gap-10 rounded-md hover:shadow hover:bg-gray-100 cursor-pointer transition-all mt-2"
    @click.stop="
      $router.push({
        name: 'PersonVital',
        params: { vitalId: props.vital.id },
        query: { measurementId: props.measurement.id },
      })
    "
  >
    <div>
      <h3 class="font-semibold">
        {{ Number(props.measurement.value).toLocaleString() }}
        <span class="text-xs text-gray-500 font-light mr-3">{{ props.vital.unit }}</span>
        <LowHighBadge :vital="props.vital" :measurement="props.measurement" />
      </h3>
    </div>
  </div>
</template>
