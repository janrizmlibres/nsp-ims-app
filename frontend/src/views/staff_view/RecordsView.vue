<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import TheHeader from '@/components/staff_view/TheHeader.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import TheFooter from '@/components/staff_view/TheFooter.vue'
import RecordsTable from '@/components/staff_view/RecordsTable.vue'

import { onBeforeMount, ref } from 'vue'
import axios from 'axios'

import { useStaffsStore } from '@/stores/staffs'
import { useAuthStore } from '@/stores/auth'

const staffsStore = useStaffsStore()
const authStore = useAuthStore()

const isLoading = ref(false)

onBeforeMount(async () => {
  if (staffsStore.isFirstLoad) {
    isLoading.value = true

    try {
      const result = await axios.get('http://localhost:8080/admin/staffs', {
        headers: { Authorization: 'Bearer ' + authStore.token }
      })

      staffsStore.staffs = result.data.staffs
    } catch (error) {
      console.log(error.response.data.message)
    }

    isLoading.value = false
    staffsStore.isFirstLoad = false
  }
})
</script>

<template>
  <ContentPane header="Staff Records">
    <TheHeader />

    <BaseCard>
      <RecordsTable :staffs="staffsStore.staffs" />
    </BaseCard>

    <TheFooter :staffCount="staffsStore.staffs.length" />
  </ContentPane>
</template>
