<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'

import ContentPane from '@/components/UI/ContentPane.vue'
import TheHeader from '@/components/staff_view/TheHeader.vue'
import ChangePwDialog from '@/components/staff_view/ChangePwDialog.vue'

import { useStaffsStore } from '@/stores/staffs'
import { FilterMatchMode } from 'primevue/api'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const staffsStore = useStaffsStore()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const isLoading = ref(true)
const visible = ref(false)
const pwUpdateUserId = ref(null)

function updateGlobalFilter(newValue) {
  filters.value.global.value = newValue
}

function openPwDialog(userId) {
  pwUpdateUserId.value = userId
  visible.value = true
}

onMounted(async () => {
  try {
    await staffsStore.getAllStaff({ includePerms: false })
  } catch (error) {
    console.log(error.response.data.message)
  }

  isLoading.value = false
})
</script>

<template>
  <ContentPane header="Staff Records">
    <TheHeader :globalFilter="filters.global.value" @filterChanged="updateGlobalFilter" />

    <DataTable
      v-model:filters="filters"
      :value="staffsStore.staffs"
      :loading="isLoading"
      :globalFilterFields="['id', 'fullname']"
      scrollable
      :ptOptions="{ mergeProps: true }"
    >
      <template #empty> No staffs found. </template>
      <template #loading> Loading staffs data. Please wait. </template>

      <Column header="" class="max-w-28">
        <template #body="slotProps">
          <RouterLink :to="{ name: 'edit-staff', params: { userId: slotProps.data.id } }">
            <Button class="h-8" label="Edit" icon="fa-solid fa-user-pen" outlined />
          </RouterLink>
          <Button
            class="h-8 ml-2"
            label="Change Pasword"
            icon="fa-solid fa-key"
            outlined
            @click="openPwDialog(slotProps.data.id)"
          />
        </template>
      </Column>

      <Column field="id" header="User ID" sortable></Column>
      <Column field="fullname" header="Full Name" sortable></Column>
    </DataTable>

    <div class="pl-8 pt-2 font-medium">
      <p>
        Record(s) count: <span class="u-txt-red"> {{ staffsStore.staffs.length }} </span>
      </p>
    </div>
  </ContentPane>

  <ChangePwDialog
    v-model:visible="visible"
    :userId="pwUpdateUserId"
    @close="visible = false"
  ></ChangePwDialog>
</template>
