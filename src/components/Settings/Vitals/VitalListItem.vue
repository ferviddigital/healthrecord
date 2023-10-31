<script setup lang="ts">
const props = defineProps<{
  vital: Vital
}>();
</script>

<template>
  <div
    class="grid min-h-[10em] bg-gray-50 shadow-sm hover:shadow-md hover:bg-white cursor-pointer p-3 rounded-xl transition-all"
    @click="$router.push({ name: 'SettingsVitalUpdate', params: { vitalId: props.vital.id } })"
  >
    <div class="grid order-2 content-end">
      <h3 class="font-semibold mb-1">
        {{ props.vital.name }} <span class="text-xs text-gray-400 font-light">({{ props.vital.unit }})</span>
      </h3>
      <p class="text-gray-400 text-sm self-end">{{ props.vital.description }}</p>
    </div>
  </div>
</template>
