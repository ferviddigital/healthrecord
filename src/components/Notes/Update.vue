<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import NoteForm from './Form.vue';
import { notes, update, destroy } from '@store/notes';

const router = useRouter();

const props = defineProps<{
  noteId: string;
}>();

const note = computed(() => {
  const note = notes.value.find(note => note.id === props.noteId);
  if (!note) throw Error(`Could not find Note with ID: ${props.noteId}.`);
  return note;
});

/**
 * Submit Measurement form action
 */
const updateNote = (partialNote: PartialNote) => {
  try {
    update(partialNote);
  } catch (e) {
    console.log(e);
  }

  router.back();
};

const destroyNote = () => {
  setTimeout(() => {
    destroy(props.noteId);
  }, 150);

  router.back();
};
</script>

<template>
  <Dialog :open="true" @close="$router.back()" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-0 items-start justify-center overflow-y-auto">
      <DialogPanel class="bg-white w-full sm:max-w-xs rounded-2xl shadow-lg m-2 sm:mt-10">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">Edit Note</DialogTitle>
        <NoteForm
          class="p-6"
          @submit="updateNote"
          @destroy="destroyNote"
          :id="note.id"
          :date="note.date"
          :text="note.text"
          :person-id="note.personId"
          :measurement-id="note.measurementId"/>
      </DialogPanel>
    </div>
  </Dialog>
</template>
