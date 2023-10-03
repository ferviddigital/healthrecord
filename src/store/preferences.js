import { reactive, watch } from "vue";

export const store = reactive({
  webRTC: {
    enabled: false,
    signalerUrl: null
  }
});

watch(store, (value) => {
  if (value) {
    localStorage.setItem('preferences', JSON.stringify(value));
  } else {
    localStorage.removeItem('preferences');
  }
});

if (localStorage.getItem('preferences')) {
  /** @type {import('../typedefs').PersonPreferences} */
  const prefs = JSON.parse(localStorage.getItem('preferences'));
  store.webRTC.enabled = prefs.webRTC.enabled;
  store.webRTC.signalerUrl = prefs.webRTC.signalerUrl;
}