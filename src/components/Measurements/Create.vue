<script setup lang="ts">
import MeasurementForm from '@components/Measurements/Form.vue';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { create } from '@store/measurements';
import { notes, update as updateNote } from '@store/notes';
import { vitals } from '@store/vitals';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
  personId: string;
  vitalId?: string;
}>();

const vitalName = computed(() => {
  return vitals.value.find(vital => vital.id === props.vitalId)?.name;
});

/**
 * Submit Measurement form action
 */
const createMeasurement = (partialMeasurement: PartialMeasurement) => {
  try {
    const measurementId = create(partialMeasurement);

    if (partialMeasurement.noteId) {
      const note = notes.value.find(note => note.id === partialMeasurement.noteId);
      if (!note) throw new Error('Note not found.');
      updateNote({ id: note.id, text: note.text, date: note.date, measurementId });
    }
  } catch(e) {
    console.log(e);
  }

  router.push({
    name: 'PersonVital',
    params: { personId: props.personId, vitalId: partialMeasurement.vitalId },
  });
};
</script>

<template>
  <Dialog :open="true" @close="$router.back()" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-0 items-start justify-center overflow-y-auto">
      <DialogPanel class="bg-white w-full sm:max-w-xs rounded-2xl shadow-lg m-2 sm:mt-10">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">
          Add {{ vitalName }} Measurement
        </DialogTitle>
        <MeasurementForm
          @submit="createMeasurement"
          class="p-6"
          :vital-id="props.vitalId"
          :person-id="props.personId" />
      </DialogPanel>
    </div>
  </Dialog>
</template>
