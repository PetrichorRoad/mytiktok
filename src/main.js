import { createApp } from 'vue'
import '@/assets/reset.scss'
import App from './App.vue'
import router from './router/index';
import store from '@/store/index'
import socket from './utils/socket';
import './utils/permission';

socket.on('connect', () => {
    
})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
