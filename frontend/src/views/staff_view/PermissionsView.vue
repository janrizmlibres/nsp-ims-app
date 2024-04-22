<script setup>
import BaseCard from '@/components/UI/BaseCard.vue'
import ContentPane from '@/components/UI/ContentPane.vue'
import PermissionsTable from '@/components/staff_view/PermissionsTable.vue'
import TheHeader from '@/components/staff_view/TheHeader.vue'

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
  <ContentPane header="Staff Permissions">
    <TheHeader />

    <BaseCard>
      <PermissionsTable :staffs="staffs" />
    </BaseCard>

    <div class="pl-8 pt-2 font-medium">
      <p>
        Record(s) count: <span class="u-txt-red"> {{ staffs.length }} </span>
      </p>
    </div>
  </ContentPane>
</template>
