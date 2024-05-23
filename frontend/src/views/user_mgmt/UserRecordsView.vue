<script setup>
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Card from 'primevue/card'

import ContentPane from '@/components/UI/ContentPane.vue'
import TheHeader from '@/components/user_mgmt/TheHeader.vue'
import ChangePwDialog from '@/components/user_mgmt/ChangePwDialog.vue'
import RecordsTable from '@/components/user_mgmt/RecordsTable.vue'

import { FilterMatchMode } from 'primevue/api'
import { ref, onMounted } from 'vue'

import { useUsersStore } from '@/stores/users'
import { AccessLevels } from '@/util/user_utils'

const usersStore = useUsersStore()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const isLoading = ref(true)
const visible = ref(false)
const tabindex = ref(0)
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
    await usersStore.getAllUser({
      includePerms: false,
      levelsToFetch: [AccessLevels.SubAdmin, AccessLevels.Staff]
    })

    usersStore.users.forEach((user) => {
      if (!user.lastLogin) return

      const date = new Date(user.lastLogin)
      user.lastLogin = date.toLocaleDateString(
        { hour12: true },
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        }
      )
    })
  } catch (error) {
    console.log(error.response.data.message)
  }

  isLoading.value = false
})
</script>

<template>
  <ContentPane header="User Records">
    <TheHeader :globalFilter="filters.global.value" @filterChanged="updateGlobalFilter" />

    <Card :pt="{ content: 'h-full', body: 'h-full px-4 pt-1' }" class="rounded-md inline-block">
      <template #content>
        <TabView :tabindex="tabindex" :pt="{ tabpanel: { content: '' } }">
          <TabPanel header="Sub-Admins">
            <RecordsTable
              :data="usersStore.subadmins"
              :filtersProp="filters"
              emptyText="No sub-admins found."
              loadingText="Loading sub-admin data. Please wait."
              :isLoading="isLoading"
              @emitClick="openPwDialog"
            />
          </TabPanel>

          <TabPanel header="Staff">
            <RecordsTable
              :data="usersStore.staffs"
              :filtersProp="filters"
              emptyText="No staff found."
              loadingText="Loading staff data. Please wait."
              :isLoading="isLoading"
              @emitClick="openPwDialog"
            />
          </TabPanel>
        </TabView>
      </template>
    </Card>
  </ContentPane>

  <ChangePwDialog
    v-model:visible="visible"
    :userId="pwUpdateUserId"
    @closeDialog="visible = false"
  ></ChangePwDialog>
</template>
