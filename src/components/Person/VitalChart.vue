<script setup>
import { Line } from 'vue-chartjs';
import AnnotationPlugin from 'chartjs-plugin-annotation';
import ZoomPlugin from 'chartjs-plugin-zoom';
import { Chart as ChartJS, Filler, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, TimeScale } from 'chart.js';
import { computed, ref, watch } from 'vue';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import dayjs from 'dayjs';
import quaterOfYear from 'dayjs/plugin/quarterOfYear';
dayjs.extend(quaterOfYear)

ChartJS.register(Title, Filler, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, AnnotationPlugin, ZoomPlugin, TimeScale)

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
  },
  range: {
    /** @type {import('../../typedefs').VitalChartRange} */
    default: 'all'
  }
});

const chartInstance = ref(null);

watch(props, () => {
  chartInstance.value.chart.resetZoom();
});

const measurements = computed(() => {
  let timestamp = 0;
  switch (props.range) {
    case 'week':
      timestamp = dayjs().subtract(1, 'week').valueOf();
      break;
      case 'month':
      timestamp = dayjs().subtract(1, 'month').valueOf();
      break;
    case 'quarter':
      timestamp = dayjs().subtract(1, 'quarter').valueOf();
      break;
    case 'year':
      timestamp = dayjs().subtract(1, 'year').valueOf();
      break;
  }
  return props.measurements.toReversed().filter(measurement => measurement.date > timestamp);
});

const measurementValues = computed(() => {
  return measurements.value.map(measurement => measurement.value);
});

const measurementDates = computed(() => {
  return measurements.value.map(measurement => measurement.date);
});

/** @type {import("vue").ComputedRef<import("chart.js").ChartData<'line'>>} */
const data = computed(() => {
  return {
    labels: measurementDates.value,
    /** @type {import("chart.js").ChartDataset<"line">[]} */
    datasets: [
      {
        label: props.vital.name,
        backgroundColor: function(ctx, options) {
          const context = ctx.chart.ctx;
          var gradient = context.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0.2, '#eef2ff');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            return gradient;
        },
        borderWidth: props.small ? 3 : 6,
        data: measurementValues.value,
        fill: true,
        borderColor: '#C7D2FE',
        pointRadius: props.small ? 0 : 6,
        pointHoverBorderWidth: 0,
        pointBackgroundColor: '#4F46E5',
        pointBorderWidth: 2,
        pointHitRadius: 15,
        pointHoverRadius: props.small ? 0 : 6.5,
        pointHoverBackgroundColor: '#4F46E5',
        tension: 0.3,
      }
    ],
  }
});

/** @type {import('chart.js').ChartOptions<"line">} */
const options = {
  layout: {
    padding: {
      left: props.small ? -9 : 0,
      bottom: props.small ? -9 : 0
    }
  },
  onHover: (event, elements, chart) => {
    if (props.small) {
      return chart.canvas.style.cursor = 'pointer';
    }
    if ( elements.length === 0 || !(elements[0].element instanceof PointElement)) {
      return chart.canvas.style.cursor = 'default';
    };
    return chart.canvas.style.cursor = 'pointer';
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: props.small ? false : true,
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
      annotations: {},
    },
    zoom: {}
  },
  responsive: true,
  aspectRatio: 1.5,
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'day',
        tooltipFormat: 'MM/DD/YYYY'
      },
      bounds: 'ticks',
      border: {
        display: false //props.small ? false : true
      },
      grid: {
        display: false,
        color: '#efefef',
      },
      ticks: {
        display: false,
        autoSkipPadding: 30,
        color: '#aaa',
      },
    },
    y: {
      grid: {
        display: false,
      },
      border: {
        display: false //props.small ? false : true
      },
      ticks: {
        color: '#aaa',
        autoSkipPadding: 30,
        major: {
          enabled: true
        },
        display: false,
        callback: (value) => {
          return Intl.NumberFormat(navigator.language, {notation: 'compact'}).format(Number(value)) + ' ' + props.vital.unit;
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

if (props.vital.low && !props.small) {

  /** @type {import('chartjs-plugin-annotation').AnnotationOptions} */
  const lowLine = {
    type: 'line',
    scaleID: 'y',
    value: props.vital.low,
    borderColor: '#FED7AA',
    borderDash: [5, 3],
    borderWidth: 1,
    drawTime: 'beforeDatasetsDraw'
  }

  /** @type {import('chartjs-plugin-annotation').AnnotationOptions} */
  const lowBox = {
    type: 'box',
    borderWidth: 0,
    backgroundColor: 'rgba(254, 215, 170, 20%)',
    yMin: 0,
    yMax: props.vital.low,
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
        size: 11
      }
    },
  }

  options.plugins.annotation.annotations = Object.assign(options.plugins.annotation.annotations, { lowLine, lowBox })
}

if (props.vital.high && !props.small) {

  /** @type {import('chartjs-plugin-annotation').AnnotationOptions} */
  const highLine = {
    type: 'line',
    scaleID: 'y',
    value: props.vital.high,
    borderColor: '#FED7AA',
    borderDash: [5,3],
    borderWidth: 1,
    drawTime: 'beforeDatasetsDraw'
  }

  /** @type {import('chartjs-plugin-annotation').AnnotationOptions} */
  const highBox = {
    type: 'box',
    borderWidth: 0,
    backgroundColor: 'rgba(254, 215, 170, 20%)',
    yMin: props.vital.high,
    label: {
      content: 'high',
      position: {
        x: 'center',
        y: 'end',
      },
      display: true,
      color: 'rgb(253 186 116)',
      font: {
        weight: 'normal',
        size: 11
      }
    },
  }

  options.plugins.annotation.annotations = Object.assign(options.plugins.annotation.annotations, { highLine, highBox })
}

</script>

<template>
  <Line
    :options="options"
    :data="data"
    ref="chartInstance"
  />
</template>
