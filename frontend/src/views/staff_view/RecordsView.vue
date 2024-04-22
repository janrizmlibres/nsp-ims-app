<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import TheHeader from '@/components/staff_view/TheHeader.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import TheFooter from '@/components/staff_view/TheFooter.vue'
import RecordsTable from '@/components/staff_view/RecordsTable.vue'

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
  <ContentPane header="Staff Records">
    <TheHeader />

    <BaseCard>
      <RecordsTable :staffs="staffs" />
    </BaseCard>

    <TheFooter :staffCount="staffs.length" />
  </ContentPane>
</template>
