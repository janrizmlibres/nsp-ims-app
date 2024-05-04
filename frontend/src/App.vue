<script setup>
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import LogoutDialog from '@/components/dialog/LogoutDialog.vue'
import ConfirmDialog from 'primevue/confirmdialog'
import ActionDialog from './components/dialog/ActionDialog.vue';
</script>

<template>
  <Toast />
  <ConfirmDialog />
  <LogoutDialog />
  <ActionDialog />
  <RouterView />
</template>
