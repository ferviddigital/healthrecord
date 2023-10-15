<script setup>
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import NoteForm from './Form.vue';
import { notes, update as updateNote, destroy as destroyNote } from '../../store/notes';

const route   = useRoute();
const router  = useRouter();

const note = computed(() => {
  const note = notes.value.find(note => note.id === noteId.value);

  if (! note) throw Error(`Could not find Note with ID: ${route.params.noteId}.`);

  return note;
});

const noteId = ref(String(route.params.noteId));
const date = ref(note.value.date);
const text = ref(note.value.text);

/**
 * Submit Measurement form action
 * @param {import('../../typedefs').NotePayload} params 
 */
const submit = ({date, text}) => {
  router.back();
  updateNote(noteId.value, date, text, note.value.measurementId);
}

const destroy = () => {
  router.back();
  setTimeout(()=> {
    destroyNote(noteId.value);
  }, 100);
}
</script>

<template>
  <Dialog :open="true" @close="$router.back()" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-0 items-start justify-center overflow-y-auto">
      <DialogPanel class="bg-white w-full sm:max-w-xs rounded-2xl shadow-lg m-2 sm:mt-10">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">Edit Note</DialogTitle>
        <NoteForm class="p-6" @submit="submit" @destroy="destroy" :date="date" :text="text" :deletable="true" />
      </DialogPanel>
    </div>
  </Dialog>
</template>
