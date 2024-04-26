import './assets/css/main.css'
import 'primeicons/primeicons.css'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import { library, config, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import customPreset from './util/custom_preset'

library.add(fas)
dom.watch()
config.styleDefault = 'solid'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(PrimeVue, { unstyled: true, pt: customPreset })
app.use(ToastService)

app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
