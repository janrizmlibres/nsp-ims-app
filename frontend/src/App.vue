<script setup>
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast';
import LogoutDialog from '@/components/dialog/LogoutDialog.vue';
</script>

<template>
  <Toast />
  <LogoutDialog />
  <RouterView />
</template>
