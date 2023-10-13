<script setup>
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { measurements, store as measurementStore } from '../../store/measurements';
import { vitals } from '../../store/vitals';
import MeasurementForm from './Form.vue';

const route   = useRoute();
const router  = useRouter();

const measurement = computed(() => {
  const measurement = measurements.value.find(measurement => measurement.id === route.params.measurementId);

  if (! measurement) throw Error(`Could not find measurement with ID: ${route.params.measurementId}.`);

  return measurement
});

const value     = ref(measurement.value.value);
const date      = ref(measurement.value.date);

const vital = computed(() => {
  return vitals.value.find(vital => vital.id === measurement.value.vitalId);
});

/**
 * Update Measurement
 * 
 * @param {import("../../typedefs").Measurement} updatedMeasurement 
 */
const updateMeasurement = (updatedMeasurement) => {
  router.back();
  measurementStore.update(measurement.value.id, updatedMeasurement);
}

/**
 * Delete Measurement
 * 
 * @param {string} measurementId Measurement ID
 */
const deleteMeasurement = (measurementId) => {
  router.back();
  setTimeout(()=> {
    measurementStore.delete(measurementId);
  }, 100);
}
</script>

<template>
  <Dialog :open="true" @close="$router.back()" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-0 items-start justify-center overflow-y-auto">
      <DialogPanel class="bg-white w-full max-w-xs rounded-2xl shadow-lg my-10">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">Edit {{ vital.name }} Measurement</DialogTitle>
        <MeasurementForm class="p-6" @submit="updateMeasurement" @delete="deleteMeasurement" :value="value" :date="date" :personId="measurement.personId" :vitalId="measurement.vitalId" :deletable="true" />
      </DialogPanel>
    </div>
  </Dialog>
</template>
