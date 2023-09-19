<script setup>
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { useRouter } from 'vue-router';
import { store as peopleStore } from '../../../store/people';
import PersonForm from './Form.vue';

const router = useRouter();

const addPerson = (person) => {
  peopleStore.add(person);
  router.push({name: 'People'});
}
</script>

<template>
  <Dialog :open="true" @close="$router.push({ name: 'People' })" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-10 items-start justify-center">
      <DialogPanel class="bg-white w-full max-w-xs rounded-2xl shadow-lg">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">Add Person</DialogTitle>
        <PersonForm @submit="addPerson" class="p-6" />
      </DialogPanel>
    </div>
  </Dialog>
</template>
