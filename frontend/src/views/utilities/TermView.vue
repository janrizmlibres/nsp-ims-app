<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import TermTable from '@/components/utilities/term_view/TermTable.vue'
import TermTableHeader from '@/components/utilities/term_view/TermTableHeader.vue'

import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import Calendar from 'primevue/calendar'

// import { useTermsStore } from '@/stores/terms'
// import { useRouter } from 'vue-router'
// import { ref } from 'vue'

// const router = useRouter()
// const termStore = useTermsStore()
</script>

<template>
  <ContentPane header="Term Management">
    <TermTableHeader />

    <div class="flex grow bg-white rounded-md shadow-xl p-8 w-grow mb-4">
      <div class="flex grow items-center grid-cols-2 gap-4 mb-4">
        <!-- select start date and end date -->
        <div class="flex items-center">
          <FloatLabel>
            <label for="date1" class="mr-3 u-txt-active">Start Date</label>
            <Calendar class="grow h-11.5" v-model="date1" dateFormat="yy/mm/dd" />
          </FloatLabel>
        </div>
        <div class="flex items-center">
          <FloatLabel>
            <label for="date2" class="mr-3 u-txt-active">End Date</label>
            <Calendar class="grow h-11.5" v-model="date2" dateFormat="yy/mm/dd" />
          </FloatLabel>
        </div>

        <!-- automate academic year based from start date and end date -->
        <div class="flex items-center">
          <FloatLabel>
            <label for="value1" class="mr-3 u-txt-active">Academic Year</label>
            <InputNumber class="grow h-11.5" v-model="value1" inputId="integeronly" />
          </FloatLabel>
        </div>

        <!-- enter batch number -->
        <div class="flex items-center">
          <FloatLabel>
            <label for="value2" class="mr-3 u-txt-active">Batch No.</label>
            <InputNumber class="grow h-11.5" v-model="value2" inputId="integeronly" />
          </FloatLabel>
        </div>

        <div class="flex items-center flex-column gap-2">
          <Button class="u-bg-green" label="Create" icon="fa-solid fa-plus" />
        </div>
      </div>
    </div>

    <TermTable />
  </ContentPane>
</template>
