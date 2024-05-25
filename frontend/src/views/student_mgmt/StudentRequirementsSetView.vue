<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import StudentHeader from '@/components/student_mgmt/StudentHeader.vue'
import { useUtilitiesStore } from '@/stores/utilities'
import { useStudentsStore } from '@/stores/students'
import { ref, watch, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import { FilterMatchMode } from 'primevue/api'

const requirementsStore = useUtilitiesStore();
const studentsStore = useStudentsStore();

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

function updateGlobalFilter(newValue) {
  filters.value.global.value = newValue
}

// Fetch the requirements and students when the component is mounted
onMounted(async () => {
    await requirementsStore.getRequirements();
    await studentsStore.getStudents();
});

</script>

<template>
    <ContentPane header="Student Requirements">
        <StudentHeader :globalFilter="filters.global.value" @filterChanged="updateGlobalFilter" />
        <DataTable 
            :value="studentsStore.students"
            v-model:filters="filters"
            :globalFilterFields="['firstName', 'lastName']"
        >
            <Column field="lrn" header="LRN" sortable></Column>
            <Column field="lastName" header="Last Name" sortable></Column>
            <Column field="firstName" header="First Name" sortable></Column>
            <Column field="middleName" header="Middle Name" sortable></Column>
            <Column field="suffixName" header="Suffix Name" sortable></Column>
            <Column v-for="requirement in requirementsStore.requirements" :key="requirement.id"
                :header="requirement.requirement_name">
                <template #body="slotProps">
                    <Checkbox />
                </template>
            </Column>
        </DataTable>
    </ContentPane>
</template>
