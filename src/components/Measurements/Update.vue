<script setup>
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { computed, ref } from 'vue';
import {  useRouter } from 'vue-router';
import { destroy as destroyMeasurement, measurements, update as updateMeasurement } from '../../store/measurements';
import { vitals } from '../../store/vitals';
import MeasurementForm from './Form.vue';
import { notes, create as createNote, destroy as destroyNote } from '../../store/notes';

const router  = useRouter();

const props = defineProps({
  measurementId: {
    type: String,
    required: true
  }
});

const measurement = computed(() => {
  return measurements.value.find(measurement => measurement.id === props.measurementId)
})

const value     = ref(measurement.value.value);
const date      = ref(measurement.value.date);

const vital = computed(() => {
  return vitals.value.find(vital => vital.id === measurement.value.vitalId);
});

const noteText = computed(() => {
  if (!measurement.value.noteId) return null;
  return notes.value.find(note => note.id === measurement.value.noteId).text;
});

/**
 * Submit Measurement form action
 * @param {import('../../typedefs').MeasurementPayload} params 
 */
const submit = ({value, date, vitalId, noteText}) => {
  router.back();
  let noteId = null;

  if (!measurement.value.noteId && noteText) {
    noteId = createNote(Date.now(), noteText, measurement.value.personId, props.measurementId);
  }
  updateMeasurement(props.measurementId, date, value, noteId);
}

const destroy = () => {
  router.back();
  setTimeout(()=> {
    destroyMeasurement(props.measurementId);
  }, 100);
}
</script>

<template>
  <Dialog :open="true" @close="$router.back()" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-0 items-start justify-center overflow-y-auto">
      <DialogPanel class="bg-white w-full sm:max-w-xs rounded-2xl shadow-lg m-2 sm:mt-10">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">Edit {{ vital.name }} Measurement</DialogTitle>
        <MeasurementForm class="p-6" @submit="submit" @destroy="destroy" @destroyNote="destroyNote(measurement.noteId)" :value="value" :date="date" :vitalId="measurement.vitalId" :noteText="noteText" :deletable="true" />
      </DialogPanel>
    </div>
  </Dialog>
</template>
