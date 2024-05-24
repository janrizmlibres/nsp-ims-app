<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const props = defineProps({
  data: Object,
  filtersProp: Object,
  emptyText: String,
  loadingText: String,
  isLoading: Boolean
})

defineEmits(['emitClick'])

const filters = ref(props.filtersProp)
</script>

<template>
  <DataTable
    v-model:filters="filters"
    :value="data"
    :loading="isLoading"
    :globalFilterFields="['id', 'fullname']"
    scrollable
    :ptOptions="{ mergeProps: true }"
  >
    <template #empty>{{ emptyText }}</template>
    <template #loading> {{ loadingText }}</template>

    <Column header="" class="min-w-64">
      <template #body="slotProps">
        <div class="flex items-center justify-center gap-2">
          <RouterLink :to="{ name: 'edit-user', params: { userId: slotProps.data.id } }">
            <Button icon="fa-solid fa-user-pen" text rounded aria-label="Edit" />
          </RouterLink>
          <Button
            class="h-8"
            label="Change Pasword"
            icon="fa-solid fa-key"
            outlined
            size="small"
            @click="$emit('emitClick', slotProps.data.id, slotProps.data.fullname)"
          />
        </div>
      </template>
    </Column>

    <Column field="id" header="User ID" sortable></Column>
    <Column field="fullname" header="Full Name" sortable></Column>
    <Column field="contactNum" header="Contact #" sortable></Column>

    <Column field="email" header="Email" sortable>
      <template #body="slotProps">
        <Tag v-if="!slotProps.data.email" severity="warning" value="No Data" />
        <span v-else>{{ slotProps.data.email }}</span>
      </template>
    </Column>

    <Column field="position" header="Position" sortable></Column>

    <Column field="lastLogin" header="Last Login" sortable>
      <template #body="slotProps">
        <Tag v-if="!slotProps.data.lastLogin" severity="warning" value="No Data" />
        <span v-else>{{ slotProps.data.lastLogin }}</span>
      </template>
    </Column>

    <template #footer>
      <span class="font-medium">
        Record(s) count:
        <span class="u-txt-red">
          {{ data.length }}
        </span>
      </span>
    </template>
  </DataTable>
</template>
