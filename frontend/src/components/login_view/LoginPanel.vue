<script setup>
import InputText from 'primevue/inputtext'
import { useToast } from 'primevue/usetoast'
import { checkInputEmpty } from '@/util/interactions.js'
import Button from 'primevue/button'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()

const userIdInput = ref(null)
const passwordInput = ref(null)

const isUsernameInvalid = ref(false)
const isPasswordInvalid = ref(false)

function checkInputEmptyForUsername() {
  checkInputEmpty(userIdInput, isUsernameInvalid)
}

function checkInputEmptyForPassword() {
  checkInputEmpty(passwordInput, isPasswordInvalid)
}

async function submitEvent() {
  if (
    checkInputEmpty(userIdInput, isUsernameInvalid) |
    checkInputEmpty(passwordInput, isPasswordInvalid)
  ) {
    return
  }

  const id = userIdInput.value
  const password = passwordInput.value

  try {
    const result = await axios.post('http://localhost:8080/auth/login', { id, password })

    // Save the token and user id to global store
    const { token, userId } = result.data
    authStore.login(token, userId)
    await router.replace({ name: 'dashboard' }) // navigate to dashboard
  } catch (error) {
    console.log(error)
    toast.add({
      severity: 'error',
      summary: 'Error Logging In',
      detail: error.response.data.message,
      life: 3000
    })
  }
}
</script>

<template>
  <div
    class="flex justify-center items-center u-login-panel-width u-login-panel-height rounded-lg shadow-xl bg-white"
  >
    <div class="block justify-left">
      <p class="text-4xl font-bold u-txt-pcolor u-letter-spacing mb-12">WELCOME!</p>
      <p class="text-base font-bold u-txt-pcolor">User ID</p>
      <InputText
        class="mt-2 w-80 h-7"
        v-model="userIdInput"
        @blur="checkInputEmptyForUsername"
        @keyup.enter="submitEvent"
        :invalid="isUsernameInvalid"
      />
      <p class="text-base font-bold u-txt-pcolor mt-6">Password</p>
      <InputText
        class="mt-2 w-80 h-7"
        v-model="passwordInput"
        @blur="checkInputEmptyForPassword"
        @keyup.enter="submitEvent"
        :invalid="isPasswordInvalid"
      />
      <br /><Button
        class="mt-10 w-40 h-12 rounded-sm text-white font-bold text-base cursor-pointer"
        @click="submitEvent"
        :pt="{
          root: ({ props, context, parent }) => ({
            class: [
              {
                'u-bg-pcolor-darker dark:bg-primary-400':
                  !props.link &&
                  props.severity === null &&
                  !props.text &&
                  !props.outlined &&
                  !props.plain,
                'border u-bc-button dark:border-primary-400':
                  !props.link &&
                  props.severity === null &&
                  !props.text &&
                  !props.outlined &&
                  !props.plain
              },

              // Primary Outlined Button
              {
                'border u-bc-button hover:u-bc-button':
                  props.outlined && props.severity === null && !props.plain
              },

              // Primary
              {
                'hover:u-bg-button-hover dark:hover:bg-primary-300 hover:u-bg-border-button-hover dark:hover:border-primary-300':
                  !props.link &&
                  props.severity === null &&
                  !props.text &&
                  !props.outlined &&
                  !props.plain
              },
              {
                'focus:u-bg-border-button-focus dark:focus:ring-primary-300/50':
                  props.severity === null
              }
            ]
          })
        }"
        :pt-options="{ mergeProps: true }"
      >
        SIGN IN
      </Button>
      <p class="text-base font-bold u-txt-pcolor mt-16">www.nsp.xu.edu.ph</p>
    </div>
  </div>
</template>
