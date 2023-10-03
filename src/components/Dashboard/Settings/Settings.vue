<script setup>
import { record, store as recordStore } from '../../../store/record';
import { saveAs } from 'file-saver';
import { clear } from '../../../helpers/storage';
import { DocumentArrowDownIcon, LockClosedIcon } from '@heroicons/vue/24/outline';
import { encrypt } from '../../../helpers/encrypto';
import PassphraseModal from './PassphraseModal.vue';
import { ref } from 'vue';
import { Switch } from '@headlessui/vue';
import { peers, webrtcConnected } from '../../../providers/webrtc';
import pluralize from 'pluralize';
import { store as preferencesStore } from '../../../store/preferences';

const passphraseModalOpen = ref(false);

/** @type {import('vue').Ref<string>} */
const signalServerURL = ref(preferencesStore.webRTC.signalerUrl || '');

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

const logout = async () => {
  if (! confirm('Have you downloaded your health record?') ) {
    return
  }
  clear();
}

const validateSocketUrl = (urlString) => {
  try {
    const url = new URL(urlString);
    return url.protocol === 'ws:' || url.protocol === 'wss:';
  } catch (error) {
    return false;
  }
}

const updateWebRTC = () => {
  if (validateSocketUrl(signalServerURL.value)) {
    preferencesStore.webRTC.signalerUrl = signalServerURL.value;
  }
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
    <h3 class="text-xs pl-3 mb-1 uppercase text-gray-500">
      Record Details
    </h3>
    <div class="bg-white rounded-xl divide-y mb-5">
      <section class="grid grid-flow-col grid-cols-[auto_min-content] items-center p-3 py-4 md:py-5" :key="0">
        <h4 class="font-semibold text-sm">Owner</h4>
        <span class="whitespace-nowrap">{{ record.firstName + ' ' + record.lastName }}</span>
      </section>
      <section class="grid grid-flow-col grid-cols-[auto_auto] items-center p-3 py-5 gap-4" :key="0">
        <h4 class="font-semibold text-sm">ID</h4>
        <span class="whitespace-nowrap text-gray-400 font-mono text-sm md:text-base truncate text-right inline-block select-all selection:bg-indigo-600 selection:text-white">{{ record.id }}</span>
      </section>
    </div>
    <h3 class="text-xs pl-3 mb-1 uppercase text-gray-500">
      Download Data
    </h3>
    <p class="ml-3 mb-2 text-xs text-gray-400">Download your data to backup or sharing.</p>
    <div class="bg-white rounded-xl divide-y overflow-hidden mb-5">
      <section class="grid grid-flow-col grid-cols-[auto_min-content] items-center p-3" :key="1">
        <h4 class="font-semibold text-sm">Unencrypted</h4>
        <button class="btn text-sm" @click="downloadHealthRecordFile(recordStore.downloadable())">
          <DocumentArrowDownIcon />
          Download
        </button>
      </section>
      <section class="grid grid-flow-col grid-cols-[auto_min-content] items-center p-3 gap-4" :key="2">
        <span>
          <h4 class="font-semibold text-sm">
            Encrypted
          </h4>
          <p class="text-xs text-gray-400">You will be asked for a passphrase to secure the data.</p>
        </span>
        <button class="btn text-sm" @click="passphraseModalOpen = true">
          <LockClosedIcon />
          Download
        </button>
      </section>
    </div>
    <h3 class="text-xs pl-3 mb-1 uppercase text-gray-500">
      Collaboration
    </h3>
    <p class="ml-3 mb-2 text-xs text-gray-400">Synchronizes open instances of this HealthRecord.</p>
    <TransitionGroup
      name="list"
      tag="div"
      class="bg-white rounded-xl divide-y overflow-hidden mb-5"
    >
      <section class="grid grid-flow-col grid-cols-[auto_min-content] items-center p-3 bg-white z-10 relative" :key="3">
        <span>
          <h4 class="font-semibold text-sm">
            Allow Syncing
          </h4>
        </span>
        <span>
          <Switch
            v-model="preferencesStore.webRTC.enabled"
            :class="preferencesStore.webRTC.enabled ? 'active' : ''"
            class="switch"
          >
            <span />
          </Switch>
        </span>
      </section>
      <section
        v-if="preferencesStore.webRTC.enabled"
        class="grid grid-flow-row items-center p-3"
        :key="4"
      >
        <span>
          <span class="grid grid-flow-col items-start place-content-between">
            <h4 class="font-semibold text-sm mb-3 md:mb-2">Signal Server</h4>
            <span
              v-if="webrtcConnected"
              class="text-xs text-right rounded-full bg-gray-200 p-1 px-3 -mt-1">
              {{ peers > 0 ? pluralize('peer', peers, true) + ' connected' : 'Waiting for peers...' }}
              <span 
                class="h-2 w-2 ml-1 inline-block bg-orange-300 rounded-full"
                :class="{ '!bg-green-500' : peers > 0 }"
                :title="peers > 0 ? pluralize('peer', peers, true) + ' connected' : 'Waiting for peers...'"
              ></span>
            </span>
          </span>
          <p class="text-xs text-gray-400 mb-3">HealthRecord uses a <a href="https://antmedia.io/webrtc-signaling-servers-everything-you-need-to-know/" target="_blank" class="underline">signal server</a> to find other open instances of this record to synchronize. Synchronization happens peer-to-peer and your data is never transmitted to the signaling server.</p>
        </span>
        <span>
          <input id="signal-server-url" class="w-full font-mono md:text-sm" type="url" placeholder="wss://signal-server.com" v-model="signalServerURL" @blur="updateWebRTC" />
          <span
            v-if="signalServerURL.length > 0 && !validateSocketUrl(signalServerURL)"
            class="text-right block text-xs text-red-600 pt-1"
          >Please enter a valid WebSocket url</span>
        </span>
      </section>
    </TransitionGroup>
    <h3 class="text-xs pl-3 mb-1 uppercase text-gray-500">
      App Info
    </h3>
    <div class="bg-white rounded-xl divide-y overflow-hidden relative mb-5">
      <section class="grid grid-flow-col grid-cols-[auto_min-content] items-center p-3 py-5" :key="5">
        <h4 class="font-semibold text-sm">Version</h4>
        <span class="text-gray-400 font-mono">{{ appVersion }}</span>
      </section>
    </div>
    <div class="bg-white hover:bg-gray-50 rounded-xl divide-y overflow-hidden relative mb-5">
      <section class="grid" :key="6">
        <h4 class="font-semibold text-sm text-red-600 cursor-pointer p-3 py-5 text-center" @click="logout">Logout</h4>
      </section>
    </div>
    <PassphraseModal v-if="passphraseModalOpen" @close="passphraseModalOpen = false" @passphraseSubmitted="passphraseSubmitted" />
    <p class="text-center self-end text-xs text-gray-400 mt-6 pb-28">HealthRecord Copyright &copy; {{ new Date().getFullYear() }}</p>
  </div>
</template>
