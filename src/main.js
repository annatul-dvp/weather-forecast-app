import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueNumberFormat from '@coders-tm/vue-number-format'

createApp(App).use(store).use(router).use(VueNumberFormat, { precision: 4, suffix: '°C', prefix: '$ ', masked: false }).mount('#app')
