import { WebrtcProvider } from 'y-webrtc';
import { record } from '../store/record';
import { computed, ref, watch } from 'vue';
import { store as preferencesStore } from '../store/preferences';
import { getYjsDoc } from '@syncedstore/core';

/** @type {WebrtcProvider | undefined} */
let webRTCProvider;

export const peers = ref(0);

/**
 * @param {import('yjs').Doc} doc Underlying yDoc for active HealthRecord
 */
export const connect = () => {
  if (!preferencesStore.webRTC.enabled) {
    return;
  }

  const doc = getYjsDoc(record.value);

  const signaling = [];

  if (preferencesStore.webRTC.signalerUrl) {
    signaling.push(preferencesStore.webRTC.signalerUrl);
  } else if (import.meta.env.DEV) {
    // See {@link https://github.com/roymckenzie/y-webrtc-signaler ywebrtc-signaler} for sample signaling server implementation
    signaling.push('ws://localhost:8787');
  }

  webRTCProvider = new WebrtcProvider(record.value.id, doc, {
    signaling,
  });

  webRTCProvider.on('peers', ({ webrtcPeers }) => {
    console.log('got peers');
    peers.value = webrtcPeers.length
  });
}

export const disconnect = () => {
  if (webRTCProvider) {
    webRTCProvider.destroy();
    setTimeout(() => {
      webRTCProvider.disconnect(); peers.value = 0;
      webRTCProvider = null;
      peers.value = 0;
    }, 200);
  }
}

export const webrtcConnected = computed(() => {
  return webRTCProvider !== null;
});

watch(preferencesStore, (preferences) => {
  if (preferences.webRTC.enabled && !webRTCProvider) {
    const doc = getYjsDoc(record.value);
    connect();
  } else {
    disconnect();
  }
});
