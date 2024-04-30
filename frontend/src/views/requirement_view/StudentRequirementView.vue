<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import StudentRequirementTable from '@/components/requirement_view/StudentRequirementTable.vue'
import StudentRequirementTableHeader from '@/components/requirement_view/StudentRequirementTableHeader.vue'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

import { useRequirementStore } from '@/stores/requirements'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const requirementStore = useRequirementStore()
</script>

<template>
  <ContentPane header="Student Requirement Management">
    <StudentRequirementTableHeader />

    <div class="flex grow bg-white rounded-md shadow-xl p-8 w-grow mb-4">
      <div class="flex grow items-center grid-cols-2 gap-4 mb-4">
        <!-- enter learning strand code -->
        <div class="flex items-center">
          <span class="mr-3 u-txt-active">Student Requirement</span>
          <div>
            <InputText class="grow h-11.5" type="text" v-model="value" />
          </div>
        </div>

        <div class="flex grow h-11.5s">
          <Button class="u-bg-green" label="Create" icon="fa-solid fa-plus" />
        </div>
      </div>
    </div>

    <StudentRequirementTable />
  </ContentPane>
</template>
