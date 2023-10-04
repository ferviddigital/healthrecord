import { reactive, watch } from "vue";

export const store = reactive({
  webRTC: {
    enabled: false,
    signalerUrl: null
  }
});

if (localStorage.getItem('preferences')) {
  
  /** @type {import('../typedefs').PersonPreferences} */
  const prefs = JSON.parse(localStorage.getItem('preferences'));

  store.webRTC.enabled = prefs.webRTC.enabled;
  store.webRTC.signalerUrl = prefs.webRTC.signalerUrl;
}

watch(store, () => {
  if (store) {
    localStorage.setItem('preferences', JSON.stringify(store));
  } else {
    localStorage.removeItem('preferences');
  }
});
