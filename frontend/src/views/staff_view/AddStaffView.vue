<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import ProgressSpinner from 'primevue/progressspinner'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

import ContentPane from '@/components/UI/ContentPane.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import AddForm from '@/components/staff_view/AddForm.vue'

import { useAuthStore } from '@/stores/auth'
import router from '@/router'

import { ref } from 'vue'
import axios from 'axios'
import { onBeforeRouteLeave } from 'vue-router'

const authStore = useAuthStore()
const formData = ref({
  username: '',
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
const okToLeave = ref(false)

const toast = useToast()
const confirm = useConfirm()

function updateData(data) {
  formData.value = data
}

async function submitData() {
  try {
    isLoading.value = true

    const result = await axios.post('http://localhost:8080/auth/signup', formData.value, {
      headers: { Authorization: 'Bearer ' + authStore.token }
    })

    console.log(result.data.message)
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

onBeforeRouteLeave((to) => {
  if (okToLeave.value) {
    return true
  }

  confirm.require({
    message: 'Do you really want to leave? you have unsaved changes!',
    header: 'Redirect Confirmation',
    accept: async () => {
      okToLeave.value = true
      await router.push(to)
    }
  })

  return false
})
</script>

<template>
  <ContentPane header="Staff Management / Add Record">
    <div class="flex flex-col gap-3 h-full mr-1">
      <div>
        <BaseCard :isNotPadded="true" class="py-2 px-6">
          <div class="flex gap-6 items-center">
            <div class="font-medium text-right">
              <span>Position</span>
            </div>
            <InputText class="h-10" type="text" v-model="formData.position" />
          </div>
        </BaseCard>
      </div>

      <BaseCard class="grow">
        <AddForm :formDataProp="formData" @dataChanged="updateData" />
      </BaseCard>

      <div class="flex-none text-right">
        <div class="inline-block">
          <Button class="h-10 u-bg-green" @click="submitData">
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
              <h2 class="pl-5 font-bold">Submit</h2>
            </div>
          </Button>
          <Button class="h-10 ml-2 u-bg-red" label="Cancel" icon="fa-solid fa-circle-xmark" />
        </div>
      </div>
    </div>
  </ContentPane>
</template>
