<script setup lang="ts">
import { computed, ref } from 'vue';

/** Type `VitalFormProps` defined in Vital type declarations but unusable in Vue `defineProps` */
interface VitalFormProps {
  id?: string;
  name?: string;
  description?: string;
  unit?: string;
  low?: number;
  high?: number;
}

/** Type `VitalFormEmits` defined in Vital type declarations but unusable in Vue `defineEmits` */
interface VitalFormEmits {
  (e: 'submit', payload: PartialVital): void;
  (e: 'destroy'): void;
}

const props = defineProps<VitalFormProps>();

const emit = defineEmits<VitalFormEmits>();

const name = ref(props.name);
const description = ref(props.description);
const unit = ref(props.unit);
const low = ref(props.low);
const high = ref(props.high);

const isFormComplete = computed(() => {
  return name.value && name.value.length > 0 && unit.value && unit.value.length > 0;
});

const partialVital = computed<PartialVital>(() => {
  return {
    id: props.id,
    name: name.value,
    description: description.value,
    unit: unit.value,
    low: low.value ? Number(low.value) : undefined,
    high: high.value ? Number(high.value) : undefined,
  };
});
</script>

<template>
  <form @submit.prevent="emit('submit', partialVital)">
    <label for="name">Name</label>
    <input
      v-model="name"
      type="text"
      id="name"
      autocomplete="off"
      placeholder="ex. Heart rate"
      required />

    <label for="description">Description</label>
    <textarea v-model="description" id="description" placeholder="ex. Heart beats per minute." />

    <label for="unit">Unit of Measurement</label>
    <input
      v-model="unit"
      type="text"
      id="unit"
      placeholder="ex. bpm"
      autocapitalize="off"
      required />

    <h4 class="mb-2 mt-2 text-xs uppercase font-semibold">Range</h4>

    <label for="high">High value</label>
    <div class="input-group">
      <input v-model="high" type="text" id="high" inputmode="decimal" placeholder="ex. 101" />
      <span v-if="unit && unit.length > 0">{{ unit }}</span>
    </div>

    <label for="low">Low value</label>
    <div class="input-group">
      <input v-model="low" type="text" id="low" inputmode="decimal" placeholder="ex. 59" />
      <span v-if="unit && unit.length > 0">{{ unit }}</span>
    </div>

    <div class="grid grid-flow-col justify-end items-center gap-5 mt-6">
      <a
        v-if="props.id"
        @click="emit('destroy')"
        class="text-sm text-red-500 font-light cursor-pointer">
        Delete
      </a>
      <a @click="$router.back()" class="text-sm text-gray-500 font-light cursor-pointer">Cancel</a>
      <button type="submit" class="btn" :disabled="!isFormComplete">Save</button>
    </div>
  </form>
</template>
