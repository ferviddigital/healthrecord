<script setup>
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { measurements, store as measurementStore } from '../../../store/measurements';
import MeasurementForm from './Form.vue';

const route   = useRoute();
const router  = useRouter();

const measurement = computed(() => {
  return measurements.value.find(measurement => measurement.id === route.params.measurementId);
});

const value     = ref(measurement.value.value);
const date      = ref(measurement.value.date);
const personId  = ref(measurement.value.personId);
const vitalId   = ref(measurement.value.vitalId);

const editMeasurement = (measurement) => {
  measurementStore.edit(route.params.measurementId, measurement);
  router.back();
}
</script>

<template>
  <Dialog :open="true" @close="$router.back()" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-10 items-start justify-center">
      <DialogPanel class="bg-white w-full max-w-xs rounded-2xl shadow-lg">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">Edit Measurement</DialogTitle>
        <MeasurementForm class="p-6" @submit="editMeasurement" :value="value" :date="date" :personId="personId" :vitalId="vitalId" />
      </DialogPanel>
    </div>
  </Dialog>
</template>
