import './assets/css/main.css'

import PrimeVue from 'primevue/config'
import Lara from './presets/lara'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { pt: Lara })

app.mount('#app')
