<script setup>
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { useRouter } from 'vue-router';
import { create as createNote } from '@store/notes';
import NoteForm from './Form.vue';
import { selectedPerson } from '@store/person';

const router = useRouter();

/**
 * Submit Measurement form action
 * @param {import('../../typedefs').NotePayload} params - Measurement payload
 */
const submit = ({ date, text }) => {
  router.back();
  createNote(date, text, selectedPerson.value.id);
};
</script>

<template>
  <Dialog :open="true" @close="$router.back()" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-0 items-start justify-center overflow-y-auto">
      <DialogPanel class="bg-white w-full sm:max-w-xs rounded-2xl shadow-lg m-2 sm:mt-10">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">Add Note</DialogTitle>
        <NoteForm @submit="submit" class="p-6" />
      </DialogPanel>
    </div>
  </Dialog>
</template>
