<script setup lang="ts">
import { record } from '@store/record';
import EditFields from '../Interface/EditFields.vue';

const fields: FormField[] = [
  {
    name: 'signalServerUrl',
    placeholder: 'wss://signalserver.com',
    currentValue: record.value.user.preferences.webRTC.signalerUrl,
    type: 'url',
    classes: 'font-mono text-sm !p-4 !px-4',
    blurCallback: (newValue) => updateSignalServer(newValue),
  },
];

const validateSocketUrl = (urlString: string) => {
  try {
    const url = new URL(urlString);
    return url.protocol === 'ws:' || url.protocol === 'wss:';
  } catch (error) {
    return false;
  }
};

const updateSignalServer = (newUrl: string) => {
  if (validateSocketUrl(newUrl) || newUrl.length === 0) {
    record.value.user.preferences.webRTC.signalerUrl = newUrl;
  } else {
    alert('Signal Server URL is not valid.');
  }
};
</script>

<template>
  <EditFields title="Signal Server URL" :fields="fields" />
</template>
