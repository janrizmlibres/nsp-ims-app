import './assets/css/main.css'
import 'primeicons/primeicons.css'

import PrimeVue from 'primevue/config'
import Lara from './presets/lara'

import { library, config, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice';

import CanvasJSChart from '@canvasjs/vue-charts';


library.add(fas)
dom.watch()

import App from './App.vue'
import router from './router'

config.styleDefault = 'solid'

const app = createApp(App)

app.use(CanvasJSChart); // install the CanvasJS Vuejs Chart Plugin

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { unstyled: true, pt: Lara })
app.use(ToastService);

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
