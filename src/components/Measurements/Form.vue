<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';
import dayjs from 'dayjs';
import type {
  MeasurementFormEmits,
  MeasurementFormPayload,
  MeasurementFormProps,
} from '@project-types/measurement';
import { computed, ref, watch } from 'vue';
import { vitals } from '@store/vitals';

const props = withDefaults(defineProps<MeasurementFormProps>(), {
  date: Date.now(),
  deletable: false,
});

const emit = defineEmits<MeasurementFormEmits>();

const vitalId = ref(props.vitalId);
const value = ref(props.value);
const date = ref(dayjs(props.date).format('YYYY-MM-DDThh:mm'));
const noteText = ref(props.noteText);
const noteEnabled = ref(props.noteText !== undefined);

const isFormComplete = computed(() => {
  return value.value && date.value.length > 0;
});

const measurementFormPayload = computed<MeasurementFormPayload>(() => {
  return {
    value: Number(value.value),
    date: dayjs(date.value).valueOf(),
    vitalId: vitalId.value,
    noteText: noteText.value,
    personId: props.personId,
  };
});

const vital = computed(() => {
  return vitals.value.find(vital => vital.id === vitalId.value);
});

watch(
  () => props.noteText,
  () => {
    noteText.value = props.noteText;
  }
);
</script>

<template>
  <form @submit.prevent="emit('submit', measurementFormPayload)">
    <label v-if="!props.vitalId" for="vitalId">Vital</label>
    <select v-if="!props.vitalId" v-model="vitalId" id="vitalId" required>
      <option value="" disabled hidden>Choose vital</option>
      <option v-for="vital in vitals" :key="vital.id" :value="vital.id">{{ vital.name }}</option>
    </select>
    <label for="value">Value</label>
    <div class="input-group mb-3">
      <input v-model="value" type="text" id="value" inputmode="decimal" autocomplete="off" />
      <span v-if="vital">{{ vital.unit }}</span>
    </div>
    <label for="date">Date</label>
    <input v-model="date" type="datetime-local" id="date" required />
    <div v-if="props.noteText" class="pb-2">
      <label class="grid grid-cols-[auto_min-content]">
        Note
        <button
          v-if="props.noteText"
          class="text-red-500 text-xs uppercase hover:underline -mb-1.5"
          @click="emit('destroyNote')">
          Remove
        </button>
      </label>
      <div class="bg-gray-100 rounded-md p-3 px-4 pb-2">
        <p class="text-sm leading-tight">{{ noteText }}</p>
      </div>
    </div>
    <div v-else class="pb-2">
      <SwitchGroup
        as="div"
        class="grid grid-cols-[auto_min-content] items-center justify-end gap-4 mt-2">
        <SwitchLabel class="mb-0">Add note</SwitchLabel>
        <Switch v-model="noteEnabled" :class="noteEnabled ? 'active' : ''" class="switch">
          <span />
        </Switch>
      </SwitchGroup>
      <div v-if="noteEnabled">
        <label for="note-text" class="grid grid-cols-[auto_min-content]">Note</label>
        <textarea v-model="noteText" id="note-text" class="leading-tight h-28" />
      </div>
    </div>
    <div class="grid grid-flow-col justify-end items-center gap-5 mt-4">
      <a
        v-if="deletable"
        @click="emit('destroy')"
        class="text-sm text-red-500 font-light cursor-pointer">
        Delete
      </a>
      <a @click="$router.back()" class="text-sm text-gray-500 font-light cursor-pointer">Cancel</a>
      <button type="submit" class="btn" :disabled="!isFormComplete">Save</button>
    </div>
  </form>
</template>
