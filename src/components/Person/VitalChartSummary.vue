<script setup>
import { computed, ref } from 'vue';
import VitalChart from './VitalChart.vue';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

const props = defineProps({
  vital: {
    /** @type {import('vue').PropType<import("../../typedefs").Vital>} */
    type: Object,
    required: true
  },
  measurements: {
    /** @type {import('vue').PropType<import("../../typedefs").Measurement[]>} */
    type: Array,
    required: true
  }
});

/** @type {import('vue').Ref<import('../../typedefs').VitalChartRange>} */
const selectedRange = ref({length: 100, unit: 'year'});

const minDate = computed(() => {
  if (selectedRange.value.length === 100) {
    return Math.min(...props.measurements.map(measurement => measurement.date));
  }
  return dayjs().subtract(selectedRange.value.length, selectedRange.value.unit).valueOf();
});

const dateRangeStart = computed(() => {
  return Math.min(...filteredMeasurements.value.map(measurement => measurement.date));
});

const dateRangeEnd = computed(() => {
  return Math.max(...props.measurements.map(measurement => measurement.date));
});

const filteredMeasurements = computed(() => {
  return props.measurements.filter(measurement => measurement.date >= minDate.value);
});

const averageMeasurement = computed(() => {
  return filteredMeasurements.value.map(measurement => measurement.value).reduce((previous, current) => previous + current, 0) / filteredMeasurements.value.length;
});

const ranges = computed(() => {
  /** @type {import('../../typedefs').VitalChartRange[]} */
  const ranges = [
    {
      unit: 'days',
      length: 7,
      abbreviation: 'W',
      title: 'Week'
    },
    {
      unit: 'month',
      length: 1,
      abbreviation: 'M',
      title: 'Month'
    },
    {
      unit: 'months',
      length: 3,
      abbreviation: '3M',
      title: 'Three months'
    },
    {
      unit: 'year',
      length: 1,
      abbreviation: 'Y',
      title: 'Year'
    },
    {
      unit: 'years',
      length: 5,
      abbreviation: '5Y',
      title: 'Five years'
    },
    {
      unit: 'years',
      length: 10,
      abbreviation: '10Y',
      title: 'Ten years'
    },
    {
      unit: 'years',
      length: 15,
      abbreviation: '15Y',
      title: 'Fifteen years'
    },
  ]
  ranges.forEach((range, index) => {
    range.quantity = props.measurements.filter(measurement => {
      if (index === 0) {
        return dayjs(measurement.date).isBetween(dayjs(),dayjs().subtract(range.length, range.unit),null, '[]');
      }else {
        return dayjs(measurement.date).isBetween(dayjs().subtract(ranges[index-1].length, ranges[index-1].unit),dayjs().subtract(range.length, range.unit));
      }
    }).length
  });
  return ranges.filter(range => range.quantity > 0).reverse();
});

const dateRangeText = computed(() => {
  let dateFormat;
  if (dayjs(dateRangeStart.value).isSame(dateRangeEnd.value, 'year')) {
    dateFormat = 'MMM D';
  } else {
    dateFormat = 'MMM \'YY';
  }
  return dayjs(dateRangeStart.value).format(dateFormat) + ' - ' + dayjs(dateRangeEnd.value).format(dateFormat);
});

const lowMeasurements = computed(() => {
  if (!props.vital.low) return [];
  return filteredMeasurements.value.filter(measurement => measurement.value < props.vital.low)
});

const highMeasurements = computed(() => {
  if (!props.vital.high) return [];
  return filteredMeasurements.value.filter(measurement => measurement.value > props.vital.high)
});

const language = navigator.language;

</script>

<template>
  <VitalChart :vital="vital" :measurements="measurements" :min-date="dateRangeStart" :max-date="dateRangeEnd" class="ml-2" />
  <div class="grid p-2">
    <div class="grid grid-flow-col gap-2 place-content-between bg-gray-100 rounded-full p-1 mt-2 shadow-inner mx-auto">
      <button
        class="rounded-full p-0.5 px-3 text-sm hover:bg-gray-200 transition-all disabled:text-gray-300 disabled:hover:bg-transparent"
        :class="{'!bg-indigo-500 text-white shadow': selectedRange.length === 100 && selectedRange.unit === 'year'}"
        @click="selectedRange = {length: 100, unit: 'year'}"
        title="All data"
      >
        All
      </button>
      <button
        v-for="range in ranges"
        class="rounded-full p-0.5 px-3 text-sm hover:bg-gray-200 transition-all disabled:text-gray-300 disabled:hover:bg-transparent"
        :class="{'!bg-indigo-500 text-white shadow': (selectedRange.length === range.length && selectedRange.unit === range.unit)}"
        @click="selectedRange = range"
        :title="range.title"
      >
        {{ range.abbreviation }}
      </button>
    </div>
  </div>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 divide-x divide-y mt-2">
    <span class="grid p-3 border-t">
      <span class="text-xs uppercase text-gray-500">Unit</span>
      <span class="font-bold">{{ vital.unit }}</span>
    </span>
    <span class="grid p-3">
      <span class="text-xs uppercase text-gray-500">Date range</span>
      <span class="font-bold">{{ dateRangeText }}</span>
    </span>
    <span class="grid p-3 border-l-transparent sm:border-l-gray-200">
      <span class="text-xs uppercase text-gray-500">Average</span>
      <span class="font-bold">{{ Intl.NumberFormat(language, {notation: 'compact'}).format(averageMeasurement) }} <span class="font-normal text-xs text-gray-500">{{ vital.unit }}</span></span>
    </span>
    <span class="grid p-3">
      <span class="text-xs uppercase text-gray-500">Measurements</span>
      <span class="font-bold">{{ filteredMeasurements.length }}</span>
    </span>
  </div>
</template>