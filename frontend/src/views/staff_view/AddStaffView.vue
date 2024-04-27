<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useToast } from 'primevue/usetoast'

import ContentPane from '@/components/UI/ContentPane.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import AddForm from '@/components/staff_view/AddForm.vue'

import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import axios from 'axios'

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

function updateData(data) {
  formData.value = data
}

async function submitData() {
  try {
    isLoading.value = true

    const result = await axios.post(
      'http://localhost:8080/auth/signup',
      { ...formData.value },
      {
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    )

    console.log(result.data.message)
    isLoading.value = false
  } catch (error) {
    const toast = useToast()
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
          <Button
            class="h-10 u-bg-green"
            :label="!isLoading ? 'Submit' : ''"
            :icon="!isLoading ? 'fa-solid fa-circle-check' : ''"
            @click="submitData"
          >
            <ProgressSpinner
              v-show="isLoading"
              style="width: 50px; height: 50px"
              strokeWidth="8"
              class="fill-surface-0 dark:fill-surface-800"
              animationDuration=".5s"
              aria-label="Custom ProgressSpinner"
            />
          </Button>
          <Button class="h-10 ml-2 u-bg-red" label="Cancel" icon="fa-solid fa-circle-xmark" />
        </div>
      </div>
    </div>
  </ContentPane>
</template>
