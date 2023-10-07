<script setup>
import { people } from '../../store/people';
import { PlusIcon } from '@heroicons/vue/20/solid';
import { QuestionMarkCircleIcon, LightBulbIcon } from '@heroicons/vue/24/outline';
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
        <RouterLink class="rounded-full hover:bg-gray-300" :to="{ name: 'PersonCreate' }">
          <PlusIcon class="h-10 w-10" />
        </RouterLink>
      </div>
    </div>
    <div v-if="people.length > 0" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      <PersonListItem v-for="person in people" :key="person.id" :person="person" />
    </div>
    <div v-else class="border border-amber-200 p-4 rounded-lg text-amber-500 bg-amber-100 text-sm">
      <p class="grid grid-flow-col grid-cols-[min-content_auto] items-center mb-4 pb-4 border-b border-amber-200">
        <QuestionMarkCircleIcon class="h-6 w-6 mr-3" />
        A Person is an individual to track vital measurements for.
      </p>
      <p class="grid grid-flow-col grid-cols-[min-content_auto] items-center">
        <LightBulbIcon class="h-6 w-6 mr-3" />
        <span>You are not tracking any people. <RouterLink class="underline" :to="{ name: 'PersonCreate' }">Add&nbsp;a&nbsp;person</RouterLink>.</span>
      </p>
    </div>
    <RouterView name="modal" />
  </div>
</template>
