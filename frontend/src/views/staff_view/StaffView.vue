<template>
  <ContentPane>
    <div class="flex flex-col h-full">
      <div class="flex flex-col h-1/4">
        <TopHeader class="grow" header="Staff Management" />

        <div class="mb-2">
          <div class="float-right">
            <span class="relative">
              <font-awesome-icon
                icon="fa-solid fa-magnifying-glass"
                class="absolute top-2/4 -mt-2 left-3"
              />
              <InputText v-model="value1" placeholder="Search Staff" size="small" class="pl-10" />
            </span>
            <Button icon="fa-solid fa-user-plus" aria-label="Submit" class="ml-2 h-10" />
            <Button label="Export Data" icon="fa-solid fa-file-export" class="ml-2 h-10" />
          </div>
        </div>
      </div>

      <Card :pt="{ content: '' }" class="flex-1 rounded-[5px]">
        <template #content>
          <TabView>
            <TabPanel header="Staffs">
              <TheTable :staffs="staffs" />
            </TabPanel>
            <TabPanel header="Permissions">
              <ThePermissions :staffs="staffs" />
            </TabPanel>
          </TabView>
        </template>
      </Card>
      <div class="pl-8 pt-2">
        <p>Record(s) count: {{ staffs.length }}</p>
      </div>
    </div>
  </ContentPane>
</template>

<script setup>
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Card from 'primevue/card'

import ContentPane from '@/components/ui/ContentPane.vue'
import TopHeader from '@/components/ui/TopHeader.vue'
import TheTable from '@/components/TheTable.vue'
import ThePermissions from '@/components/ThePermissions.vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import { ref } from 'vue'

const staffs = ref([
  {
    userId: '52513',
    fullName: 'Janriz Libres',
    position: 'Social Media Manager',
    canAddStuds: false,
    canEnroll: false,
    canUpdateStuds: false,
    canGrade: false,
    canAttendance: false
  },
  {
    userId: '52514',
    fullName: 'Nazib Dimal',
    position: 'Lead Engineer',
    canAddStuds: false,
    canEnroll: false,
    canUpdateStuds: false,
    canGrade: false,
    canAttendance: false
  }
])
</script>
