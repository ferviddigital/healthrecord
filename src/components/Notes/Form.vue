<script setup lang="ts">
import { computed, ref } from 'vue';
import dayjs from 'dayjs';

/** Type `NoteFormProps` defined in Note type declarations but unusable in Vue `defineProps` */
interface NoteFormProps {
  id?: string;
  created?: number;
  updated?: number;
  text?: string;
  date?: number;
  personId?: string;
  measurementId?: string;
}

/** Type `NoteFormEmits` defined in Note type declarations but unusable in Vue `defineEmits` */
interface NoteFormEmits {
  (e: 'submit', payload: PartialNote): void;
  (e: 'destroy'): void;
}

const props = defineProps<NoteFormProps>();

const emit = defineEmits<NoteFormEmits>();

const text = ref(props.text);
const date = ref(dayjs(props.date ? props.date : undefined).format('YYYY-MM-DDThh:mm'));
const personId = ref(props.personId);

const isFormComplete = computed(() => {
  return text.value && text.value.length > 0;
});

const partialNote = computed<PartialNote>(() => {
  return {
    id: props.id,
    text: text.value,
    date: dayjs(date.value).valueOf(),
    personId: personId.value,
    measurementId: props.measurementId,
  };
});
</script>

<template>
  <form @submit.prevent="emit('submit', partialNote)">
    <label for="text">Note</label>
    <textarea v-model="text" id="text" class="leading-tight h-28" />
    <label for="date">Date</label>
    <input v-model="date" type="datetime-local" id="date" required />
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
