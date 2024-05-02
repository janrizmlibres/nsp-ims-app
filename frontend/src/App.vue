<script setup>
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import LogoutDialog from '@/components/dialog/LogoutDialog.vue'
import ConfirmDialog from 'primevue/confirmdialog'
</script>

<template>
  <Toast />
  <ConfirmDialog />
  <LogoutDialog />
  <RouterView />
</template>
