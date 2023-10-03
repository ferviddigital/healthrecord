import { WebrtcProvider } from 'y-webrtc';
import { preferences, record } from '../store/record';
import { computed, ref } from 'vue';

/** @type {WebrtcProvider | undefined} */
let webRTCProvider;

/**
 * @param {import('yjs').Doc} doc Underlying yDoc for active HealthRecord
 */
export const connect = (doc) => {
  const signaling = [];

  // if (preferences.value.webRTC.enabled && preferences.value.webRTC.signalerUrl) {
  //   signaling.push(preferences.value.webRTC.signalerUrl);
  // } else if (import.meta.env.DEV) {
    // See {@link https://github.com/roymckenzie/y-webrtc-signaler ywebrtc-signaler} for sample signaling server implementation
    signaling.push('ws://localhost:8787');
  // }

  webRTCProvider = new WebrtcProvider(record.value.id, doc, {
    signaling,
  });

  webRTCProvider.on('peers', ({ webrtcPeers }) => {
    console.log('peeeeeers!');
    peers.value = webrtcPeers.length
  });
}

export const disconnect = () => {
  console.log('disconnecting webrtc');
  if (webRTCProvider) {
    webRTCProvider.off('peers');
    webRTCProvider.disconnect();
    webRTCProvider.destroy();
  }
  webRTCProvider = null;
  peers.value = 0;
}

export const webrtcConnected = computed(() => {
  return webRTCProvider !== null;
})

export const peers = ref(0);