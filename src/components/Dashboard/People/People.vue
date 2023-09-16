<script setup>
import { people, store as peopleStore } from '../../../store/people';
import { PlusIcon } from '@heroicons/vue/24/solid';
import dayjs from 'dayjs';
</script>

<template>
  <div>
    <div class="grid grid-flow-col gap-3 items-start mb-10">
      <header>
        <h2 class="text-xl font-bold">People</h2>
        <p class="text-sm text-gray-500">Add, edit, and delete people to track.</p>
      </header>
      <div class="grid justify-end">
        <RouterLink class="btn" :to="{ name: 'AddPerson' }">
          <PlusIcon /> Add
        </RouterLink>
      </div>
    </div>
    <table v-if="people.length > 0" class="table-auto w-full">
      <thead class="text-left border-b-2">
        <tr>
          <th class="font-light text-sm text-gray-400 w-full p-2 py-2">Name</th>
          <th class="font-light text-sm text-gray-400 p-2 py-2">Sex</th>
          <th class="font-light text-sm text-gray-400 p-2 py-2">Age</th>
          <th colspan="2"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b even:bg-gray-100" v-for="person in people" :key="person.id">
          <td class="p-2 py-3"><RouterLink :to="{ name: 'Person', params: { id: person.id }}">{{ person.firstName + ' ' + person.lastName }}</RouterLink></td>
          <td class="text-sm p-2 py-3 text-center text-gray-400">{{ person.sex.charAt(0) }}</td>
          <td class="text-sm p-2 py-3 text-center text-gray-400">{{ dayjs().diff(dayjs(person.dob), 'year') }}</td>
          <td class="p-2 py-3"><RouterLink class="text-indigo-800 hover:underline text-sm font-medium" :to="{ name: 'EditPerson', params: { id: person.id }}">Edit</RouterLink></td>
          <td class="p-2 py-3"><button class="text-indigo-800 hover:underline text-sm font-medium" @click.prevent="peopleStore.delete(person.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
