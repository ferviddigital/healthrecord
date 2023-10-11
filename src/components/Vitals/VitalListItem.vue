<script setup>
const props = defineProps({
  vital: {
    /** @type {import('vue').PropType<import("../../typedefs").Vital>} */
    type: Object,
    required: true
  }
});
</script>

<template>
  <div
    class="grid min-h-[10em] bg-gray-50 shadow-sm hover:shadow-md hover:bg-white cursor-pointer p-3 rounded-xl transition-all"
    @click="$router.push({ name: 'VitalUpdate', params: { vitalId: vital.id }});"
  >
    <div class="grid order-2 content-end">
      <h3 class="font-semibold mb-1">{{ vital.name }} <span class="text-xs text-gray-400 font-light">({{ vital.unit }})</span></h3>
      <p class="text-gray-400 text-sm self-end">{{ vital.description }}</p>
    </div>
  </div>
</template>
