<script setup lang="ts">
import { SquaresPlusIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';
import { decrypt } from '../../helpers/encrypto';
import PassphraseModal from '@components/Settings/PassphraseModal.vue';
import { load } from '../../helpers/storage';
import { useRouter } from 'vue-router';

const router = useRouter();

const filePicker = ref<HTMLInputElement>();
const passphraseModalOpen = ref(false);
const passphrase = ref<string | undefined>();

const openPicker = () => {
  if (!filePicker.value) return;
  filePicker.value.value = '';
  passphrase.value = undefined;
  filePicker.value.click();
};

const processFile = () => {
  if (!filePicker.value || !filePicker.value.files) return;

  if (filePicker.value.files.length === 0) {
    return;
  }

  const reader = new FileReader();

  reader.onload = async () => {
    if (typeof reader.result !== 'string') return;
    const result = JSON.parse(reader.result);
    if (result.hasOwnProperty('type') && result.type === 'healthRecord') {
      load(JSON.stringify(result));
    } else if (result.hasOwnProperty('encrypted') && result.encrypted && !passphrase.value) {
      passphraseModalOpen.value = true;
    } else if (result.hasOwnProperty('encrypted') && result.encrypted && passphrase.value) {
      const data = await decrypt(result.data, passphrase.value);
      if (!data) {
        return alert('Passphrase was incorrect. Please try again.');
      }
      load(data);
      router.push({ name: 'Dashboard' });
    } else {
      return alert('File does not appear to valid.');
    }
  };

  reader.readAsText(filePicker.value.files[0]);
};

const passphraseSubmitted = (_passphrase: string) => {
  passphraseModalOpen.value = false;
  passphrase.value = _passphrase;
  processFile();
};
</script>

<template>
  <div class="grid h-screen justify-center items-center p-10">
    <div
      class="border border-gray-200 shadow-sm hover:shadow rounded-lg max-w-xs mx-auto p-10 bg-white"
    >
      <h1 class="text-2xl font-bold text-center mb-5">
        <SquaresPlusIcon class="h-5 w-5 inline -mt-1.5" />
        HealthRecord
      </h1>
      <p class="text-center text-sm mb-10 text-gray-500">
        Welcome to HealthRecord. <br />Record, track, and visualize your personal health data.
      </p>
      <button
        @click="$router.push({ name: 'StartNew' })"
        class="block w-full p-2 px-5 rounded bg-indigo-500 text-white mb-2 hover:bg-indigo-600"
      >
        Start with new record
      </button>
      <button
        @click.prevent="openPicker"
        class="block text-center mx-auto text-xs underline text-indigo-500 hover:text-indigo-600"
      >
        Load from HealthRecord file
      </button>
      <input
        type="file"
        class="hidden"
        ref="filePicker"
        @change="processFile"
        accept="application/json"
      />
    </div>
    <PassphraseModal
      v-if="passphraseModalOpen"
      @close="passphraseModalOpen = false"
      @passphraseSubmitted="passphraseSubmitted"
    />
  </div>
</template>
