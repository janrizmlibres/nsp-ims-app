<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import PermissionsTable from '@/components/staff_view/PermissionsTable.vue'
</script>

<template>
  <ContentPane header="Staff Permissions">
    <!-- <TheHeader :globalFilter="filters.global.value" @filterChanged="updateGlobalFilter" /> -->
    <PermissionsTable :filters="filters" />
  </ContentPane>
</template>
