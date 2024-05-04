<script setup>
import { RouterView, useRouter } from 'vue-router'
import Toast from 'primevue/toast'
import LogoutDialog from '@/components/dialog/LogoutDialog.vue'
import ConfirmDialog from 'primevue/confirmdialog'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios';
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

axios.interceptors.response.use(
  response => {
    // If the request was successful, simply return the response
    return response;
  },
  error => {
    // If the request had an error, check if it's the one we're looking for
    if (error.response && error.response.data.message === 'jwt expired') {
      confirm.require({
        group: 'authenticationError',
        message: ' Do you want to extend your session? ',
        header: 'Confirmation',
        acceptButton: 'Yes',
        rejectButton: 'No',
        accept: () => {
          authStore.extendSession()
          toast.add({
            severity: 'success',
            summary: 'Session Extended',
            detail: 'Your session has been extended.',
            life: 3000
          })
        },
        reject: () => {
          authStore.logout()
          toast.add({
            severity: 'error',
            summary: 'You Have Been Logged Out',
            detail: 'Session Expired. Please login again.',
            life: 3000
          })
          router.replace({ name: 'login' })
        }
      });
    }

    // Always reject the Promise with the error
    return Promise.reject(error);
  }
);
</script>

<template>
  <Toast />
  <ConfirmDialog />
  <LogoutDialog />
  <RouterView />
</template>
