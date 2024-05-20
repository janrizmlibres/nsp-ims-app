<script setup>
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

import ContentPane from '@/components/UI/ContentPane.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import AddForm from '@/components/staff_mgmt/AddForm.vue'

import { useStaffsStore } from '@/stores/staffs'
import router from '@/router'

import { ref, onMounted } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

const props = defineProps({
  userId: {
    type: String,
    default: null
  }
})

const staffsStore = useStaffsStore()

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

const headerName = ref(props.userId === null ? 'Add Record' : 'Edit Record')
const submitLabel = ref(props.userId === null ? 'Submit' : 'Save')

const isLoading = ref(false)
const okToLeave = ref(true)
const isInitialState = ref(true)
const updateKey = ref(0)
const isEditView = ref(props.userId === null)

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

    const result =
      props.userId !== null
        ? await staffsStore.updateStaff(props.userId, formData.value)
        : await staffsStore.addStaff(formData.value)

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: result.data.message,
      life: 5000
    })

    isLoading.value = false
    okToLeave.value = true
    await router.replace({ name: 'staff-records' })
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

async function goToStaffRecordsView() {
  await router.push({ name: 'staff-records' })
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
  if (props.userId === null) {
    return
  }

  try {
    const result = await staffsStore.getStaff(props.userId)
    const staff = result.data.staff

    formData.value = {
      password: '',
      firstName: staff.firstName,
      middleName: staff.middleName,
      lastName: staff.lastName,
      suffixName: staff.suffixName,
      email: staff.email,
      contactNum: staff.contactNum,
      position: staff.position
    }

    updateKey.value += 1
  } catch (error) {
    router.back()
  }
})
</script>

<template>
  <ContentPane :header="`Staff Management / ${headerName}`">
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
            @click="goToStaffRecordsView"
          />
        </div>
      </div>
    </div>
  </ContentPane>
</template>
