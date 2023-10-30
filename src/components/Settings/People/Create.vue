<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { useRouter } from 'vue-router';
import { create } from '@stores/people';
import PersonForm from './Form.vue';
import { selectedPersonId } from '@stores/person';

const router = useRouter();

/**
 * Create Person
 */
const createPerson = (person: PartialPerson) => {
  const personId = create(person);
  selectedPersonId.value = personId;
  router.push({ name: 'Person', params: { personId } });
}
</script>

<template>
  <Dialog :open="true" @close="$router.push({ name: 'SettingsPeople' })" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-0 items-start justify-center overflow-y-auto">
      <DialogPanel class="bg-white w-full sm:max-w-xs rounded-2xl shadow-lg m-2 sm:mt-10">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">Add Person</DialogTitle>
        <PersonForm @submit="createPerson" class="p-6" />
      </DialogPanel>
    </div>
  </Dialog>
</template>
