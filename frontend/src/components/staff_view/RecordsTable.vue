<script setup></script>

<template>
  <DataTable
    v-model:filters="mutFilters"
    :value="staffsStore.staffs"
    :loading="isLoading"
    :globalFilterFields="['id', 'fullname']"
    scrollable
    removableSort
    :ptOptions="{ mergeProps: true }"
    :pt="custom_pt"
  >
    <template #empty> No staffs found. </template>
    <template #loading> Loading staffs data. Please wait. </template>

    <Column header="">
      <template #body="slotProps">
        <RouterLink :to="{ name: 'edit-staff', params: { userId: slotProps.data.id } }">
          <Button class="h-10" label="Edit" icon="fa-solid fa-user-pen" outlined />
        </RouterLink>
      </template>
    </Column>
    <Column field="id" header="User ID" sortable></Column>
    <Column field="fullname" header="Full Name" sortable> </Column>
  </DataTable>
</template>
