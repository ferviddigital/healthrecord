<script setup>
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { useRouter } from 'vue-router';
import { create as createMeasurement } from '../../store/measurements';
import { create as createNote, update as updateNote } from '../../store/notes';
import MeasurementForm from './Form.vue';
import { selectedPerson } from '../../store/person';
import { computed } from 'vue';
import { vitals } from '../../store/vitals';

const router = useRouter();

const props = defineProps({
  vitalId: {
    type: String,
    default: null
  }
});

const vitalName = computed(() => {
  if (!props.vitalId) return
  return vitals.value.find(vital => vital.id === props.vitalId).name;
});

/**
 * Submit Measurement form action
 * @param {import('../../typedefs').MeasurementPayload} params - Measurement payload
 */
const submit = ({date, value, vitalId, noteText}) => {
  let noteId = null;

  if (noteText) {
    noteId = createNote(date, noteText, selectedPerson.value.id);
  }

  const measurementId = createMeasurement(date, value, selectedPerson.value.id, vitalId, noteId);

  // Update note with associated Measurement ID
  if (noteId) {
    updateNote(noteId, date, noteText, measurementId);
  }

  router.push({ name: 'PersonVital', params: { personId: selectedPerson.value.id, vitalId } });
}
</script>

<template>
  <Dialog :open="true" @close="$router.back()" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-0 items-start justify-center overflow-y-auto">
      <DialogPanel class="bg-white w-full sm:max-w-xs rounded-2xl shadow-lg m-2 sm:mt-10">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">Add {{ vitalName }} Measurement</DialogTitle>
        <MeasurementForm @submit="submit" class="p-6" :vital-id="vitalId" />
      </DialogPanel>
    </div>
  </Dialog>
</template>
