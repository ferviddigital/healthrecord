<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';
import { scrolled, previousRoute } from '@stores/ui';
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';

interface HeaderTitleCenterProps {
  title: string;
  backText?: string;
  backRoute?: RouteLocationRaw;
}

const props = withDefaults(defineProps<HeaderTitleCenterProps>(), {
  backRoute: () => previousRoute.value!,
  backText: 'Back'
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>

<template>
  <header
    class="sticky grid grid-cols-[auto_min-content] top-0 p-4 py-2 sm:pt-4 bg-gray-200/70 backdrop-blur-xl border-b border-transparent transition-all"
    :class="{ '!border-gray-300': scrolled }"
  >
    <hgroup class="grid grid-cols-[1fr_1fr_1fr] items-center">
      <RouterLink class="text-indigo-500 justify-self-start" :to="props.backRoute">
        <ChevronLeftIcon class="w-6 h-6 inline align-top" /> {{ props.backText }}
      </RouterLink>
      <h2 class="text-xl font-bold text-center whitespace-nowrap" @click="scrollToTop">
        {{ props.title }}
      </h2>
      <div class="grid grid-flow-col gap-3 justify-self-end">
        <slot name="right"></slot>
      </div>
    </hgroup>
  </header>
</template>
