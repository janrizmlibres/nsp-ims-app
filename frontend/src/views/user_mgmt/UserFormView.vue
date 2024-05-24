<script setup>
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

import ContentPane from '@/components/UI/ContentPane.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import UserForm from '@/components/user_mgmt/UserForm.vue'

import { useUsersStore } from '@/stores/users'
import router from '@/router'

import { ref, onMounted, computed } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { isEqual } from 'lodash'

const route = useRoute()
const usersStore = useUsersStore()

let initialData = {
  password: '',
  confirmPass: '',
  firstName: '',
  middleName: '',
  lastName: '',
  suffixName: '',
  email: '',
  contactNum: '',
  position: '',
  isSubAdmin: false
}
const formData = ref(structuredClone(initialData))

const isLoading = ref(false)
const okToLeave = ref(false)
const updateKey = ref(0)

const headerName = computed(() => (route.params.userId ? 'Edit Record' : 'Add Record'))
const submitLabel = computed(() => (route.params.userId ? 'Save' : 'Submit'))
const isEditView = computed(() => !route.params.userId)
const isFormDirty = computed(() => !isEqual(initialData, formData.value))

const toast = useToast()
const confirm = useConfirm()

function updateData(data) {
  formData.value = data
}

async function submitData() {
  if (isEditView.value) {
    if (formData.value.password !== formData.value.confirmPass) {
      confirm.require({
        group: 'user-headless',
        header: 'Passwords Do Not Match',
        message: 'Please reconfirm your password',
        acceptLabel: 'OK',
        icon: 'fa-solid fa-not-equal'
      })
      return
    }

    if (formData.value.password.length < 8) {
      confirm.require({
        group: 'user-headless',
        header: 'Password Requirements Not Met',
        message: 'Password must be at least 8 characters long',
        acceptLabel: 'OK',
        icon: 'fa-solid fa-shield-halved'
      })
      return
    }
  }

  try {
    isLoading.value = true

    formData.value.accessLevel = formData.value.isSubAdmin ? 2 : 3
    // eslint-disable-next-line no-unused-vars
    const { isSubAdmin, confirmPass, ...finalData } = formData.value

    const result = route.params.userId
      ? await usersStore.updateUser(route.params.userId, finalData)
      : await usersStore.addUser(finalData)

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: result.data.message,
      life: 5000
    })

    okToLeave.value = true
    await router.replace({ name: 'user-records' })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 3000
    })
  } finally {
    isLoading.value = false
  }
}

async function goToUserRecordsView() {
  await router.push({ name: 'user-records' })
}

onBeforeRouteLeave((to) => {
  if (!isFormDirty.value || okToLeave.value) {
    return true
  }

  confirm.require({
    group: 'user-headless',
    header: 'Redirect Confirmation',
    message: 'Do you really want to leave? You have unsaved changes!',
    acceptLabel: 'Yes',
    rejectLabel: 'No',
    icon: 'fa-solid fa-diamond-turn-right',
    accept: async () => {
      okToLeave.value = true
      await router.push(to)
    }
  })

  return false
})

onMounted(async () => {
  if (!route.params.userId) return

  try {
    const result = await usersStore.getUser(route.params.userId)
    const user = result.data.user

    initialData = {
      password: '',
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      suffixName: user.suffixName,
      email: user.email,
      contactNum: user.contactNum,
      position: user.position,
      isSubAdmin: user.accessLevel === 2
    }

    formData.value = structuredClone(initialData)
    updateKey.value += 1
  } catch (error) {
    console.log('Something went strong')
    router.back()
  }
})
</script>

<template>
  <ContentPane :header="`User Management / ${headerName}`">
    <form @submit.prevent="submitData">
      <div class="flex flex-col gap-3" :key="updateKey">
        <BaseCard class="grow">
          <UserForm :formDataProp="formData" :isEditView="isEditView" @dataChanged="updateData" />
        </BaseCard>

        <div class="flex-none text-right">
          <div class="inline-block">
            <Button
              class="h-10 u-bg-green"
              :label="submitLabel"
              :loading="isLoading"
              type="submit"
              icon="fa-solid fa-circle-check"
              :disabled="!isFormDirty"
            />
            <Button
              class="h-10 ml-2 u-bg-red"
              label="Cancel"
              icon="fa-solid fa-circle-xmark"
              @click="goToUserRecordsView"
            />
          </div>
        </div>
      </div>
    </form>
  </ContentPane>
</template>
