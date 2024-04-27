<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import TheHeader from '@/components/staff_view/TheHeader.vue'
import TheFooter from '@/components/staff_view/TheFooter.vue'
import RecordsTable from '@/components/staff_view/RecordsTable.vue'

import { FilterMatchMode } from 'primevue/api'
import { ref } from 'vue'

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

function updateGlobalFilter(newValue) {
  filters.value.global.value = newValue
}
</script>

<template>
  <ContentPane header="Staff Records">
    <TheHeader :globalFilter="filters.global.value" @filterChanged="updateGlobalFilter" />
    <RecordsTable :filters="filters" />
    <TheFooter />
  </ContentPane>
</template>
