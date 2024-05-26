<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import RequirementHeader from '@/components/student_mgmt/requirement_view/RequirementHeader.vue'
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

const editingRows = ref([])

const isRowEditing = (row) => editingRows.value.includes(row);

const onRowEditSave = async (event) => {
    try {
        await studentsStore.updateStudent(event.data);
    } catch (error) {
        console.log(error);
    }
};

</script>

<template>
    <ContentPane header="Student Requirements">
        <RequirementHeader :globalFilter="filters.global.value" @filterChanged="updateGlobalFilter" />
        <DataTable 
            :value="studentsStore.students"
            v-model:filters="filters"
            :globalFilterFields="['firstName', 'lastName']"
            class="mb-0 pb-0"
            v-model:editingRows="editingRows" 
            editMode="row"
            @row-edit-save="onRowEditSave" 
            :ptOptions="{mergeProps:true}"
        >
            <Column :rowEditor="true" bodyStyle="text-align:center" class="sticky right-0" style="width: 5rem;" />
            <Column field="lrn" header="LRN" sortable></Column>
            <Column field="lastName" header="Last Name" sortable></Column>
            <Column field="firstName" header="First Name" sortable></Column>
            <Column field="middleName" header="Middle Name" sortable></Column>
            <Column field="suffixName" header="Suffix Name" sortable></Column>
            <Column v-for="requirement in requirementsStore.requirements" :key="requirement.id"
                :header="requirement.requirement_name">
                <template #body="slotProps">
                    <Checkbox v-model="slotProps.data[requirement.id]" :disabled="!isRowEditing(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
    </ContentPane>
</template>
