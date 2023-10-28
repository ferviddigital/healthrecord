<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { computed } from 'vue';
import { notes } from '@store/notes';

const props = defineProps<{
  noteId: string;
  vitalId?: string;
}>();

const note = computed(() => {
  const note = notes.value.find(note => note.id === props.noteId);

  if (!note) throw Error(`Could not find Note with ID: ${props.noteId}.`);

  return note;
});

const routeName = computed(() => {
  return props.vitalId ? 'VitalMeasurementNoteUpdate' : 'PersonNoteUpdate';
});
</script>

<template>
  <Dialog :open="true" @close="$router.back()" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-0 items-start justify-center overflow-y-auto">
      <DialogPanel class="bg-white w-full sm:max-w-xs rounded-2xl shadow-lg m-2 sm:mt-10">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">Note</DialogTitle>
        <p class="p-6 pb-0 py-3">{{ note.text }}</p>
        <div class="grid grid-flow-col justify-end items-center gap-5 mt-4 p-6">
          <a
            @click="$router.push({ name: routeName, params: { noteId: note.id } })"
            class="text-sm text-gray-500 font-light cursor-pointer">
            Edit
          </a>
          <button class="btn" @click="$router.back()">Done</button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>
