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
        group: 'authenticationError',
        message: ' Do you want to extend your session? ',
        header: 'Confirmation',
        acceptButton: 'Yes',
        rejectButton: 'No',
        accept: async () => {
          await authStore.extendSession()

          confirm.require({
            group: 'user-headless',
            header: 'Session Extended',
            message: 'Your session has been extended.',
            acceptLabel: 'OK',
            icon: 'fa-solid fa-hourglass-start'
          })
        },
        reject: async () => {
          await authStore.logout()

          confirm.require({
            group: 'user-headless',
            header: 'You Have Been Logged Out',
            message: 'Session Expired. Please login again.',
            acceptLabel: 'OK',
            icon: 'fa-solid fa-road-barrier'
          })

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
