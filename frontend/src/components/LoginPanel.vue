<script setup>
import {ref} from "vue";
import { checkInputEmpty } from "@/utils/interactions.js";

const usernameInput = ref(null);
const passwordInput = ref(null);

const submitEvent = () => {
  checkInputEmpty(usernameInput)
  checkInputEmpty(passwordInput)
}

</script>

<template>
  <div class="flex justify-center items-center w-30rem h-33rem rounded-lg shadow-xl bg-white">
    <div class="block justify-left">
      <p class="text-4xl font-bold text-u-bg-pcolor tracking-ultra mb-12">WELCOME!</p>
      <p class="text-base font-bold text-u-bg-pcolor">User ID</p>
      <input class="mt-2 w-80 h-7 rounded-sm border-2 border-slate-400" ref="usernameInput" @blur="checkInputEmpty(usernameInput)"/>
      <p class="text-base font-bold text-u-bg-pcolor mt-6">Password</p>
      <input class="mt-2 w-80 h-7 rounded-sm border-2 border-slate-400" ref="passwordInput"/>
      <br /><button class="mt-10 w-40 h-12 rounded-sm bg-u-bg-pcolor text-white font-bold text-base cursor-pointer" @click="submitEvent">SIGN IN</button>
      <p class="text-base font-bold text-u-bg-pcolor  mt-16">www.nsp.xu.edu.ph</p>
    </div>
  </div>
</template>

<style scoped>
</style>