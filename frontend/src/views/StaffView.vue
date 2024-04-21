<template>
  <div class="flex flex-col h-full">
    <Card :pt="{ content: '' }" class="flex-1 rounded-[5px]">
      <template #content>
        <TabView>
          <TabPanel header="Staffs">
            <TheTable :students="students" />
          </TabPanel>
          <TabPanel header="Permissions">
            <ThePermissions :students="students" />
          </TabPanel>
        </TabView>
      </template>
    </Card>
    <div class="pl-8 pt-2">
      <p>Record(s) count: {{ students.length }}</p>
    </div>
  </div>
</template>

<script setup>
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Card from 'primevue/card'

import TheTable from '@/components/TheTable.vue'
import ThePermissions from '@/components/ThePermissions.vue'

import { ref } from 'vue'

const students = ref([
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
