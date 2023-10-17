<script setup>
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { useRouter } from 'vue-router';
import { store as vitalsStore } from '../../store/vitals';
import VitalForm from './Form.vue';

const router = useRouter();

/**
 * Create Vital
 * 
 * @param {import("../../typedefs").Vital} vital 
 */
const createVital = (vital) => {
  vitalsStore.create(vital);
  router.push({ name: 'Vitals' });
}
</script>

<template>
  <Dialog :open="true" @close="$router.push({ name: 'Vitals' })" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-0 items-start justify-center overflow-y-auto">
      <DialogPanel class="bg-white w-full sm:max-w-xs rounded-2xl shadow-lg m-2 sm:mt-10">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">Add Vital</DialogTitle>
        <VitalForm @submit="createVital" class="p-6" />
      </DialogPanel>
    </div>
  </Dialog>
</template>
