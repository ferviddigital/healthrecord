<script setup lang="ts">
import VitalForm from '@components/Settings/Vitals/Form.vue';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { destroy, update, vitals } from '@store/vitals';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
  vitalId: string;
}>();

const vital = computed(() => {
  const targetVital = vitals.value.find(vital => vital.id === props.vitalId);
  if (!targetVital) throw Error(`Could not find Vital with ID: ${props.vitalId}.`);
  return targetVital;
});

/**
 * Update Vital
 */
const updateVital = (partialVital: PartialVital) => {
  try {
    update(partialVital);
  } catch (e) {
    console.log(e);
  }

  router.back();
};

/**
 * Destroy Vital
 */
const destroyVital = () => {
  setTimeout(() => {
    destroy(props.vitalId);
  }, 150);

  router.back();
};
</script>

<template>
  <Dialog :open="true" @close="$router.push({ name: 'SettingsVitals' })" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-0 items-start justify-center overflow-y-auto">
      <DialogPanel class="bg-white w-full sm:max-w-xs rounded-2xl shadow-lg m-2 sm:mt-10">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3">
          Edit Vital
        </DialogTitle>
        <VitalForm
          class="p-6"
          @submit="updateVital"
          @destroy="destroyVital"
          :id="vital.id"
          :name="vital.name"
          :description="vital.description"
          :unit="vital.unit"
          :low="vital.low"
          :high="vital.high" />
      </DialogPanel>
    </div>
  </Dialog>
</template>
