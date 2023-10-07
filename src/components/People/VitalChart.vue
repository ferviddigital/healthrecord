<script setup>
import { Line } from 'vue-chartjs';
import AnnotationPlugin from 'chartjs-plugin-annotation';
import ZoomPlugin from 'chartjs-plugin-zoom';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, TimeScale } from 'chart.js';
import { computed } from 'vue';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, AnnotationPlugin, ZoomPlugin, TimeScale)

ChartJS.defaults.font.family = 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'

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
  },
  small: {
    type: Boolean
  }
});

const measurements = computed(() => {
  return props.measurements.reverse()
});

const measurementValues = computed(() => {
  return measurements.value.map(measurement => measurement.value);
});
const measurementDates = computed(() => {
  return measurements.value.map(measurement => measurement.date);
})

const data = computed(() => {
  return {
    labels: measurementDates.value,
    /** @type {import('chart.js').LineControllerDatasetOptions[]} */
    datasets: [
      {
        label: props.vital.name,
        backgroundColor: '#4F46E5',
        data: measurementValues.value,
        borderColor: '#C7D2FE',
        pointRadius: 3,
        pointHitRadius: 10,
        pointHoverBorderWidth: 3,
        tension: 0.3
      }
    ]
  }
});

/** @type {import('chart.js').ChartOptions} */
const options = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        label: (context) => {
          return context.formattedValue + ' ' + props.vital.unit;
        },
        title: (context) => {
          return new Date(context[0].parsed.x).toLocaleDateString();
        }
      }
    },
    annotation: {
      annotations: {}
    },
    zoom: {}
  },
  responsive: true,
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'day',
        tooltipFormat: 'MM/DD/YYYY'
      },
      bounds: 'ticks',
      grid: {
        display: false,
        color: '#efefef'
      },
      ticks: {
        display: false,
        autoSkipPadding: 30,
        color: '#aaa'
      },
    },
    y: {
      grid: {
        display: false 
      },
      ticks: {
        color: '#aaa',
        autoSkipPadding: 30,
        major: {
          enabled: true
        },
        display: false,
        callback: (value) => {
          return Number(Number(value).toFixed(2)).toLocaleString() + ' ' + props.vital.unit;
        }
      }
    }
  }
}

if (! props.small) {
  options.plugins.zoom = {
    pan: {
      enabled: true,
      mode: 'x'
    }
  }

  options.scales.x.grid.display = true;
  options.scales.x.ticks.display = true;
  options.scales.y.ticks.display = true;
}

if (props.vital.low) {
  options.plugins.annotation.annotations.lowLine = {
    type: 'line',
    scaleID: 'y',
    value: props.vital.low,
    borderColor: '#FED7AA',
    borderDash: [5, 3],
    borderWidth: 1,
    init: true,
    z: 1,
  }

  options.plugins.annotation.annotations.lowBox = {
    type: 'box',
    borderWidth: 0,
    backgroundColor: 'rgba(254, 215, 170, 20%)',
    yMin: 0,
    yMax: props.vital.low,
    drawTime: 'beforeDraw',
    label: {
      content: 'low',
      position: {
        x: 'center',
        y: 'start'
      },
      display: true,
      color: 'rgb(253 186 116)',
      font: {
        weight: 'normal',
        size: '11px'
      }
    }
  }
}

if (props.vital.high) {
  options.plugins.annotation.annotations.highLine = {
    type: 'line',
    scaleID: 'y',
    value: props.vital.high,
    borderColor: '#FED7AA',
    borderDash: [5,3],
    borderWidth: 1,
    initi: true,
    z: 1
  }

  options.plugins.annotation.annotations.highBox = {
    type: 'box',
    borderWidth: 0,
    backgroundColor: 'rgba(254, 215, 170, 20%)',
    yMin: props.vital.high,
    drawTime: 'beforeDraw',
    label: {
      content: 'high',
      position: {
        x: 'center',
        y: 'end'
      },
      display: true,
      color: 'rgb(253 186 116)',
      font: {
        weight: 'normal',
        size: '11px'
      }
    }
  }
}

</script>

<template>
  <Line
    :options="options"
    :data="data"
  />
</template>
