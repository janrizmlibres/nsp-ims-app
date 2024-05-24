<script setup>
// Presets
import { onMounted, provide, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
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
const viewState = ref(false)
const termStatus = ref()

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
});

provide('termStatus', termStatus)
provide('term', term)
provide('classLevel', classLevel)
provide('learningStrands', learningStrands)
provide('filters', filters)

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

function updateViewState(termInput, classLevelInput) {
    if (termInput) {
        term.value = termInput
        termStatus.value = termInput.status
    }

    if (classLevelInput) { 
        classLevel.value = classLevelInput
        learningStrands.value = classLevelInput.class_learning_strands
        viewState.value = true
    }
    else viewState.value = false
}
</script>

<template>
    <ProgressSpinner v-if="isLoading" class="self-center" />
    <ContentPane v-else header="Class" subheader="Management">
        <TheHeader @onSelect="updateViewState" />
        <TabView v-if="viewState" class="bg-white shadow-xl rounded-md">
            <TabPanel>
                <template #header>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-user" />
                        <span class="u-txt-active">Students</span>
                    </div>
                </template>
                <StudentsTable />
            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-note-sticky" />
                        <span class="u-txt-active">Modules</span>
                    </div>
                </template>
                <ModuleTable />
            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-star" />
                        <span class="u-txt-active">Grades</span>
                    </div>
                </template>
                <GradesTab />
            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-calendar-days" />
                        <span class="u-txt-active">Sessions</span>
                    </div>
                </template>
                <SessionTable />
            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-clock" />
                        <span class="u-txt-active">Schedules</span>
                    </div>
                </template>
                <SchedulesTable />
            </TabPanel>
        </TabView>
        <Panel v-if="!viewState" class="shadow-md mb-8">
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
    </ContentPane>
</template>