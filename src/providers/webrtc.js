import { WebrtcProvider } from 'y-webrtc';

/** @type {WebrtcProvider | undefined} */
let webRTCProvider;

/**
 * @param {string} recordId Active HealthRecord ID
 * @param {import('yjs').Doc} doc Underlying yDoc for active HealthRecord
 * 
 * @returns {WebrtcProvider}
 */
export const connect = (recordId, doc) => {
  const signaling = [];

  if (import.meta.env.DEV) {
    // See {@link https://github.com/roymckenzie/y-webrtc-signaler ywebrtc-signaler} for sample signaling server implementation
    signaling.push('ws://localhost:8787');
  }

  webRTCProvider = new WebrtcProvider(recordId, doc, {
    signaling,
  });

  return webRTCProvider;
}

export const disconnect = () => {
  if (webRTCProvider) {
    webRTCProvider.disconnect();
    webRTCProvider.destroy();
  }
  webRTCProvider = null;
}
