<script setup>
import {ref} from "vue";
import { checkInputEmpty } from "@/utils/interactions.js";
import axios from 'axios';

const usernameInput = ref(null);
const passwordInput = ref(null);

const submitEvent = async () => {
  console.log("Checking if the inputs are empty...")
  if (checkInputEmpty(usernameInput) || checkInputEmpty(passwordInput)) {
    return;
  }
  
  console.log("Submitting the form...")
  
  const username = usernameInput.value.value;
  const password = passwordInput.value.value;
  
  console.log("Username: ", username);
  console.log("Password: ", password);

  try {
    const response = await axios.post('http://localhost:8080/admin/login', {username, password});
    const token = response.data.token;
    // Save the token in the local storage or in a cookie
    localStorage.setItem('token', token);
    console.log("Successfully logged in!")
    // Redirect the user to the dashboard or another page
  } catch (error) {
    // Handle the error
    console.error(error);
  }
}
</script>

<template>
  <div class="flex justify-center items-center w-30rem h-33rem rounded-lg shadow-xl bg-white">
    <div class="block justify-left">
      <p class="text-4xl font-bold text-u-bg-pcolor tracking-ultra mb-12">WELCOME!</p>
      <p class="text-base font-bold text-u-bg-pcolor">User ID</p>
      <input class="mt-2 w-80 h-7 rounded-sm border-2 border-slate-400" ref="usernameInput" @blur="checkInputEmpty($event.target)"/>
      <p class="text-base font-bold text-u-bg-pcolor mt-6">Password</p>
      <input class="mt-2 w-80 h-7 rounded-sm border-2 border-slate-400" ref="passwordInput" @blur="checkInputEmpty($event.target)"/>
      <br /><button class="mt-10 w-40 h-12 rounded-sm bg-u-bg-pcolor text-white font-bold text-base cursor-pointer" @click="submitEvent">SIGN IN</button>
      <p class="text-base font-bold text-u-bg-pcolor  mt-16">www.nsp.xu.edu.ph</p>
    </div>
  </div>
</template>

<style scoped>
</style>