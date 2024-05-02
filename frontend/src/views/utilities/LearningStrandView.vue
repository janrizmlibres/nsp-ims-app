<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import LearningStrandTable from '@/components/strand_view/LearningStrandTable.vue'
import LearningStrandTableHeader from '@/components/strand_view/LearningStrandTableHeader.vue'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

import { useStrandStore } from '@/stores/strands'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const strandStore = useStrandStore()
</script>

<template>
  <ContentPane header="Learning Strand Management">
    <LearningStrandTableHeader />

    <div class="flex grow bg-white rounded-md shadow-xl p-8 w-grow mb-4">
      <div class="flex grow items-center grid-cols-2 gap-4 mb-4">
        <!-- enter learning strand code -->
        <div class="flex items-center">
          <span class="mr-3 u-txt-active">Learning Strand Code</span>
          <div>
            <InputText class="grow h-11.5" type="text" v-model="value" />
          </div>
        </div>

        <!-- enter descriptive title of the learning strand -->
        <div class="flex items-center">
          <span class="mr-3 u-txt-active">Learning Strand Name</span>
          <div>
            <InputText class="grow h-11.5" type="text" v-model="value" />
          </div>
        </div>

        <div class="flex items-center flex-column gap-2">
          <Button class="u-bg-green" label="Create" icon="fa-solid fa-plus" />
        </div>
      </div>
    </div>

    <LearningStrandTable />
  </ContentPane>
</template>
