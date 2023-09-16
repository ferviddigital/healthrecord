<script setup>
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { useRouter } from 'vue-router';
import { store as vitalsStore } from '../../../store/vitals';
import VitalForm from './Form.vue';

const router = useRouter();

const addVital = (vital) => {
  vitalsStore.add(vital);
  router.push({name: 'Vitals'});
}
</script>

<template>
  <Dialog :open="true" @close="$router.push({ name: 'Vitals' })" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-10 items-start md:items-center justify-center">
      <DialogPanel class="bg-white w-full max-w-xs rounded-2xl shadow-lg">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">Add Vital</DialogTitle>
        <VitalForm @submit="addVital" class="p-6" />
      </DialogPanel>
    </div>
  </Dialog>
</template>
