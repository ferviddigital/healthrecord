import { WebrtcProvider } from 'y-webrtc';
import { doc } from './syncedstore';
import { computed, ref, watch } from 'vue';
import { record } from '../store/record';

/** @type {WebrtcProvider | undefined} */
let webRTCProvider;

export const peers = ref(0);

export const webrtcConnected = computed(() => {
  return webRTCProvider !== null;
});

doc.on('update', () => {
  if (record.value.id.toString().length > 0) {
    if (webRTCProvider && !webRTCProvider.signalingUrls.includes(record.value.user.preferences.webRTC.signalerUrl)) {
      disconnect();
      connect();
    } else {
      connect();
    }
  }  else {
    disconnect();
  }
});

doc.on('destroy', ()=> {
  disconnect();
})


const connect = () => {  
  if (!record.value.user) return;
  if (!record.value.user.preferences) return;
  if (!record.value.user.preferences.webRTC.enabled || (webRTCProvider && webRTCProvider.connected)) return;

  const signaling = [];

  if (record.value.user.preferences.webRTC.signalerUrl) {
    signaling.push(record.value.user.preferences.webRTC.signalerUrl);
  } else if (import.meta.env.DEV) {
    // See {@link https://github.com/ferviddigital/y-webrtc-signaler y-webrtc-signaler} for sample signaling server implementation
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
