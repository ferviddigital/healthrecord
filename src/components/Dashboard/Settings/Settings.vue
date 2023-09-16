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

const appVersion = APP_VERSION;
</script>

<template>
  <div class="grid grid-rows-[min-content_auto_min-content]">
    <div class="grid grid-flow-col items-start mb-10 p-4 pb-0 md:p-6 md:pb-0">
      <header>
        <h2 class="text-xl font-bold">Settings</h2>
        <p class="text-sm text-gray-500">Update app settings and download data.</p>
      </header>
    </div>
    <div>
      <section class="grid grid-flow-col grid-cols-[auto_min-content] items-center md:mx-0 border-b p-3 px-4 md:px-6">
        <h3 class="font-semibold">Owner</h3>
        <span class="whitespace-nowrap">{{ record.firstName + ' ' + record.lastName }}</span>
      </section>
      <section class="grid grid-flow-col grid-cols-[auto_min-content]  items-center md:mx-0 border-b p-3 px-4 md:px-6">
        <h3 class="font-semibold">Data file</h3>
        <button class="btn" @click="downloadHealthRecordFile">
          <DocumentArrowDownIcon />
          Download
        </button>
      </section>
      <section class="grid grid-flow-col grid-cols-[auto_min-content]  items-center md:mx-0 border-b p-3 px-4 md:px-6">
        <h3 class="font-semibold">Version</h3>
        <span>{{ appVersion }}</span>
      </section>
    </div>
    <p class="text-center self-end text-xs text-gray-300 mt-6 mb-3">HealthRecord Copyright &copy; {{ new Date().getFullYear() }}</p>
  </div>
</template>
