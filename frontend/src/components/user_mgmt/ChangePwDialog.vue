<script setup>
import Dialog from 'primevue/dialog'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import { useToast } from 'primevue/usetoast'

import { useUsersStore } from '@/stores/users'
import { computed, ref } from 'vue'

const props = defineProps(['userId'])
const emit = defineEmits(['closeDialog'])

const usersStore = useUsersStore()
const toast = useToast()

const newPw = ref('')
const confirmPw = ref('')
const pwSame = computed(
  () => newPw.value === confirmPw.value && newPw.value.length !== 0 && confirmPw.value.length !== 0
)
const isInvalid = computed(
  () => (!pwSame.value && confirmPw.value.length !== 0) || newPw.value.length !== 0
)

function resetInputs() {
  newPw.value = ''
  confirmPw.value = ''
}

async function updatePassword() {
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
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @after-hide="resetInputs"
    :pt="{ root: ({ state }) => ({ class: ['w-fit'] }) }"
    :ptOptions="{ mergeProps: true }"
  >
    <div class="flex gap-4 text-center mt-2">
      <Password v-model="newPw" placeholder="New Password" toggleMask>
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
        :feedback="false"
        placeholder="Confirm Password"
        toggleMask
        :invalid="isInvalid"
      />
    </div>

    <div class="flex justify-end mt-2">
      <Button
        class="h-10 ml-2"
        label="Enter"
        @click="updatePassword"
        @keypress.enter="updatePassword"
        :disabled="!pwSame"
      />
    </div>
  </Dialog>
</template>
