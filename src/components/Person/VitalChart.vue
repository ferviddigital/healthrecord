<script setup>
import { Line } from 'vue-chartjs';
import AnnotationPlugin from 'chartjs-plugin-annotation';
import ZoomPlugin from 'chartjs-plugin-zoom';
import { Chart as ChartJS, Filler, Title, Tooltip, LinearScale, PointElement, LineElement, TimeSeriesScale } from 'chart.js';
import { computed, ref, watch } from 'vue';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

const updateLines = (chart, args, options) => {
  const ctx = chart.ctx;

  ctx.save();
  if (options.hoverX && (options.hoverX !== options.activeX)) {
    ctx.beginPath();
    ctx.strokeStyle = options.color;
    ctx.lineWidth = options.hoverLineWidth;
    ctx.setLineDash(options.lineDash);
    ctx.moveTo(options.hoverX, chart.chartArea.bottom);
    ctx.lineTo(options.hoverX, 0);
    ctx.stroke();
    ctx.restore();
  }

  if (options.activeX) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = options.color;
    ctx.lineWidth = options.activeLineWidth;
    ctx.moveTo(options.activeX, chart.chartArea.bottom);
    ctx.lineTo(options.activeX, 0);
    ctx.stroke();
    ctx.restore();
  }

  options.activeLines
}

/** @type {import('chart.js').Plugin} */
const VerticalMouseLine = {
  id: 'mouseline',
  defaults: {
    hoverX: null,
    activeX: null,
    color: 'red',
    hoverLineWidth: 1,
    activeLineWidth: 2,
    lineDash: [5,3],
    unclick: null
  },
  afterEvent: (chart, {event, inChartArea}, options) => {
    if (!inChartArea || !chart.getActiveElements().length) {
      options.hoverX = null;
      return
    }

    const activeElement = chart.getActiveElements()[0].element;

    if (!(activeElement instanceof PointElement)) return;

    const x = activeElement.x;

    switch (event.type) {
      case 'click':
        options.hoverX = null;
        options.activeX = options.activeX === x ? null : x;
        if (!options.activeX) {
          options.unclick();
        }
        break;
      case 'mousemove':
        options.hoverX = x
        break;
    }
  },
  afterDraw: updateLines,
  afterDatasetsUpdate: function(chart, args, options) {
    options.activeX = null;
    options.hoverX = null;
  }
}



ChartJS.register(Title, Filler, Tooltip, LinearScale, PointElement, LineElement, AnnotationPlugin, ZoomPlugin, TimeSeriesScale, VerticalMouseLine);

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
  minDate: {
    type: Number,
    default: null
  },
  maxDate: {
    type: Number,
    default: null
  }
});

const emit = defineEmits({
  /** @param {import('../../typedefs').Measurement} payload */
  measurementTapped(payload) { return true; }
});

const chartInstance = ref(null);

watch(props, () => {
  if (!props.minDate || !props.maxDate) return;
  /** @type {import("chart.js").Chart} */
  const chart = chartInstance.value.chart;

  chart.options.scales.x.min = props.minDate;
  chart.options.scales.x.max = props.maxDate;
  chart.update();
});


const measurementValues = computed(() => {
  return props.measurements.map(measurement => measurement.value);
});

const measurementDates = computed(() => {
  return props.measurements.map(measurement => measurement.date);
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
    ]
  }
});

const options = computed(() => {
  /** @type {import('chart.js').ChartOptions<"line">} */
  const options = {
    layout: {
      padding: {
        top: 10
      }
    },
    onClick: (event, elements, chart) => {
      if (props.small) return;
      if ( elements.length === 0 || !(elements[0].element instanceof PointElement)) {
        return
      };
      const measurement = props.measurements[elements[0].index]
      emit('measurementTapped', measurement);
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
    hover: {
      mode: 'index',
      intersect: false
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
      zoom: {},
      // @ts-ignore
      mouseline: {
        color: '#4F46E5',
        unclick: () => emit('measurementTapped', null)
      },
    },
    responsive: true,
    aspectRatio: 1.5,
    scales: {
      x: {
        type: 'timeseries',
        time: {
          tooltipFormat: 'MM/DD/YYYY',
          minUnit: 'day',
          round: 'day'
        },
        border: {
          display: false
        },
        grid: {
          display: false,
          color: '#efefef',
        },
        ticks: {
          display: false,
          autoSkipPadding: 50,
          color: '#aaa',
        },
      },
      y: {
        grid: {
          display: false,
        },
        border: {
          display: false
        },
        ticks: {
          color: '#aaa',
          autoSkipPadding: 55,
          major: {
            enabled: true
          },
          display: false,
          callback: (value) => {
            return Intl.NumberFormat(navigator.language, {notation: 'compact'}).format(Number(value));
          }
        }
      }
    }
  }

  if (props.small) {
    // @ts-ignore
    options.plugins.mouseline = false;
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

</script>

<template>
  <Line
    :options="options"
    :data="data"
    ref="chartInstance"
  />
</template>
