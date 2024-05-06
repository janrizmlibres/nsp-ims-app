<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import StudentHeader from '@/components/student_view/StudentHeader.vue'
</script>

<template>
  <ContentPane header="Student Records">
    <StudentHeader />
    <DataTable
      :value="rosterStore.data"
      v-model:filters="mutFilters"
      :globalFilterFields="['id', 'fullname']"
      scrollable
      removableSort
      :ptOptions="{ mergeProps: true }"
      :pt="custom_pt"
    >
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        sortable
      ></Column>
    </DataTable>
  </ContentPane>
</template>
