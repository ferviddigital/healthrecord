<script setup>
import { record, store as recordStore } from '../../../store/record';
import { saveAs } from 'file-saver';
import { DocumentArrowDownIcon, LockClosedIcon } from '@heroicons/vue/24/outline';
import { encrypt } from '../../../helpers/encrypto';
import PassphraseModal from './PassphraseModal.vue';
import { ref } from 'vue';

const passphraseModalOpen = ref(false);

const downloadHealthRecordFile = (data) => {
  const fileName  = 'healthRecord-' + Date.now() + '.json';
  const file      = new Blob([JSON.stringify(data)], {
    type: 'application/json'
  });
  saveAs(file, fileName);
}

const passphraseSubmitted = async (passphrase) => {
  passphraseModalOpen.value = false;
  const encryptedData = await encrypt(JSON.stringify(recordStore.downloadable()), passphrase);

  if (! encryptedData) {
    return alert('Could not encrypt data.');
  }

  const data = {
    encrypted: true,
    data: encryptedData
  }

  downloadHealthRecordFile(data);
}

const appVersion = APP_VERSION;
</script>

<template>
  <div>
    <div class="sticky top-0 pt-0 mt-0 pb-5 grid grid-flow-col items-start bg-gradient-to-b from-gray-200 from-90%">
      <header>
        <h2 class="text-2xl font-bold">Settings</h2>
        <p class="text-sm text-gray-500">Update app settings and download data.</p>
      </header>
    </div>
    <div class="bg-white p-3 px-0 rounded-xl divide-y">
      <section class="grid grid-flow-col grid-cols-[auto_min-content] items-center p-3">
        <h3 class="font-semibold text-sm">Owner</h3>
        <span class="whitespace-nowrap">{{ record.firstName + ' ' + record.lastName }}</span>
      </section>
      <section class="grid grid-flow-col grid-cols-[auto_min-content] items-center p-3">
        <h3 class="font-semibold text-sm">Data file</h3>
        <button class="btn text-sm" @click="downloadHealthRecordFile(recordStore.downloadable())">
          <DocumentArrowDownIcon />
          Download
        </button>
      </section>
      <section class="grid grid-flow-col grid-cols-[auto_min-content] items-center p-3">
        <h3 class="font-semibold text-sm">Encrypted data file</h3>
        <button class="btn text-sm" @click="passphraseModalOpen = true">
          <LockClosedIcon />
          Download
        </button>
      </section>
      <section class="grid grid-flow-col grid-cols-[auto_min-content] items-center border-b p-3">
        <h3 class="font-semibold text-sm">Version</h3>
        <span>{{ appVersion }}</span>
      </section>
    </div>
    <PassphraseModal v-if="passphraseModalOpen" @close="passphraseModalOpen = false" @passphraseSubmitted="passphraseSubmitted" />
    <p class="text-center self-end text-xs text-gray-400 mt-6 mb-3">HealthRecord Copyright &copy; {{ new Date().getFullYear() }}</p>
  </div>
</template>
