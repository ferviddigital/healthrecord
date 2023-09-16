<script setup>
import { SquaresPlusIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router';
import { store as recordStore } from '../../store/record';
import PersonForm from '../Dashboard/People/Form.vue';

const router = useRouter();

const addRecord = (person) => {
  recordStore.add({person});
  router.push({name: 'Dash'});
}
</script>

<template>
  <div class="flex h-screen justify-center items-center p-10 bg-slate-50">
    <div class="border border-gray-200 shadow-sm rounded max-w-xs mx-auto p-10 bg-white">
      
      <SquaresPlusIcon class="text-indigo-500 h-10 w-10 text-center mx-auto" />
      <h1 class="text-2xl font-bold text-center mb-5 text-indigo-500">HealthRecord</h1>
      <p class="text-center text-sm mb-10 text-slate-500">Setup new record. This record is stored in your browser. You will be reminded to download it periodically.</p>
      <PersonForm @submit="addRecord" />
    </div>
  </div>
</template>