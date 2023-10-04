import { WebrtcProvider } from 'y-webrtc';
import { doc } from './syncedstore';
import { computed, ref, watch } from 'vue';
import { store as preferencesStore } from '../store/preferences';
import { record } from '../store/record';

/** @type {WebrtcProvider | undefined} */
let webRTCProvider;

export const peers = ref(0);

export const webrtcConnected = computed(() => {
  return webRTCProvider !== null;
});

watch(
  () => preferencesStore.webRTC.enabled,
  () => {
    if (preferencesStore.webRTC.enabled) {
      connect();
    } else {
      disconnect();
    }
  }
);

watch(
  () => preferencesStore.webRTC.signalerUrl,
  () => {
    if (!preferencesStore.webRTC.signalerUrl) return;
    
    if (!webRTCProvider.signalingUrls.includes(preferencesStore.webRTC.signalerUrl)) {
      disconnect();
      connect();
    }
  }
);

doc.on('update', () => {
  if (record.value.id.toString().length > 0) {
    connect();
  } else {
    disconnect();
  }
});


const connect = () => {  
  if (!preferencesStore.webRTC.enabled || (webRTCProvider && webRTCProvider.connected)) return;

  const signaling = [];

  if (preferencesStore.webRTC.signalerUrl) {
    signaling.push(preferencesStore.webRTC.signalerUrl);
  } else if (import.meta.env.DEV) {
    // See {@link https://github.com/roymckenzie/y-webrtc-signaler y-webrtc-signaler} for sample signaling server implementation
    signaling.push('ws://localhost:8787');
  }

  const recordId = doc.getText('id').toString();

  webRTCProvider = new WebrtcProvider(recordId, doc, {
    signaling
  });

  webRTCProvider.on('peers', ({ webrtcPeers, bcPeers }) => {
    peers.value = webrtcPeers.length + bcPeers.length
  });
}

const disconnect = () => {
  if (!webRTCProvider) return;
  webRTCProvider.disconnect();
  webRTCProvider.destroy();
  webRTCProvider = null;
  peers.value = 0;
}
