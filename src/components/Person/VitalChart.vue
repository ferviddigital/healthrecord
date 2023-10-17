<script setup>
import { Line } from 'vue-chartjs';
import { PointElement } from 'chart.js';
import { computed, onActivated, onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import '../../scripts/chartjs';

const router  = useRouter();
const route   = useRoute();

/** @type {import('vue').Ref<import('vue-chartjs').ChartComponentRef>} */
const vitalChartInstance = ref(null);

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
  minDate: {
    type: Number,
    default: null
  },
  maxDate: {
    type: Number,
    default: null
  }
});

const selectedMeasurementIndex = computed(() => {
  const index = props.measurements.findIndex(measurement => measurement.id === route.query.measurementId);
  return index === -1 ? null : index;
});

const measurementValues = computed(() => {
  return props.measurements.map(measurement => measurement.value);
});

const measurementDates = computed(() => {
  return props.measurements.map(measurement => measurement.date);
});

/** @type {import("vue").ComputedRef<import("chart.js").ChartData<"line">>} */
const data = computed(() => {
  return {
    labels: measurementDates.value,
    datasets: [
      {
        label: props.vital.name,
        backgroundColor: function(ctx, options) {
          const context = ctx.chart.ctx;
          const gradient = context.createLinearGradient(0, 0, 0, 400);
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
    ]
  }
});

const options = computed(() => {
  /** @type {import('chart.js').ChartOptions<"line">} */
  const options = {
    responsive: true,
    aspectRatio: 1.5,
    layout: {
      padding: {
        top: 10
      }
    },
    hover: {
      mode: 'index',
      intersect: false
    },
    plugins: {
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
      // @ts-ignore
      verticalMouseLine: {
        color: '#4F46E5',
        activeIndex: selectedMeasurementIndex.value
      },
    },
    scales: {
      x: {
        min: props.minDate,
        max: props.maxDate,
        type: 'timeseries',
        time: {
          tooltipFormat: 'MM/DD/YYYY',
          minUnit: 'day',
          round: 'day',
        },
        border: {
          display: false
        },
        grid: {
          display: false,
          color: '#efefef',
          drawTicks: true,
          tickLength: 10
        },
        ticks: {
          display: false,
          autoSkipPadding: 55,
          color: '#aaa',
          mirror: false,
          align: 'inner',
          maxRotation: 0,
          padding: 0
        }
      },
      y: {
        bounds: 'ticks',
        grid: {
          display: false,
          drawTicks: true,
          tickLength: 10
        },
        border: {
          display: false
        },
        ticks: {
          color: '#aaa',
          autoSkipPadding: 55,
          mirror: false,
          align: 'inner',
          display: false,
          padding: 0,
          callback: (value) => {
            return Intl.NumberFormat(navigator.language, {notation: 'compact'}).format(Number(value));
          }
        }
      }
    },
    onClick: (event, elements, chart) => {
      if (props.small) return;
      if ( elements.length === 0 || !(elements[0].element instanceof PointElement)) {
        return;
      };
      const measurement = props.measurements[elements[0].index]
      router.push({ name: 'PersonVital', query: { measurementId: measurement.id }});
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
  }

  if (props.small) {
    // @ts-ignore
    options.plugins.verticalMouseLine = false;
    options.scales.x.grid.tickLength = 0;
    options.scales.y.grid.tickLength = 0;
    options.layout = {
      padding: {
        top: 2,
        right: -1,
        bottom: -2
      }
    }
  } else {
    options.scales.x.grid.display = true;
    options.scales.x.ticks.display = true;
    options.scales.y.ticks.display = true;
    options.layout = {
      padding: {
        top: 20,
        right: 0,
      }
    }
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
      drawTime: 'beforeDatasetsDraw'
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
      drawTime: 'beforeDatasetsDraw'
    }

    options.plugins.annotation.annotations = Object.assign(options.plugins.annotation.annotations, { highLine, highBox })
  }
  return options;
});

// Update selected measurement
// watch(route, () => {
//   const chart = vitalChartInstance.value.chart
//   const x = chart.getDatasetMeta(0).data[selectedMeasurementIndex.value].x
//   if (!route.query.measurementId) {
//     // @ts-ignore
//     options.value.plugins.verticalMouseLine.activeX = null
//   } else {
//     // @ts-ignore
//     options.value.plugins.verticalMouseLine.activeX = x
//   }

//   chart.update();
// });

// Update date ranges
watch(props, () => {
  if (!props.minDate || !props.maxDate) return;

  if (options.value.scales.x.min !== props.minDate) {
    options.value.scales.x.min = props.minDate;
  }

  if (options.value.scales.x.max !== props.maxDate) {
    options.value.scales.x.max = props.maxDate;
  }
});
</script>

<template>
  <Line
    :options="options"
    :data="data"
    ref="vitalChartInstance"
  />
</template>
