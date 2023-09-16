<script setup>
import { SquaresPlusIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { store as recordStore } from '../../store/record';

const filePicker = ref(null);

const openPicker = () => {
  filePicker.value.click();
}

const router = useRouter();

const processFile = () => {

  if (filePicker.value.files.length === 0) {
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const result = JSON.parse(reader.result);
    if (result.hasOwnProperty('type') && result.type === 'healthRecord') {
      recordStore.edit(result);
      router.push({ name: 'Dash' });
    }
  }

  reader.readAsText(filePicker.value.files[0]);
}
</script>

<template>
  <div class="flex h-screen justify-center items-center p-10 bg-slate-50">
    <div class="border border-gray-200 shadow-sm rounded max-w-xs mx-auto p-10 bg-white">
      
      <SquaresPlusIcon class="text-indigo-500 h-10 w-10 text-center mx-auto" />
      <h1 class="text-2xl font-bold text-center mb-5 text-indigo-500">HealthRecord</h1>
      <p class="text-center text-sm mb-10 text-slate-500">Welcome to HealthRecord. The web service that allows you to view and edit your health record information.</p>
      <button @click="$router.push({ name: 'StartNew' })" class="block w-full p-2 px-5 rounded bg-indigo-500 text-white mb-2 hover:bg-indigo-600">Start with new record</button>
      <button @click.prevent="openPicker" class="block text-center mx-auto text-xs underline text-indigo-500 hover:text-indigo-600">Load from HealthRecord file</button>
      <input type="file" class="hidden" ref="filePicker" @change="processFile" accept="application/json" />
    </div>
  </div>
</template>