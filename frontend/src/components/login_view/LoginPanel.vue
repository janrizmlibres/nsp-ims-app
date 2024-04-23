<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext';
import { checkInputEmpty } from '@/utils/interactions.js'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

const toast = useToast()

const router = useRouter()

const usernameInput = ref(null)
const passwordInput = ref(null)

const isUsernameInvalid = ref(false);
const isPasswordInvalid = ref(false);

function checkInputEmptyForUsername() {
  checkInputEmpty(usernameInput, isUsernameInvalid)
}

function checkInputEmptyForPassword() {
  checkInputEmpty(passwordInput, isPasswordInvalid)
}

const submitEvent = async () => {
  if (checkInputEmpty(usernameInput, isUsernameInvalid) || checkInputEmpty(passwordInput, isPasswordInvalid)) {
    return;
  }
  
  const username = usernameInput.value;
  const password = passwordInput.value;

  try {
    const response = await axios.post('http://localhost:8080/auth/login', { username, password })

    if (response.status === 200) {
      const token = response.token
      // Save the token in the local storage or in a cookie
      localStorage.setItem('token', token)
      await router.push('/dashboard') // navigate to dashboard
    }
  } catch (error) {
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
  <div class="flex justify-center items-center u-login-panel-width u-login-panel-height rounded-lg shadow-xl bg-white">
    <div class="block justify-left">
      <p class="text-4xl font-bold u-txt-pcolor u-letter-spacing mb-12">WELCOME!</p>
      <p class="text-base font-bold u-txt-pcolor">User ID</p>
      <InputText class="mt-2 w-80 h-7" v-model="usernameInput" @blur="checkInputEmptyForUsername" @keyup.enter="submitEvent" :invalid="isUsernameInvalid" />
      <p class="text-base font-bold u-txt-pcolor mt-6">Password</p>
      <InputText class="mt-2 w-80 h-7" v-model="passwordInput" @blur="checkInputEmptyForPassword" @keyup.enter="submitEvent" :invalid="isPasswordInvalid"/>
      <br /><button class="mt-10 w-40 h-12 rounded-sm u-bg-pcolor-darker text-white font-bold text-base cursor-pointer" @click="submitEvent">SIGN IN</button>
      <p class="text-base font-bold u-txt-pcolor mt-16">www.nsp.xu.edu.ph</p>
    </div>
  </div>
</template>

<style scoped></style>
