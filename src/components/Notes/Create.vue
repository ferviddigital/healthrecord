<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { useRouter } from 'vue-router';
import { create } from '@store/notes';
import NoteForm from './Form.vue';

const router = useRouter();

const props = defineProps<{
  personId: string;
}>();

/**
 * Create Note
 */
const createNote = (partialNote: PartialNote) => {
  try {
    create(partialNote);
  } catch (e) {
    console.log(e);
  }
  router.back();
};
</script>

<template>
  <Dialog :open="true" @close="$router.back()" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-0 items-start justify-center overflow-y-auto">
      <DialogPanel class="bg-white w-full sm:max-w-xs rounded-2xl shadow-lg m-2 sm:mt-10">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">Add Note</DialogTitle>
        <NoteForm @submit="createNote" :person-id="props.personId" class="p-6" />
      </DialogPanel>
    </div>
  </Dialog>
</template>
