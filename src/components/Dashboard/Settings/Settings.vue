<script setup>
import { record } from '../../../store/record';
import { saveAs } from 'file-saver';
import { DocumentArrowDownIcon } from '@heroicons/vue/24/outline';

const downloadHealthRecordFile = () => {
  const fileName  = 'healthRecord.json';
  const file      = new Blob([JSON.stringify(record.value)], {
    type: 'application/json'
  });
  saveAs(file, fileName);
}
</script>

<template>
  <div>
    <div class="grid grid-flow-col items-start mb-10">
      <header>
        <h2 class="text-xl font-bold">Settings</h2>
        <p class="text-sm text-gray-500">Update app settings and download data.</p>
      </header>
    </div>
    <div>
      <button class="btn" @click="downloadHealthRecordFile">
        <DocumentArrowDownIcon />
        Download HealthRecord file
      </button>
    </div>
  </div>
</template>
