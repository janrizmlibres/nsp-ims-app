<script setup>
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

import ContentPane from '@/components/UI/ContentPane.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import AddForm from '@/components/staff_view/AddForm.vue'

import { useStaffsStore } from '@/stores/staffs'
import router from '@/router'

import { computed, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

const props = defineProps({
  userId: {
    type: String,
    default: null
  }
})

const staffsStore = useStaffsStore()

const formData = computed(() => {
  if (props.userId === null) {
    return {
      password: '',
      firstName: '',
      middleName: '',
      lastName: '',
      suffixName: '',
      email: '',
      contactNum: '',
      position: ''
    }
  }

  const staff = staffsStore.findStaff(props.userId)
  console.log(staff)

  return {
    password: '',
    firstName: staff.first_name,
    middleName: staff.middle_name,
    lastName: staff.last_name,
    suffixName: staff.suffix_name,
    email: staff.email,
    contactNum: staff.contact_num,
    position: staff.position
  }
})

const headerName = ref(props.userId === null ? 'Add Record' : 'Edit Record')
const submitLabel = ref(props.userId === null ? 'Submit' : 'Save')

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

    const result = await staffsStore.addStaff(formData)

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: result.data.message,
      life: 5000
    })
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

async function goToStaffRecordsView() {
  await router.push({ name: 'staff-records' })
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
  <ContentPane :header="`Staff Management / ${headerName}`">
    <div class="flex flex-col gap-3 h-full mr-1">
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
