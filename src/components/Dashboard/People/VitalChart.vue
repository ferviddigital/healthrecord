<script setup>
import { Line } from 'vue-chartjs';
import AnnotationPlugin from 'chartjs-plugin-annotation';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { computed } from 'vue';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, AnnotationPlugin)

const props = defineProps([ 'vital', 'measurements' ]);

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
    datasets: [
      {
        label: props.vital.name,
        backgroundColor: '#4F46E5',
        data: measurementValues.value,
        borderColor: '#C7D2FE',
        pointRadius: 4,
        pointHitRadius: 10,
        pointHoverBorderWidth: 3,
      }
    ]
  }
});

const options = {
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        label: (context) => {
          return context.formattedValue + ' ' + props.vital.unit;
        },
        title: (context) => {
          return new Date(Number(context[0].label)).toLocaleDateString();
        }
      }
    },
    annotation: {
      annotations: {}
    }
  },
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        display: false
      }
    },
    y: {
      grid: {
        display: false
      },
      ticks: {
        display: false
      }
    }
  }
}

if (props.vital.low.length > 0) {
  options.plugins.annotation.annotations.lowLine = {
    type: 'line',
    scaleID: 'y',
    value: props.vital.low,
    borderColor: '#FED7AA',
    borderDash: [5, 3],
    borderWidth: 1,
    init: true,
    z: 1
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

if (props.vital.high.length > 0) {
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
    class="bg-yell"
  />
</template>
