<script setup>
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Card from 'primevue/card'
import TheTable from '@/components/TheTable.vue'

import { ref } from 'vue'

const students = ref([
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
])
</script>

<template>
  <div class="h-screen p-12">
    <Card :pt="{ content: '' }" class="h-full rounded-[5px]">
      <template #content>
        <TabView>
          <TabPanel header="Staffs">
            <TheTable :students="students" />
          </TabPanel>
          <TabPanel header="Permissions">
            <p class="m-0">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
              sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
              modi.
            </p>
          </TabPanel>
        </TabView>
      </template>
    </Card>
    <div class="pl-8 pt-2">
      <p>Record(s) count: {{ students.length }}</p>
    </div>
  </div>
</template>
