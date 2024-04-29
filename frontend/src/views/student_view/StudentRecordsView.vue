<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import StudentSearchbar from '@/components/student_view/StudentSearchbar.vue'
import StudentRecordsTable from '../../components/student_view/StudentRecordsTable.vue'
import StudentFooter from '@/components/student_view/StudentFooter.vue'

import { FilterMatchMode } from 'primevue/api'
import { ref } from 'vue'

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

function updateGlobalFilter(newValue) {
    filters.value.global.value = newValue
}
</script>

<template>
    <ContentPane header="Student Records">
        <StudentSearchbar />
        <StudentRecordsTable />
        <StudentFooter />
    </ContentPane>
</template>