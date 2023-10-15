<script setup>
import { PlusIcon } from '@heroicons/vue/20/solid';
import { selectedPerson, sortedPersonLogEntries } from '../../../store/person';
import LogbookListItem from './LogbookListItem.vue';
import HeaderTitleCenter from '../../Interface/HeaderTitleCenter.vue';

</script>

<template>
  <div>
    <HeaderTitleCenter title="Logbook" :backText="selectedPerson.firstName" :backRoute="{ name: 'Person', params: { personId: selectedPerson.id }}">
      <template #right>
        <RouterLink class="grid rounded-full bg-gray-300 hover:bg-gray-100 h-9 w-9 sm:h-10 sm:w-10 items-center justify-items-center" :to="{ name: 'PersonNoteCreate' }">
          <PlusIcon class="h-6 w-6" />
        </RouterLink>
      </template>
    </HeaderTitleCenter>
    <div class="m-4">
      <div class="grid gap-2">
        <LogbookListItem v-for="logEntry in sortedPersonLogEntries" :logEntry = "logEntry" />
      </div>
    </div>
    <RouterView name="modal" />
  </div>
</template>
