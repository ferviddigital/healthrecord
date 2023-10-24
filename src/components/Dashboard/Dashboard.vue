<script setup lang="ts">
import { people } from '@store/people';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { scrolled } from '@store/ui';
import PersonListItem from '../People/PersonListItem.vue';
</script>

<template>
  <div >
    <header
      class="sticky grid grid-cols-[auto_min-content] top-0 p-4 py-2 sm:pt-4 bg-gray-200/70 backdrop-blur-xl border-b border-transparent transition-all"
      :class="{'!border-gray-300': scrolled }"
    >
      <hgroup>
        <h2 class="text-2xl font-bold">Dashboard</h2>
        <p class="text-sm text-gray-500">HealthRecord data overview.</p>
      </hgroup>
    </header>
    <div class="m-4">
      <h3 class="grid grid-flow-col text-xl font-bold mb-4 cursor-pointer" @click="$router.push({ name: 'People' })">
        People
        <span v-if="people.length > 2" class="font-normal text-base text-indigo-500 justify-self-end whitespace-nowrap">
          View all {{ people.length }} <ChevronRightIcon class="w-6 h-6 inline align-top" />
        </span>
      </h3>
      <div class="box-columns pb-10">
        <PersonListItem v-for="person in people" :person="person" :key="person.id" />
      </div>
    </div>
  </div>
</template>
