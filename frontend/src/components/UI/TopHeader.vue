<script setup>
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();

const confirmLogout = () => {
  confirm.require({
    group: 'logout',
    message: ' Are you sure you want to logout?',
    header: 'Confirmation',
    accept: () => {
      logout()
    },
    reject: () => {}
  });
};

defineProps(['header'])

const authStore = useAuthStore()

async function logout() {
  authStore.logout()
  await router.replace({ name: 'login' })
}
</script>

<template>
  <div class="flex h-auto u-txt-active mb-12">
    <div class="flex grow text-4xl font-medium">
      <img src="@/assets/logo.png" class="size-24" />
      <h1 class="mt-2 ml-2">{{ header }}</h1>
    </div>

    <div class="flex gap-6 mt-2 mr-2">
      <a href="#">
        <font-awesome-icon icon="fa-solid fa-gear" />
        <span class="ml-1.5">Settings</span>
      </a>

      <a href="#" @click="confirmLogout">
        <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
        <span class="ml-1.5">Logout</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
</style>
