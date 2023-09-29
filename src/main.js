import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import './helpers/storage';

createApp(App)
.use(router)
.mount('#app');
