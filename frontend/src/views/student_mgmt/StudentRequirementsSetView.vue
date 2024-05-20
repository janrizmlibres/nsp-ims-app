<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import { useUtilitiesStore } from '@/stores/utilities'
import { useStudentsStore } from '@/stores/students'
import { ref, watch, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'

const requirementsStore = useUtilitiesStore();
const studentsStore = useStudentsStore();

// Fetch the requirements and students when the component is mounted
onMounted(async () => {
    await requirementsStore.getRequirements();
    await studentsStore.getStudents();
});

</script>

<template>
    <ContentPane header="Student Requirements">
        <DataTable :value="studentsStore.students">
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
            <Column header="Actions">
                <template #body="slotProps">
                    <Button label="Edit" icon="pi pi-pencil" />
                </template>
            </Column>
        </DataTable>
    </ContentPane>
</template>
