<script setup lang="ts">
import { people } from '@store/people';
import { PlusIcon } from '@heroicons/vue/20/solid';
import { QuestionMarkCircleIcon, LightBulbIcon } from '@heroicons/vue/24/outline';
import PersonListItem from './PersonListItem.vue';
import HeaderTitleCenter from '../Interface/HeaderTitleCenter.vue';
</script>

<template>
  <div>
    <HeaderTitleCenter title="People" backText="Settings" :backRoute="{ name: 'Settings' }">
      <template #right>
        <RouterLink
          class="grid rounded-full bg-gray-300 hover:bg-gray-100 h-9 w-9 sm:h-10 sm:w-10 items-center justify-items-center"
          :to="{ name: 'SettingsPeopleCreate' }"
        >
          <PlusIcon class="h-6 w-6" />
        </RouterLink>
      </template>
    </HeaderTitleCenter>
    <div class="m-4">
      <div v-if="people.length > 0" class="box-columns">
        <PersonListItem v-for="person in people" :key="person.id" :person="person" />
      </div>
      <div
        v-else
        class="border border-amber-200 p-4 rounded-lg text-amber-500 bg-amber-100 text-sm"
      >
        <p
          class="grid grid-flow-col grid-cols-[min-content_auto] items-center mb-4 pb-4 border-b border-amber-200"
        >
          <QuestionMarkCircleIcon class="h-6 w-6 mr-3" />
          A Person is an individual to track vital measurements for.
        </p>
        <p class="grid grid-flow-col grid-cols-[min-content_auto] items-center">
          <LightBulbIcon class="h-6 w-6 mr-3" />
          <span
            >You are not tracking any people.
            <RouterLink class="underline" :to="{ name: 'PersonCreate' }"
              >Add&nbsp;a&nbsp;person</RouterLink
            >.</span
          >
        </p>
      </div>
    </div>
    <RouterView name="modal" />
  </div>
</template>
