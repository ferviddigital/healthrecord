<script setup>
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { useRouter } from 'vue-router';
import { store as measurementStore } from '../../../store/measurements';
import MeasurementForm from './Form.vue';

const router = useRouter();

const addMeasurement = (measurement) => {
  measurementStore.add(measurement);
  router.push({name: 'Measurements'});
}
</script>

<template>
  <Dialog :open="true" @close="$router.push({ name: 'Measurements' })" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-10 items-start md:items-center justify-center">
      <DialogPanel class="bg-white w-full max-w-xs rounded-2xl shadow-lg">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">Add Measurement</DialogTitle>
        <MeasurementForm @submit="addMeasurement" class="p-6" />
      </DialogPanel>
    </div>
  </Dialog>
</template>
