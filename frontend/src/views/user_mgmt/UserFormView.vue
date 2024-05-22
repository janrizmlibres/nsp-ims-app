<script setup>
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

import ContentPane from '@/components/UI/ContentPane.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import AddForm from '@/components/user_mgmt/AddForm.vue'

import { useUsersStore } from '@/stores/users'
import router from '@/router'

import { ref, onMounted, computed } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'

const route = useRoute()
const usersStore = useUsersStore()

const formData = ref({
  password: '',
  firstName: '',
  middleName: '',
  lastName: '',
  suffixName: '',
  email: '',
  contactNum: '',
  position: ''
})

const isLoading = ref(false)
const okToLeave = ref(true)
const isInitialState = ref(true)
const updateKey = ref(0)

const headerName = computed(() => (route.params.userId ? 'Edit Record' : 'Add Record'))
const submitLabel = computed(() => (route.params.userId ? 'Save' : 'Submit'))
const isEditView = computed(() => !route.params.userId)

const toast = useToast()
const confirm = useConfirm()

function updateData(data) {
  okToLeave.value = false
  formData.value = data
  isInitialState.value = false
}

async function submitData() {
  try {
    isLoading.value = true

    const result = route.params.userId
      ? await usersStore.updateUser(route.params.userId, formData.value)
      : await usersStore.addUser(formData.value)

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: result.data.message,
      life: 5000
    })

    isLoading.value = false
    okToLeave.value = true
    await router.replace({ name: 'user-records' })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.message,
      life: 3000
    })
    isLoading.value = false
  }
}

async function goToUserRecordsView() {
  await router.push({ name: 'user-records' })
}

onBeforeRouteLeave((to) => {
  if (okToLeave.value) {
    return true
  }

  confirm.require({
    message: 'Do you really want to leave? You have unsaved changes!',
    header: 'Redirect Confirmation',
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

    formData.value = {
      password: '',
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      suffixName: user.suffixName,
      email: user.email,
      contactNum: user.contactNum,
      position: user.position
    }

    updateKey.value += 1
  } catch (error) {
    router.back()
  }
})
</script>

<template>
  <ContentPane :header="`User Management / ${headerName}`">
    <div class="flex flex-col gap-3 h-full mr-1" :key="updateKey">
      <BaseCard class="grow">
        <AddForm :formDataProp="formData" :isEditView="isEditView" @dataChanged="updateData" />
      </BaseCard>

      <div class="flex-none text-right">
        <div class="inline-block">
          <Button class="h-10 u-bg-green" :disabled="isInitialState" @click="submitData">
            <ProgressSpinner
              v-if="isLoading"
              style="width: 50px; height: 50px"
              strokeWidth="8"
              class="fill-surface-0 dark:fill-surface-800"
              animationDuration=".5s"
              aria-label="Custom ProgressSpinner"
            />

            <div v-else>
              <font-awesome-icon
                icon="fa-solid fa-circle-check"
                class="absolute top-2/4 -mt-2 left-3"
              />
              <h2 class="pl-5 font-bold">{{ submitLabel }}</h2>
            </div>
          </Button>
          <Button
            class="h-10 ml-2 u-bg-red"
            label="Cancel"
            icon="fa-solid fa-circle-xmark"
            @click="goToUserRecordsView"
          />
        </div>
      </div>
    </div>
  </ContentPane>
</template>
