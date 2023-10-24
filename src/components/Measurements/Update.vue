<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import type { MeasurementFormPayload, MeasurementUpdateProps } from 'src/types/measurement';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  destroy as destroyMeasurement,
  measurements,
  update as updateMeasurement,
} from '../../store/measurements';
import { create as createNote, destroy as destroyNote, notes } from '../../store/notes';
import { vitals } from '../../store/vitals';
import MeasurementForm from './Form.vue';

const router = useRouter();

const props = defineProps<MeasurementUpdateProps>();

const measurement = computed(() => {
  const measurement = measurements.value.find(
    measurement => measurement.id === props.measurementId
  );
  if (!measurement) throw new Error('Measurement not found.');
  return measurement;
});

const value = ref(measurement.value.value);
const date = ref(measurement.value.date);

const vital = computed(() => {
  const vital = vitals.value.find(vital => vital.id === props.vitalId);
  if (!vital) throw new Error('Vital not found.');
  return vital;
});

const noteText = computed(() => {
  if (!measurement.value.noteId) return undefined;
  return notes.value.find(note => note.id === measurement.value.noteId)?.text;
});

const submit = ({ value, date, noteText, personId }: MeasurementFormPayload) => {
  router.back();
  let noteId = undefined;

  if (!measurement.value.noteId && noteText) {
    noteId = createNote(Date.now(), noteText, personId, props.measurementId);
  }

  updateMeasurement(props.measurementId, date, value, noteId);
};

const destroy = () => {
  router.back();
  setTimeout(() => {
    destroyMeasurement(props.measurementId);
  }, 100);
};
</script>

<template>
  <Dialog :open="true" @close="$router.back()" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-0 items-start justify-center overflow-y-auto">
      <DialogPanel class="bg-white w-full sm:max-w-xs rounded-2xl shadow-lg m-2 sm:mt-10">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3"
          >Edit {{ vital.name }} Measurement</DialogTitle
        >
        <MeasurementForm
          class="p-6"
          @submit="submit"
          @destroy="destroy"
          @destroy-note="measurement.noteId ? destroyNote(measurement.noteId) : null"
          :value="value"
          :date="date"
          :vital-id="props.vitalId"
          :note-text="noteText"
          :person-id="props.personId"
          :deletable="true"
        />
      </DialogPanel>
    </div>
  </Dialog>
</template>
