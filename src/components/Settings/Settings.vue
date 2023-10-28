<script setup lang="ts">
import { record, downloadable } from '@store/record';
import FileSaver from 'file-saver';
import { clear } from '../../helpers/storage';
import { DocumentArrowDownIcon, LockClosedIcon } from '@heroicons/vue/24/outline';
import { ChevronRightIcon } from '@heroicons/vue/24/solid';
import { encrypt } from '../../helpers/encrypto';
import PassphraseModal from '@components/Settings/PassphraseModal.vue';
import { ref } from 'vue';
import { Switch } from '@headlessui/vue';
import { peers, webrtcConnected } from '../../providers/webrtc';
import pluralize from 'pluralize';
import { people } from '@store/people';
import { vitals } from '@store/vitals';
import { useRouter } from 'vue-router';
import HeaderTitleLeft from '@components/Interface/HeaderTitleLeft.vue';

const router = useRouter();

const passphraseModalOpen = ref(false);

const downloadHealthRecordFile = (data: object) => {
  const fileName = 'healthRecord-' + Date.now() + '.json';
  const file = new Blob([JSON.stringify(data)], {
    type: 'application/json',
  });
  FileSaver.saveAs(file, fileName);
};

const passphraseSubmitted = async (passphrase: string) => {
  passphraseModalOpen.value = false;
  const encryptedData = await encrypt(JSON.stringify(downloadable()), passphrase);

  if (!encryptedData) {
    return alert('Could not encrypt data.');
  }

  const data = {
    encrypted: true,
    data: encryptedData,
  };

  downloadHealthRecordFile(data);
};

const logout = async () => {
  if (!confirm('Have you downloaded your health record?')) {
    return;
  }
  clear();
  router.push({ name: 'Start' });
};

// @ts-ignore
const appVersion = APP_VERSION;
</script>

