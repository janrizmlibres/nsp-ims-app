<script setup>
import { ref, onMounted, computed } from 'vue'
import ContentPane from '@/components/UI/ContentPane.vue'
import RequirementHeader from '@/components/student_mgmt/requirement_view/RequirementHeader.vue'
import { useUtilitiesStore } from '@/stores/utilities'
import { useStudentsStore } from '@/stores/students'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { FilterMatchMode } from 'primevue/api'
import Checkbox from 'primevue/checkbox'

const requirementsStore = useUtilitiesStore()
const studentsStore = useStudentsStore()

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

function updateGlobalFilter(newValue) {
    filters.value.global.value = newValue
}

onMounted(async () => {
    await requirementsStore.getRequirements()
    await studentsStore.getStudents()
    console.log(studentsStore.students)
})

const getRequirementMet = (student, requirementName) => {
    const requirementInfo = student.requirements_info?.find(info => info.name === requirementName)
    return requirementInfo ? requirementInfo.met : null
}

const setRequirementMet = (student, requirementName, value) => {
    const requirementInfo = student.requirements_info?.find(info => info.name === requirementName)
    if (requirementInfo) {
        requirementInfo.met = value
    }
}

</script>

<template>
    <ContentPane header="Student Requirements">
        <RequirementHeader :globalFilter="filters.global.value" @filterChanged="updateGlobalFilter" />
        <DataTable 
            :value="studentsStore.students"
            v-model:filters="filters"
            :globalFilterFields="['firstName', 'lastName']"
            class="mb-0 pb-0"
            :ptOptions="{mergeProps:true}"
        >
            <Column field="lrn" header="LRN" sortable></Column>
            <Column field="lastName" header="Last Name" sortable></Column>
            <Column field="firstName" header="First Name" sortable></Column>
            <Column field="middleName" header="Middle Name" sortable></Column>
            <Column field="suffixName" header="Suffix Name" sortable></Column>
            <Column v-for="requirement in requirementsStore.requirements" :key="requirement.id"
                :header="requirement.requirement_name">
                <template #body="slotProps">
                    <Checkbox 
                        :modelValue="getRequirementMet(slotProps.data, requirement.requirement_name)"
                    />
                </template>
            </Column>
        </DataTable>
    </ContentPane>
</template>