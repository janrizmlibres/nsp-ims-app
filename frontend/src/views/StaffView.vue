<script setup>
import TabMenu from 'primevue/tabmenu'
import Card from 'primevue/card'
import TheTable from '@/components/TheTable.vue'

import { ref } from 'vue'

const items = [{ label: 'Staffs' }, { label: 'Permissions' }]
const content = ref('the-table')
const componentMap = { 'the-table': TheTable }
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
        <component :is="componentMap[content]"></component>
      </template>
    </Card>
    <div class="pl-8 pt-2">
      <p>Record(s) count: 1</p>
    </div>
  </div>
</template>
