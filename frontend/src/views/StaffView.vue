<script>
import TabMenu from 'primevue/tabmenu'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

export default {
  data() {
    return {
      items: [{ label: 'Staffs' }, { label: 'Permissions' }],
      students: [
        {
          userId: '52513',
          fullName: 'Janriz Libres',
          position: 'Social Media Manager'
        },
        {
          userId: '52514',
          fullName: 'Nazib Dimal',
          position: 'Lead Engineer'
        }
      ]
    }
  },
  components: { TabMenu, Card, DataTable, Column }
}
</script>

<template>
  <div class="h-screen p-12">
    <Card :pt="{ content: '' }" class="h-full rounded-[5px]">
      <template #content>
        <TabMenu
          :model="items"
          :pt="{
            action: ({ context, state }) => ({
              class: [
                {
                  'u-tab-border-blue': state.d_activeIndex === context.index,
                  'u-text-blue': state.d_activeIndex === context.index
                }
              ]
            })
          }"
          :pt-options="{ mergeProps: true }"
        />
        <DataTable :value="students">
          <Column field="userId" header="User ID"></Column>
          <Column field="fullName" header="Full Name"></Column>
          <Column field="position" header="Position"></Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>
