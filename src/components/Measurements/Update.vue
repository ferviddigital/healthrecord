<script setup lang="ts">
import MeasurementForm from '@components/Measurements/Form.vue';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { destroy, measurements, update } from '@stores/measurements';
import { vitals } from '@stores/vitals';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
  measurementId: string;
  personId: string;
  vitalId: string;
}>();

const measurement = computed(() => {
  const measurement = measurements.value.find(
    measurement => measurement.id === props.measurementId
  );
  if (!measurement) throw new Error('Measurement not found.');
  return measurement;
});

const vital = computed(() => {
  const vital = vitals.value.find(vital => vital.id === props.vitalId);
  if (!vital) throw new Error('Vital not found');
  return vital;
});

const updateMeasurement = (partialMeasurement: PartialMeasurement) => {
  try {
    update(partialMeasurement);
  } catch (e) {
    console.log(e);
  }

  router.back();
};

const destroyMeasurement = () => {
  setTimeout(() => {
    destroy(props.measurementId);
  }, 150);

  router.back();
};
</script>

<template>
  <Dialog :open="true" @close="$router.back()" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-0 items-start justify-center overflow-y-auto">
      <DialogPanel class="bg-white w-full sm:max-w-xs rounded-2xl shadow-lg m-2 sm:mt-10">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">
          Edit {{ vital.name }} Measurement
        </DialogTitle>
        <MeasurementForm
          class="p-6"
          @submit="updateMeasurement"
          @destroy="destroyMeasurement"
          :id="measurement.id"
          :value="measurement.value"
          :date="measurement.date"
          :vital-id="props.vitalId"
          :person-id="props.personId"
          :note-id="measurement.noteId" />
      </DialogPanel>
    </div>
  </Dialog>
</template>
