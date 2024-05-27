<script setup>
import Dialog from 'primevue/dialog'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

import { useUsersStore } from '@/stores/users'
import { computed, ref } from 'vue'

const props = defineProps({ userId: Number, fullname: String })
const emit = defineEmits(['closeDialog'])

const usersStore = useUsersStore()
const toast = useToast()
const confirm = useConfirm()

const newPw = ref('')
const confirmPw = ref('')
const isInvalid = computed(() => newPw.value !== confirmPw.value)

function resetInputs() {
  newPw.value = ''
  confirmPw.value = ''
}

async function updatePassword() {
  if (newPw.value.length < 8) {
    confirm.require({
      group: 'user-headless',
      header: 'Password Requirements Not Met',
      message: 'Password must be at least 8 characters long',
      acceptLabel: 'OK',
      icon: 'fa-solid fa-shield-halved'
    })
    return
  }

  try {
    const result = await usersStore.updatePw(props.userId, newPw.value)

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: result.data.message,
      life: 5000
    })

    emit('closeDialog')
  } catch (error) {
    console.log(error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 3000
    })
  }
}
</script>

<template>
  <Dialog
    modal
    header="Change Password"
    @afterHide="resetInputs"
    :pt="{ root: 'w-fit' }"
    :ptOptions="{ mergeProps: true }"
  >
    <form @submit.prevent="updatePassword">
      <span class="text-surface-600 dark:text-surface-0/70 block mb-5"
        >Update password for {{ fullname }}.</span
      >

      <div class="flex gap-4 text-center mt-2 mb-4">
        <Password autofocus required v-model="newPw" placeholder="New Password" toggleMask>
          <template #header>
            <h6 class="font-medium m-0 mb-2 text-base">Pick a password</h6>
          </template>
          <template #footer>
            <Divider />
            <p class="mt-2 p-0 mb-2">Suggestions</p>
            <ul class="p-0 pl-2 m-0 ml-2 list-disc leading-6" style="line-height: 1.5">
              <li>At least one lowercase</li>
              <li>At least one uppercase</li>
              <li>At least one numeric</li>
              <li>Minimum 8 characters</li>
            </ul>
          </template>
        </Password>
        <Password
          v-model="confirmPw"
          required
          :feedback="false"
          placeholder="Confirm Password"
          toggleMask
          :invalid="isInvalid"
        />
      </div>

      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="$emit('closeDialog')" />
        <Button type="submit" label="Save" :disabled="isInvalid" />
      </div>
    </form>
  </Dialog>
</template>
