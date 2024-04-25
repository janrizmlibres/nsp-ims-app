<script setup>
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

defineProps(['header'])

const authStore = useAuthStore()

function logout() {
  authStore.logout()
  router.replace({ name: 'login' })
}
</script>

<template>
  <div class="flex u-txt-active mb-12">
    <div class="flex grow text-4xl font-medium">
      <img src="@/assets/logo.png" class="size-24" />
      <h1 class="mt-2 ml-2">{{ header }}</h1>
    </div>

    <div class="flex gap-6 mt-2 mr-2">
      <a href="#">
        <font-awesome-icon icon="fa-solid fa-gear" />
        <span class="ml-1.5">Settings</span>
      </a>

      <a href="#" @click="logout">
        <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
        <span class="ml-1.5">Logout</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.u-max-height {
  max-height: var(--topbar-max-height);
}
</style>
