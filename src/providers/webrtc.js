import { WebrtcProvider } from 'y-webrtc';
import { Doc } from 'yjs';

/** @type {WebrtcProvider | undefined} */
let webRTCProvider;

/**
 * @param {string} recordId Active HealthRecord ID
 * @param {Doc} yDoc Underlying yDoc for active HealthRecord
 */
export const connect = (recordId, yDoc) => {
  // console.log(`Setting up WebRTC provider for Record ID ${recordId}...`);
  webRTCProvider = new WebrtcProvider(recordId, yDoc, {
    signaling: []
  });
}

export const disconnect = () => {
  if (webRTCProvider) {
    webRTCProvider.disconnect();
  }
  webRTCProvider = null;
}
