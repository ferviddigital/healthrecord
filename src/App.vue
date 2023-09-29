<script setup>
import { watch } from 'vue';
import { record } from './store/record';
import { useRouter } from 'vue-router';

const router = useRouter();

watch(record, (newValue) => {
  if (newValue) {
    router.push({ name: 'Dashboard' });
  } else {
    router.push({ name: 'Start' });
  }
})
</script>

<template>
  <RouterView />
</template>
