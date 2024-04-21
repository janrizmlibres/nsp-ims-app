<template>
  <TheSidebar />
  <main class="w-full ml-4 py-4 pr-4">
    <div class="flex flex-col h-full">
      <TheHeader />
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
  </main>
</template>

<script setup>
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Card from 'primevue/card'

import TheSidebar from '@/components/TheSidebar.vue'
import TheTable from '@/components/TheTable.vue'
import ThePermissions from '@/components/ThePermissions.vue'
import TheHeader from '@/components/TheHeader.vue'

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
