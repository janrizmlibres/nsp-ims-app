<script setup>
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import LogoutDialog from '@/components/dialog/LogoutDialog.vue'
import ConfirmDialog from 'primevue/confirmdialog'
import CancelDialog from './components/dialog/CancelDialog.vue';
</script>

<template>
  <Toast />
  <ConfirmDialog />
  <LogoutDialog />
  <CancelDialog />
  <RouterView />
</template>
