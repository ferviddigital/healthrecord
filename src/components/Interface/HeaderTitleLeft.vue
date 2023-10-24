<script setup lang="ts">
import { scrolled } from '@store/ui';

interface HeaderTitleLeftProps {
  title: string;
  subtitle?: string;
}

const props = defineProps<HeaderTitleLeftProps>();

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
    <hgroup @click="scrollToTop">
      <h2 class="text-2xl font-bold">{{ props.title }}</h2>
      <p class="text-sm text-gray-500">{{ props.subtitle }}</p>
    </hgroup>
    <div class="grid grid-flow-col gap-3">
      <slot name="right"></slot>
    </div>
  </header>
</template>
