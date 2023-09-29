<script setup>
import { SquaresPlusIcon } from '@heroicons/vue/20/solid'
import PersonForm from '../Dashboard/People/Form.vue';
import { create } from '../../helpers/storage';
</script>

<template>
  <div class="grid h-screen justify-center items-start p-10">
    <div class="border border-gray-200 shadow-sm rounded max-w-xs mx-auto p-10 bg-white">
      <h1 class="text-2xl font-bold text-center mb-5">
        <SquaresPlusIcon class="h-5 w-5 inline -mt-1.5" />
        HealthRecord
      </h1>
      <p class="text-center text-sm mb-10 text-gray-500">Setup new record. This record is stored in your browser. You will be reminded to download it periodically.</p>
      <PersonForm @submit="create" />
    </div>
  </div>
</template>