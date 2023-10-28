<script setup lang="ts">
import MeasurementForm from '@components/Measurements/Form.vue';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import type { MeasurementFormPayload, MeasurementFormProps } from '@project-types/measurement';
import { create as createMeasurement } from '@store/measurements';
import { create as createNote, update as updateNote } from '@store/notes';
import { vitals } from '@store/vitals';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<MeasurementFormProps>();

const vitalName = computed(() => {
  return vitals.value.find(vital => vital.id === props.vitalId)?.name;
});

/**
 * Submit Measurement form action
 */
const submit = (payload: MeasurementFormPayload) => {
  let noteId = undefined;

  if (payload.noteText) {
    noteId = createNote(Date.now(), payload.noteText, payload.personId);
    payload.noteId = noteId
  }

  const measurementId = createMeasurement(payload);

  // Update note with associated Measurement ID
  if (noteId && payload.noteText) {
    updateNote(noteId, payload.date, payload.noteText, measurementId);
  }

  router.push({
    name: 'PersonVital',
    params: { personId: payload.personId, vitalId: payload.vitalId },
  });
};
</script>

<template>
  <Dialog :open="true" @close="$router.back()" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-0 items-start justify-center overflow-y-auto">
      <DialogPanel class="bg-white w-full sm:max-w-xs rounded-2xl shadow-lg m-2 sm:mt-10">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3"
          >Add {{ vitalName }} Measurement</DialogTitle
        >
        <MeasurementForm @submit="submit" class="p-6" :vital-id="props.vitalId" :person-id="props.personId" />
      </DialogPanel>
    </div>
  </Dialog>
</template>
