import { ref } from 'vue';
import type { RouteLocationNormalized } from 'vue-router';

export const scrolled = ref(false);

export const previousRoute = ref<RouteLocationNormalized>();
