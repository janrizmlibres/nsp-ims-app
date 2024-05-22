<script setup>
import { onMounted, ref } from 'vue'
import { useUsersStore } from '@/stores/users'
import { AccessLevels } from '@/util/user_utils'

const props = defineProps({
  data: Object,
  emptyText: String,
  loadingText: String,
  isLoading: Boolean
})
const emit = defineEmits(['loadingDone', 'emitClick'])

const usersStore = useUsersStore()
const isLoading = ref(props.isLoading)

onMounted(async () => {
  try {
    await usersStore.getAllUser({
      includePerms: false,
      levelsToFetch: [AccessLevels.SubAdmin, AccessLevels.Staff]
    })
  } catch (error) {
    console.log(error.response.data.message)
  }

  isLoading.value = false
  emit('loadingDone')
})
</script>

<template>
  <DataTable
    v-model:filters="filters"
    :value="usersStore.subadmins"
    :loading="isLoading"
    :globalFilterFields="['id', 'fullname']"
    scrollable
    :ptOptions="{ mergeProps: true }"
  >
    <template #empty> No sub-admins found. </template>
    <template #loading> Loading users data. Please wait. </template>

    <Column header="" class="max-w-28">
      <template #body="slotProps">
        <RouterLink :to="{ name: 'edit-user', params: { userId: slotProps.data.id } }">
          <Button class="h-8" label="Edit" icon="fa-solid fa-user-pen" outlined />
        </RouterLink>
        <Button
          class="h-8 ml-2"
          label="Change Pasword"
          icon="fa-solid fa-key"
          outlined
          @click="$emit('emitClick', slotProps.data.id)"
        />
      </template>
    </Column>

    <Column field="id" header="User ID" sortable></Column>
    <Column field="fullname" header="Full Name" sortable></Column>
  </DataTable>
</template>
