<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import TheHeader from '@/components/staff_view/TheHeader.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import TheFooter from '@/components/staff_view/TheFooter.vue'
import RecordsTable from '@/components/staff_view/RecordsTable.vue'

import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import { useStaffsStore } from '@/stores/staffs'

const store = useStaffsStore()
const isLoading = ref(false)

onBeforeMount(async () => {
  if (store.staffs.length == 0) {
    isLoading.value = true

    try {
      const result = await axios.get('http://localhost:8080/admin/staffs', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      store.staffs = result.data.staffs
    } catch (error) {
      console.log(error.data.message)
    }

    isLoading.value = false
  }
})
</script>

<template>
  <ContentPane header="Staff Records">
    <TheHeader />

    <BaseCard>
      <RecordsTable :staffs="store.staffs" />
    </BaseCard>

    <TheFooter :staffCount="store.staffs.length" />
  </ContentPane>
</template>
