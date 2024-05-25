<script setup>
// Presets
import { onMounted, provide, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import ProgressSpinner from 'primevue/progressspinner';
import Panel from 'primevue/panel';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

// Custom
import ContentPane from '@/components/UI/ContentPane.vue'
import TheHeader from '@/components/class_mgmt/TheHeader.vue';
import StudentsTable from '@/components/class_mgmt/manage_student_view/StudentsTable.vue';
import ModuleTable from '@/components/class_mgmt/manage_module_view/ModuleTable.vue';
import GradesTab from '@/components/class_mgmt/manage_grade_view/GradesTab.vue';
import SessionTable from '@/components/class_mgmt/manage_session_view/SessionTable.vue';
import SchedulesTable from '@/components/class_mgmt/manage_schedule_view/SchedulesTable.vue';

// stores
import { useUtilitiesStore } from '@/stores/utilities';

const utilitiesStore = useUtilitiesStore()

const toast = useToast()

const term = ref()
const classLevel = ref()
const learningStrands = ref()
const isLoading = ref(true)
const termStatus = ref()
const viewState = ref(null)

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
});

provide('termStatus', termStatus)
provide('term', term)
provide('classLevel', classLevel)
provide('learningStrands', learningStrands)
provide('filters', filters)
provide('updateViewState', updateViewState)

onMounted(async () => {
    try {
        await utilitiesStore.getTerms()
        isLoading.value = false
    } catch(error) {
        console.log(error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered. Please refresh this page.',
            life: 3000
        })
    }
})

function updateViewState(termInput, classLevelInput, goToInput) {
    if (termInput) {
        term.value = termInput
        termStatus.value = termInput.status
    }

    if (classLevelInput) { 
        classLevel.value = classLevelInput
        learningStrands.value = classLevelInput.class_learning_strands
    }

    if (goToInput != null) {
        viewState.value = goToInput
    }
    else viewState.value = null
}
</script>

<template>
    <ProgressSpinner v-if="isLoading" class="self-center" />
    <ContentPane v-else header="Class" subheader="Management">
        <TheHeader />
        <div v-if="viewState === null" class="h-full w-full bg-white shadow-xl rounded-b-md p-4 overflow-hidden">
            <Panel  class="shadow-md">
                <template #header>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-circle-info fa-xl"></i>
                        <span class="u-txt-active font-semibold text-xl content-center">Action Required</span>
                    </div>
                </template>
                <p class="m-0">
                    Please fill necessary information in order to continue. Thank you!
                </p>
            </Panel>
        </div>
        <div v-else-if="viewState === 0" class="h-full w-full bg-white shadow-xl rounded-b-md p-4 overflow-hidden">
            <StudentsTable  />
        </div>
        <div v-else-if="viewState === 1" class="h-full w-full bg-white shadow-xl rounded-b-md p-4 overflow-hidden">
            <ModuleTable/>
        </div>
        <div v-else-if="viewState === 2" class="h-full w-full bg-white shadow-xl rounded-b-md p-4 overflow-hidden">
            <GradesTab/>
        </div>
        <div v-else-if="viewState === 3" class="h-full w-full bg-white shadow-xl rounded-b-md p-4 overflow-hidden">
            <SessionTable />
        </div>
        <div v-else-if="viewState === 4" class="h-full w-full bg-white shadow-xl rounded-b-md p-4 overflow-hidden">
            <SchedulesTable />
        </div>
    </ContentPane>
</template>