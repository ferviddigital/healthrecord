<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { vitals } from '../../store/vitals';
import dayjs from 'dayjs';
import { useRoute } from 'vue-router';

const router = useRoute();

const props = defineProps({
  value: {
    type: Number,
    default: null
  },
  date: {
    type: Number,
    default: Date.now()
  },
  personId: {
    type: String,
    required: true
  },
  vitalId: {
    type: String,
    default: ''
  },
  deletable: {
    type: Boolean,
    default: false
  }
});
const emit  = defineEmits(['submit', 'delete']);

const value     = ref(props.value || '');
const date      = ref(dayjs(props.date).format('YYYY-MM-DDThh:mm') || '');
const vitalId   = ref(props.vitalId);

const valueInput  = ref();
const vitalSelect = ref();

const isFormComplete = computed(() => {
  return value.value 
    && date.value.length > 0
});

const measurement = computed(() => {
  /** @type {import('../../typedefs').Measurement} */
  const measurement = {
    id:       crypto.randomUUID(),
    value:    Number(value.value),
    date:     dayjs(date.value).valueOf(),
    personId: props.personId,
    vitalId:  vitalId.value,
  }
  return measurement;
});

const vital = computed(() => {
  return vitals.value.find(vital => vital.id === vitalId.value);
});
</script>

<template>
  <form @submit.prevent="emit('submit', measurement)">
    <label v-if="!$route.params.vitalId" for="vitalId">
      Vital
    </label>
    <select v-if="!$route.params.vitalId" ref="vitalSelect" v-model="vitalId" id="vitalId" required>
      <option value="" disabled hidden>Choose vital</option>
      <option v-for="vital in vitals" :key="vital.id" :value="vital.id">{{ vital.name }}</option>
    </select>
    <label for="value">
      Value
    </label>
    <div class="input-group mb-3">
      <input v-model="value" type="text" id="value" ref="valueInput" inputmode="decimal" autocomplete="off" tabindex="2">
      <span v-if="vital">{{ vital.unit }}</span>
    </div>
    <label for="date">
      Date
    </label>
    <input v-model="date" type="datetime-local" id="date" required>
    <div class="grid grid-flow-col justify-end items-center gap-5 mt-4">
      <a v-if="deletable" @click="emit('delete', measurement.id)" class="text-sm text-red-500 font-light cursor-pointer">Delete</a>
      <a @click="$router.back()" class="text-sm text-gray-500 font-light cursor-pointer">Cancel</a>
      <button type="submit" class="btn" :disabled="!isFormComplete">Save</button>
    </div>
  </form>
</template>
