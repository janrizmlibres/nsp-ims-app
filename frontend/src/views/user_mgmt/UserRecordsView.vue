<script setup>
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Card from 'primevue/card'

import ContentPane from '@/components/UI/ContentPane.vue'
import TheHeader from '@/components/user_mgmt/TheHeader.vue'
import ChangePwDialog from '@/components/user_mgmt/ChangePwDialog.vue'
import RecordsTable from '@/components/user_mgmt/RecordsTable.vue'

import { FilterMatchMode } from 'primevue/api'
import { ref, onMounted, computed } from 'vue'

import { useUsersStore } from '@/stores/users'
import { useAuthStore } from '@/stores/auth'
import { AccessLevels } from '@/util/user_utils'

const authStore = useAuthStore()
const usersStore = useUsersStore()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const isLoading = ref(true)
const visible = ref(false)
const tabindex = ref(0)
const dt = ref([])

const pwUpdateUserId = ref(null)
const pwUpdateFullname = ref(null)

const isAdmin = computed(() => authStore.user.accessLevel === 1)

function updateGlobalFilter(newValue) {
  filters.value.global.value = newValue
}

function openPwDialog(userId, userFullname) {
  pwUpdateUserId.value = userId
  pwUpdateFullname.value = userFullname
  visible.value = true
}

function updateDt(dtValue) {
  dt.value.push(dtValue)
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
    <TheHeader
      :dt="dt"
      :tabindex="tabindex"
      :globalFilter="filters.global.value"
      @filterChanged="updateGlobalFilter"
    />

    <Card :pt="{ content: 'h-full', body: 'h-full px-4 pt-1' }" class="rounded-md inline-block">
      <template #content>
        <TabView v-if="isAdmin" :tabindex="tabindex" :pt="{ tabpanel: { content: '' } }">
          <TabPanel header="Sub-Admins">
            <RecordsTable
              :data="usersStore.subadmins"
              :filtersProp="filters"
              emptyText="No sub-admins found."
              loadingText="Loading sub-admin data. Please wait."
              :isLoading="isLoading"
              @emitClick="openPwDialog"
              @dtReferred="updateDt"
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
              @dtReferred="updateDt"
            />
          </TabPanel>
        </TabView>

        <TabView v-else :tabindex="tabindex" :pt="{ tabpanel: { content: '' } }">
          <TabPanel header="Staff">
            <RecordsTable
              :data="usersStore.staffs"
              :filtersProp="filters"
              emptyText="No staff found."
              loadingText="Loading staff data. Please wait."
              :isLoading="isLoading"
              @emitClick="openPwDialog"
              @dtReferred="updateDt"
            />
          </TabPanel>
        </TabView>
      </template>
    </Card>

    <div v-show="isAdmin" class="font-medium mt-4 ml-4">
      Total users:
      <span class="u-txt-red">
        {{ usersStore.users.length }}
      </span>
    </div>
  </ContentPane>

  <ChangePwDialog
    v-model:visible="visible"
    :userId="pwUpdateUserId"
    :fullname="pwUpdateFullname"
    @closeDialog="visible = false"
  ></ChangePwDialog>
</template>
