import { createApp } from 'vue';
import './styles/style.css';
import App from './App.vue';
import router from './router';
import './helpers/storage';
import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

createApp(App)
.use(router)
.mount('#app');
