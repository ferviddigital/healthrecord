<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';
import dayjs from 'dayjs';
import { computed, ref } from 'vue';
import { vitals } from '@store/vitals';
import { notes, destroy as destroyNote, create as createNote } from '@store/notes';

/** Type `MeasurementFormProps` defined in Measurement type declarations but unusable in Vue `defineProps` */
interface MeasurementFormProps {
  id?: string;
  created?: number;
  updated?: number;
  value?: number;
  date?: number;
  personId?: string;
  vitalId?: string;
  noteId?: string;
}

/** Type `MeasurementFormEmits` defined in Measurement type declarations but unusable in Vue `defineEmits` */
interface MeasurementFormEmits {
  (e: 'submit', payload: PartialMeasurement): void;
  (e: 'destroy'): void;
}

const props = defineProps<MeasurementFormProps>();

const emit = defineEmits<MeasurementFormEmits>();

const value = ref(props.value);
const date = ref(dayjs(props.date).format('YYYY-MM-DDThh:mm'));
const vitalId = ref(props.vitalId);
const noteId = ref(props.noteId);

const noteEnabled = ref(noteId.value !== undefined);
const noteText = ref();

const isFormComplete = computed(() => {
  return value.value && date.value.length > 0;
});

const measurementFormPayload = computed<PartialMeasurement>(() => {
  return {
    id: props.id,
    value: Number(value.value),
    date: dayjs(date.value).valueOf(),
    vitalId: vitalId.value,
    personId: props.personId,
    noteId: noteId.value,
  };
});

const vital = computed(() => {
  return vitals.value.find(vital => vital.id === vitalId.value);
});

const note = computed(() => {
  return notes.value.find(note => note.id === noteId.value);
});

const submit = () => {
  if (noteText.value) {

    const partialNote: PartialNote = {
      date: Date.now(),
      text: noteText.value,
      personId: props.personId,
      measurementId: props.id,
    }

    noteId.value = createNote(partialNote);
  }
  emit('submit', measurementFormPayload.value);
};
</script>

<template>
  <form @submit.prevent="submit">
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
    <div v-if="note" class="pb-2">
      <label class="grid grid-cols-[auto_min-content]">
        Note
        <button
          class="text-red-500 text-xs uppercase hover:underline -mb-1.5"
          @click="destroyNote(note.id); noteId = undefined; noteEnabled = false;">
          Remove
        </button>
      </label>
      <div class="bg-gray-100 rounded-md p-3 px-4 pb-2">
        <p class="text-sm leading-tight">{{ noteText || note.text }}</p>
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
