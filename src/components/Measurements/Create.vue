<script setup>
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { useRoute, useRouter } from 'vue-router';
import { store as measurementStore } from '../../store/measurements';
import MeasurementForm from './Form.vue';
import { vitals } from '../../store/vitals';
import { computed } from 'vue';

const router = useRouter();
const route = useRoute();

const vital = computed(() => {
  return vitals.value.find(vital => vital.id === route.params.vitalId);
});

/**
 * Create Measurement
 * 
 * @param {import("../../typedefs").Measurement} measurement 
 */
const createMeasurement = (measurement) => {
  measurementStore.create(measurement);
  router.push({ name: 'PersonVital', params: { personId: measurement.personId, vitalId: measurement.vitalId } });
}
</script>

<template>
  <Dialog :open="true" @close="$router.back()" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-0 items-start justify-center overflow-y-auto">
      <DialogPanel class="bg-white w-full max-w-xs rounded-2xl shadow-lg my-10">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">Add {{ vital?.name }} Measurement</DialogTitle>
        <MeasurementForm @submit="createMeasurement" class="p-6" :person-id="String(route.params.personId)" :vital-id="String(route.params.vitalId)" />
      </DialogPanel>
    </div>
  </Dialog>
</template>
