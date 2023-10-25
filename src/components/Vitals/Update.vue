<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { vitals, update, destroy } from '@store/vitals';
import VitalForm from './Form.vue';

const route = useRoute();
const router = useRouter();

const vital = computed(() => {
  const vital = vitals.value.find(vital => vital.id === route.params.vitalId);

  if (!vital) throw new Error(`Could not find vital with ID: ${route.params.vitalId}.`);

  return vital;
});

const name = ref(vital.value.name);
const description = ref(vital.value.description);
const unit = ref(vital.value.unit);
const high = ref(vital.value.high);
const low = ref(vital.value.low);

/**
 * Update Vital
 */
const updateVital = (updatedVital: Vital) => {
  update(vital.value.id, updatedVital);
  router.back();
};

const destroyVital = () => {
  router.back();
  destroy(vital.value.id);
};
</script>

<template>
  <Dialog
    :open="true"
    @close="$router.push({ name: 'SettingsVitals' })"
    :initial-focus="null"
    class="relative z-50"
  >
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div class="fixed flex w-screen h-screen top-0 items-start justify-center overflow-y-auto">
      <DialogPanel class="bg-white w-full sm:max-w-xs rounded-2xl shadow-lg m-2 sm:mt-10">
        <DialogTitle as="h3" class="text-lg font-semibold border-b p-6 py-3"
          >Edit Vital</DialogTitle
        >
        <VitalForm
          class="p-6"
          @submit="updateVital"
          :name="name"
          :description="description"
          :unit="unit"
          :high="high"
          :low="low"
          @destroy="destroyVital"
          :deletable="true"
        />
      </DialogPanel>
    </div>
  </Dialog>
</template>
