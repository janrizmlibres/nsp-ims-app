import PrimeVue from "primevue/config";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'
import Lara from './presets/lara'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { unstyled: true, pt: Lara })

app.mount('#app')
