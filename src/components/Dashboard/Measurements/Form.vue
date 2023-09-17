<script setup>
import { computed, ref } from 'vue';
import { people } from '../../../store/people';
import { vitals } from '../../../store/vitals';
import dayjs from 'dayjs';

const props = defineProps(['value', 'date', 'personId', 'vitalId']);
const emit  = defineEmits(['submit']);

const value     = ref(props.value || '');
const date      = ref(dayjs(props.date).format('YYYY-MM-DD') || '');
const personId  = ref(props.personId || '');
const vitalId   = ref(props.vitalId || '');

const isFormComplete = computed(() => {
  return value.value.length > 0 
    && date.value.length > 0
    && personId.value.length > 0
    && vitalId.value.length > 0
});

const measurement = computed(() => {
  return {
    value:    value.value,
    date:     dayjs(date.value).valueOf(),
    personId: personId.value,
    vitalId:  vitalId.value,
  }
});

const vital = computed(() => {
  return vitals.value.find(vital => vital.id === vitalId.value);
});
</script>

<template>
  <form @submit.prevent="emit('submit', measurement)">
    <label for="personId">
      Person
    </label>
    <select v-model="personId" id="personId" required>
      <option value="" disabled hidden>Choose person</option>
      <option v-for="person in people" :key="person.id" :value="person.id">{{ person.firstName + ' ' + person.lastName }}</option>
    </select>
    <label  for="vitalId">
      Vital
    </label>
    <select v-model="vitalId" id="vitalId" required>
      <option value="" disabled hidden>Choose vital</option>
      <option v-for="vital in vitals" :key="vital.id" :value="vital.id">{{ vital.name }}</option>
    </select>
    <label for="value">
      Value
    </label>
    <div class="input-group mb-3">
      <input v-model="value" type="text" id="value" autocomplete="off">
      <span v-if="vital">{{ vital.unit }}</span>
    </div>
    <label for="date">
      Date
    </label>
    <input v-model="date" type="date" id="date" required>
    <div class="grid grid-flow-col justify-end items-center gap-5 mt-4">
      <a @click="$router.back()" class="text-sm text-gray-500 font-light cursor-pointer">Cancel</a>
      <button type="submit" class="btn" :disabled="!isFormComplete">Save</button>
    </div>
  </form>
</template>
