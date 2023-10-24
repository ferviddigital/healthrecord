<script setup>
import { VitalInsight } from '../../classes/insight';
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  HandThumbUpIcon,
} from '@heroicons/vue/20/solid';

const props = defineProps({
  vital: {
    /** @type {import('vue').PropType<import("../../typedefs").Vital>} */
    type: Object,
    required: true,
  },
  person: {
    /** @type {import('vue').PropType<import("../../typedefs").Person>} */
    type: Object,
    required: true,
  },
});

const vitalInsight = new VitalInsight(props.vital, props.person);
</script>

<template>
  <div v-if="vitalInsight.level">
    <p
      class="mb-5 p-3 px-4 rounded-xl grid grid-cols-[min-content_auto] gap-3 items-start text-sm leading-tight md:leading-snug"
      :class="
        ['high', 'low'].includes(vitalInsight.level)
          ? 'bg-amber-100 text-amber-600'
          : 'bg-gray-300 text-gray-500'
      "
    >
      <ArrowTrendingDownIcon class="w-5 h-5" v-if="vitalInsight.trend === -1" />
      <ArrowTrendingUpIcon class="w-5 h-5" v-else-if="vitalInsight.trend === 1" />
      <HandThumbUpIcon class="w-5 h-5" v-else-if="vitalInsight.level === 'normal'" />
      <ArrowTrendingUpIcon class="w-5 h-5" v-else-if="vitalInsight.level === 'high'" />
      <ArrowTrendingDownIcon class="w-5 h-5" v-else-if="vitalInsight.level === 'low'" />
      {{ vitalInsight.description }}
    </p>
  </div>
</template>
../../classes/insight
