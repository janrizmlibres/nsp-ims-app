<script setup>
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'

import ContentPane from '@/components/UI/ContentPane.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import TheHeader from '@/components/user_mgmt/TheHeader.vue'
import ChangePwDialog from '@/components/user_mgmt/ChangePwDialog.vue'
import RecordsTable from '@/components/user_mgmt/RecordsTable.vue'

import { FilterMatchMode } from 'primevue/api'
import { ref } from 'vue'

import { useUsersStore } from '@/stores/users'

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

function finishLoad() {
  isLoading.value = false
}
</script>

<template>
  <ContentPane header="User Records">
    <TheHeader :globalFilter="filters.global.value" @filterChanged="updateGlobalFilter" />

    <BaseCard>
      <TabView :tabindex="tabindex">
        <TabPanel header="Sub-Admins">
          <RecordsTable
            :data="usersStore.subadmins"
            :filtersProp="filters"
            emptyText="No sub-admins found."
            loadingText="Loading sub-admin data. Please wait."
            :isLoading="isLoading"
            @loadingDone="finishLoad"
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
            @loadingDone="finishLoad"
            @emitClick="openPwDialog"
          />
        </TabPanel>
      </TabView>
    </BaseCard>

    <div class="pl-8 pt-2 font-medium">
      <p>
        Record(s) count:
        <span class="u-txt-red">
          {{ tabindex ? usersStore.staffs.length : usersStore.subadmins.length }}
        </span>
      </p>
    </div>
  </ContentPane>

  <ChangePwDialog
    v-model:visible="visible"
    :userId="pwUpdateUserId"
    @closeDialog="visible = false"
  ></ChangePwDialog>
</template>
