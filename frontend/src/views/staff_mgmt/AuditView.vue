<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import { useStaffsStore } from '@/stores/staffs'
import { onMounted } from 'vue'

const staffsStore = useStaffsStore()

onMounted(async () => {
  try {
    await staffsStore.getAllStaff({ includeAudit: true })
    console.log(staffsStore.staffs)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <ContentPane header="Audit Trails">
    <BaseCard class="h-full">
      <div class="p-6 h-full w-full">
        <Splitter class="h-full w-full">
          <SplitterPanel class="pr-4 pb-6">
            <h2 class="font-bold mb-4">Users</h2>
            <div
              class="p-2 rounded-[0.3125rem] border u-border-color h-full shadow-[0_0_4px_0_rgba(0,0,0,0.1)]"
            >
              <DataTable :value="staffsStore.staffs" :loading="isLoading" scrollable>
                <template #empty> No staffs found. </template>
                <template #loading> Loading staffs data. Please wait. </template>

                <Column field="id" header="User ID" sortable></Column>
                <Column field="fullname" header="Full Name" sortable></Column>
              </DataTable>
            </div>
          </SplitterPanel>
          <SplitterPanel class="pl-4 pb-6">
            <h2 class="font-bold mb-4">Actions</h2>
            <div
              class="p-2 rounded-[0.3125rem] border u-border-color h-full shadow-[0_0_4px_0_rgba(0,0,0,0.1)]"
            >
              <DataTable :value="staffsStore.staffs" :loading="isLoading" scrollable>
                <template #empty> No staffs found. </template>
                <template #loading> Loading staffs data. Please wait. </template>

                <Column field="id" header="User ID" sortable></Column>
                <Column field="fullname" header="Full Name" sortable></Column>
              </DataTable>
            </div>
          </SplitterPanel>
        </Splitter>
        <!-- <div></div>
        <div></div> -->
      </div>
    </BaseCard>
  </ContentPane>
</template>
