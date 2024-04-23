import './assets/css/main.css'
import 'primeicons/primeicons.css'

import PrimeVue from 'primevue/config'
import Lara from './presets/lara'

import { library, config, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice'
import { usePassThrough } from 'primevue/passthrough'

library.add(fas)
dom.watch()

import App from './App.vue'
import router from './router'

config.styleDefault = 'solid'

const app = createApp(App)

const CustomPreset = usePassThrough(
    Lara,
    {
        inputtext: {
            root: ({ props, context }) => {
                return {
                    class: [
                        { 'u-input-text-hover dark:u-input-text-hover': !props.invalid },
                        // Invalid State
                        { 'u-input-text-error dark:u-input-text-error': props.invalid },
                        // States
                        {
                            'hover:u-input-text-hover dark:hover:u-input-text-hover': !context.disabled && !props.invalid,
                            'focus:outline-none focus:outline-offset-0 focus:ring focus:u-input-text-focus dark:focus:u-input-text-focus focus:z-10': !context.disabled,
                            'opacity-60 select-none pointer-events-none cursor-default': context.disabled
                        }
                    ]
                };
            }
        }
      }
    }
  },
  { mergeProps: true }
)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { unstyled: true, pt: CustomPreset })
app.use(ToastService)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
