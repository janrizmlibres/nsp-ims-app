<script setup>
import BaseCard from '@/components/UI/BaseCard.vue'
import ContentPane from '@/components/UI/ContentPane.vue'
import PermissionsTable from '@/components/staff_view/PermissionsTable.vue'
import TheHeader from '@/components/staff_view/TheHeader.vue'
import TheFooter from '@/components/staff_view/TheFooter.vue'
</script>

<template>
  <ContentPane header="Staff Permissions">
    <TheHeader />

    <BaseCard>
      <PermissionsTable :staffs="staffs" />
    </BaseCard>

    <TheFooter :staffCount="staffs.length" />
  </ContentPane>
</template>