<template>
  <div>
    <HeaderTitleLeft title="Settings" subtitle="Update app settings and download data." />
    <div class="m-4">
      <div class="bg-white rounded-xl divide-y mb-10 overflow-hidden">
        <section
          class="grid grid-flow-col gap-4 items-center p-4 py-3 pr-3 cursor-pointer hover:bg-gray-100"
          @click="$router.push({ name: 'SettingsPeople' })"
        >
          <h4>People</h4>
          <span class="grid grid-flow-col gap-1 justify-self-end items-center text-gray-400">
            {{ people.length }}
            <ChevronRightIcon class="w-5 h-5 text-gray-300" />
          </span>
        </section>
        <section
          class="grid grid-flow-col gap-4 items-center p-4 py-3 pr-3 cursor-pointer hover:bg-gray-100"
          @click="$router.push({ name: 'SettingsVitals' })"
        >
          <h4>Vitals</h4>
          <span class="grid grid-flow-col gap-1 justify-self-end items-center text-gray-400">
            {{ vitals.length }}
            <ChevronRightIcon class="w-5 h-5 text-gray-300" />
          </span>
        </section>
      </div>
      <h3 class="text-sm ml-4 mb-1 uppercase text-gray-500">Record Details</h3>
      <div v-if="record" class="bg-white rounded-xl divide-y mb-10 overflow-hidden">
        <section
          @click="$router.push({ name: 'SettingsUserUpdate' })"
          class="grid grid-flow-col gap-4 items-center p-4 py-3 pr-3 cursor-pointer hover:bg-gray-100"
        >
          <h4>Owner</h4>
          <span class="grid grid-flow-col gap-1 justify-self-end items-center text-gray-400">
            {{ record.user.firstName + ' ' + record.user.lastName }}
            <ChevronRightIcon class="w-5 h-5 text-gray-300" />
          </span>
        </section>
        <section class="grid grid-cols-[auto_auto] gap-4 items-center p-4 py-3 pr-3">
          <h4>ID</h4>
          <span
            class="inline-block text-right text-gray-400 font-mono text-sm md:text-base truncate select-all selection:bg-indigo-600 selection:text-white"
          >
            {{ record.id }}
          </span>
        </section>
      </div>
      <h3 class="text-sm ml-4 mb-1 uppercase text-gray-500">Download Data</h3>
      <p class="ml-4 mb-2 text-xs text-gray-400">Download your data for backup or sharing.</p>
      <div class="bg-white rounded-xl divide-y mb-10 overflow-hidden">
        <section class="grid grid-flow-col gap-4 items-center p-4 py-3" :key="1">
          <h4>Unencrypted</h4>
          <button
            class="btn text-sm justify-self-end"
            @click="downloadHealthRecordFile(downloadable())"
          >
            <DocumentArrowDownIcon />
            Download
          </button>
        </section>
        <section class="grid grid-flow-col gap-4 items-center p-4 py-3" :key="2">
          <span>
            <h4>Encrypted</h4>
            <p class="text-xs text-gray-400">
              You will be asked for a passphrase to secure the data.
            </p>
          </span>
          <button class="btn text-sm justify-self-end" @click="passphraseModalOpen = true">
            <LockClosedIcon />
            Download
          </button>
        </section>
      </div>
      <h3 class="text-sm ml-4 mb-1 uppercase text-gray-500">Syncing</h3>
      <p class="ml-4 mb-2 text-xs text-gray-400">Synchronize data between your devices.</p>
      <TransitionGroup
        name="list"
        tag="div"
        class="bg-white rounded-xl divide-y overflow-hidden mb-10 relative"
        v-if="record"
      >
        <section class="grid grid-flow-col items-center p-4 py-3 bg-white z-10 relative" :key="3">
          <span>
            <h4>Allow Syncing</h4>
          </span>
          <span class="justify-self-end" v-if="record.user.preferences">
            <Switch
              v-model="record.user.preferences.webRTC.enabled"
              :class="record.user.preferences.webRTC.enabled ? 'active' : ''"
              class="switch"
            >
              <span />
            </Switch>
          </span>
        </section>
        <section v-if="record.user.preferences && record.user.preferences.webRTC.enabled">
          <section class="grid grid-flow-row items-center p-4 py-3" :key="4">
            <span>
              <span class="grid grid-flow-col items-start place-content-between">
                <h4>Signal Server</h4>
                <span
                  v-if="webrtcConnected"
                  class="text-xs text-right rounded-full bg-gray-200 p-1 px-3"
                >
                  {{
                    peers > 0
                      ? pluralize('peer', peers, true) + ' connected'
                      : 'Waiting for peers...'
                  }}
                  <span
                    class="h-2 w-2 ml-1 inline-block bg-orange-300 rounded-full"
                    :class="{ '!bg-green-500': peers > 0 }"
                    :title="
                      peers > 0
                        ? pluralize('peer', peers, true) + ' connected'
                        : 'Waiting for peers...'
                    "
                  ></span>
                </span>
              </span>
              <p class="text-xs text-gray-400 mb-2 mt-2">
                HealthRecord uses a
                <a
                  href="https://antmedia.io/webrtc-signaling-servers-everything-you-need-to-know/"
                  target="_blank"
                  class="underline"
                  >signal server</a
                >
                to identify your other devices to synchronize. Your health data is synchronized
                peer-to-peer and is never transmitted to the signal server.
                <a
                  href="https://github.com/ferviddigital/y-webrtc-signaler"
                  target="_blank"
                  class="underline"
                  >Host your own signal server</a
                >.
              </p>
            </span>
          </section>
          <section
            @click="$router.push({ name: 'SettingsSignalServerUpdate' })"
            class="grid grid-flow-col gap-4 items-center p-4 pr-3 cursor-pointer hover:bg-gray-100 border-t"
          >
            <h4>URL</h4>
            <span class="grid grid-flow-col gap-1 justify-self-end items-center text-gray-400">
              <span class="line-clamp-1 text-sm font-mono">{{
                record.user.preferences.webRTC.signalerUrl
              }}</span>
              <ChevronRightIcon class="w-5 h-5 text-gray-300" />
            </span>
          </section>
        </section>
      </TransitionGroup>
      <h3 class="text-sm ml-4 mb-1 uppercase text-gray-500">App Info</h3>
      <div class="bg-white rounded-xl divide-y mb-10">
        <section
          class="grid grid-flow-col grid-cols-[auto_min-content] items-center p-4 py-5"
          :key="5"
        >
          <h4>Version</h4>
          <span class="text-gray-400 font-mono">{{ appVersion }}</span>
        </section>
      </div>
      <div class="bg-white hover:bg-gray-50 rounded-xl divide-y overflow-hidden relative mb-5">
        <section class="grid" :key="6">
          <h4
            class="font-semibold text-sm text-red-600 cursor-pointer p-3 py-5 text-center"
            @click="logout"
          >
            Logout
          </h4>
        </section>
      </div>
      <PassphraseModal
        v-if="passphraseModalOpen"
        @close="passphraseModalOpen = false"
        @passphraseSubmitted="passphraseSubmitted"
      />
      <p class="text-center self-end text-xs text-gray-400 mt-6">
        HealthRecord Copyright &copy; {{ new Date().getFullYear() }}
      </p>
    </div>
  </div>
</template>
