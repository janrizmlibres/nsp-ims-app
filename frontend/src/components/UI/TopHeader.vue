<script setup>
import { useAuthStore } from '@/stores/auth.js'
import router from '@/router'
import { useConfirm } from 'primevue/useconfirm'

const confirm = useConfirm()

const confirmLogout = () => {
  confirm.require({
    group: 'authenticationError',
    message: ' Are you sure you want to logout?',
    header: 'Confirmation',
    acceptButton: 'Logout',
    rejectButton: 'Cancel',
    accept: () => {
      logout()
    },
    reject: () => {}
  })
}

defineProps(['header', 'subheader'])

const authStore = useAuthStore()

async function logout() {
  await authStore.logout()
  await router.push({ name: 'login' })
}
</script>

<template>
  <div class="flex h-auto u-txt-active mb-12">
    <div class="flex flex-row grow font-medium">
      <img src="@/assets/logo.png" class="size-24" />
      <div class="flex flex-col text-4xl">
        <h1 class="mt-2 ml-2">{{ header }}</h1>
        <h4 class="mt-2 ml-2 text-2xl">{{ subheader }}</h4>
      </div>
    </div>

    <div class="flex gap-6 mt-2 mr-2">
      <a href="#" @click="confirmLogout">
        <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
        <span class="ml-1.5">Logout</span>
      </a>
    </div>
  </div>
</template>

<style scoped></style>
