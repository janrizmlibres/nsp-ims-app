<script setup>
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Card from 'primevue/card'

import ContentPane from '@/components/UI/ContentPane.vue'
import TheHeader from '@/components/staff_view/TheHeader.vue'
import TheTable from '@/components/staff_view/TheTable.vue'
import ThePermissions from '@/components/staff_view/ThePermissions.vue'

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

<template>
  <ContentPane>
    <div class="flex flex-col h-full">
      <TheHeader class="flex-col" />

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
