<script setup>
import { people } from '../../../store/people';
import { PlusIcon } from '@heroicons/vue/20/solid';
import PersonListItem from './PersonListItem.vue';
</script>

<template>
  <div>
    <div class="z-10 sticky top-0 pt-0 mt-0 pb-5 grid grid-flow-col gap-2 items-start bg-gradient-to-b from-gray-200 from-90%">
      <header>
        <h2 class="text-2xl font-bold">People</h2>
        <p class="text-sm text-gray-500">Add, edit, and delete people to track.</p>
      </header>
      <div class="grid justify-end">
        <RouterLink class="group rounded-full hover:bg-gray-200" :to="{ name: 'PersonCreate' }">
          <PlusIcon class="group-hover:text-indigo-600 h-10 w-10" />
        </RouterLink>
      </div>
    </div>
    <div class="pb-28 md:pb-0 grid gap-3">
      <PersonListItem v-for="person in people" :key="person.id" :person="person" />
    </div>
    <RouterView name="modal" />
  </div>
</template>
