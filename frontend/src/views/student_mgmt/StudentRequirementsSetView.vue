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
import Button from 'primevue/button'

const requirementsStore = useUtilitiesStore()
const studentsStore = useStudentsStore()

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

function updateGlobalFilter(newValue) {
    filters.value.global.value = newValue
}

const originalData = ref({})
const editedStudents = ref({})
const noChanges = ref(true)

onMounted(async () => {
    await requirementsStore.getRequirements()
    await studentsStore.getStudents()
    originalData.value = JSON.parse(JSON.stringify(studentsStore.students))
    console.log(studentsStore.students)
    console.log(requirementsStore.requirements)
})

const getRequirementMet = (student, requirementId) => {
    const requirementInfo = student.requirement_infos?.find(info => info.studentRequirementId === requirementId);
    return requirementInfo ? requirementInfo.met : null;
}

const setRequirementMet = (student, requirementId, value) => {
    const requirementInfo = student.requirement_infos?.find(info => info.studentRequirementId === requirementId)
    if (requirementInfo) {
        requirementInfo.met = value
        editedStudents.value[student.id] = student
        noChanges.value = false
    }
}  

const updateRequirements = async () => {
    for (const studentId in editedStudents.value) {
        const student = editedStudents.value[studentId]
        await studentsStore.updateStudentRequirements(student.id, { requirement_infos: student.requirement_infos })
    }
    editedStudents.value = {}
    noChanges.value = true
    originalData.value = JSON.parse(JSON.stringify(studentsStore.students))
}

const resetData = () => {
    studentsStore.students = JSON.parse(JSON.stringify(originalData.value)) // Deep copy
    editedStudents.value = {}
    noChanges.value = true
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
                        :modelValue="getRequirementMet(slotProps.data, requirement.id)"
                        @update:modelValue="val => setRequirementMet(slotProps.data, requirement.id, val)"
                        :binary="true"
                    />
                </template>
            </Column>
        </DataTable>

        <div class="flex gap-2 mt-4 justify-end">
            <Button :disabled="noChanges" @click="updateRequirements">
                <font-awesome-icon
                icon="fa-solid fa-circle-check"
                class="absolute top-2/4 -mt-2 left-3"
                />
                <h2 class="pl-5 font-bold">Save</h2>
            </Button>

            <Button
                severity="danger"
                label="Reset"
                icon="fa-solid fa-circle-xmark"
                :disabled="noChanges"
                @click="resetData"
            />
        </div>
    </ContentPane>
</template>