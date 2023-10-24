<script setup>
import { computed, ref } from 'vue';
import dayjs from 'dayjs';

const props = defineProps({
  date: {
    type: Number,
    default: Date.now(),
  },
  text: {
    type: String,
    default: null,
  },
  deletable: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits({
  /** @param {import('../../typedefs').NotePayload} payload */
  submit(payload) {
    return true;
  },
  destroy() {
    return true;
  },
});

const date = ref(dayjs(props.date).format('YYYY-MM-DDThh:mm') || '');
const text = ref(props.text);

const isFormComplete = computed(() => {
  return text.value && text.value.length > 0;
});

/** @type {import('vue').ComputedRef<import('../../typedefs').NotePayload>} */
const params = computed(() => {
  return {
    date: dayjs(date.value).valueOf(),
    text: text.value,
  };
});
</script>

<template>
  <form @submit.prevent="emit('submit', params)">
    <label for="text"> Note </label>
    <textarea v-model="text" id="text" class="leading-tight h-28" />
    <label for="date"> Date </label>
    <input v-model="date" type="datetime-local" id="date" required />
    <div class="grid grid-flow-col justify-end items-center gap-5 mt-4">
      <a
        v-if="deletable"
        @click="emit('destroy')"
        class="text-sm text-red-500 font-light cursor-pointer"
        >Delete</a
      >
      <a @click="$router.back()" class="text-sm text-gray-500 font-light cursor-pointer">Cancel</a>
      <button type="submit" class="btn" :disabled="!isFormComplete">Save</button>
    </div>
  </form>
</template>
