<script setup>
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'

import { RouterView, useRouter } from 'vue-router'
import axios from 'axios'

import LogoutDialog from './components/UI/LogoutDialog.vue'
import UserFormDialog from './components/UI/UserFormDialog.vue'
import ActionDialog from './components/UI/ActionDialog.vue'

import { useAuthStore } from '@/stores/auth'

const confirm = useConfirm()
const authStore = useAuthStore()
const router = useRouter()

axios.interceptors.response.use(
  (response) => {
    // If the request was successful, simply return the response
    return response
  },
  (error) => {
    // If the request had an error, check if it's the one we're looking for
    if (
      error.response &&
      (error.response.data.message === 'jwt expired' ||
        error.response.data.message === 'Not authenticated.')
    ) {
      confirm.require({
        group: 'sessionError',
        message: ' Your session has expired. You have been logged out. ',
        header: 'Confirmation',
        acceptButton: 'OK',
        accept: async () => {
          await authStore.logout()

          await router.push({ name: 'login' })
        }
      })
    }

    // Always reject the Promise with the error
    return Promise.reject(error)
  }
)
</script>

<template>
  <Toast />
  <ConfirmDialog />
  <UserFormDialog />
  <LogoutDialog />
  <ActionDialog />
  <RouterView />
</template>
