<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';
import { selectedPersonId } from '../../store/person';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';

const router = useRouter();

interface PersonListItemProps {
  person: Person;
}

const props = defineProps<PersonListItemProps>();

const goToPerson = () => {
  selectedPersonId.value = props.person.id;
  setTimeout(() => {
    router.push({ name: 'Person', params: { personId: props.person.id } })
  }, 100);
}
</script>

<template>
  <div 
    class="group/person grid grid-cols-[auto_min-content] bg-gray-50 min-h-[10em] p-3 rounded-xl cursor-pointer shadow-sm hover:shadow-md hover:bg-white transition-all"
    @click="goToPerson"
  >
    <div class="grid items-end content-end">
      <h3 class="font-semibold mb-1">{{ person.firstName + ' ' + person.lastName }}</h3>
      <p class="text-gray-400 text-sm">
        <strong>Age</strong>: {{ dayjs().diff(dayjs(person.dob), 'year') }} &emsp; <br class="lg:hidden" />
        <strong>Sex</strong>: {{ person.sex }}
      </p>
    </div>
    <div class="grid justify-items-end">
      <CheckCircleIcon v-if="person.id === selectedPersonId" class="h-7 w-7 text-indigo-500" />
      <ChevronRightIcon class="h-5 w-5 self-end text-gray-400 group-hover/person:text-black transition-all" />
    </div>
  </div>
</template>
