<script setup>
// Presets
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import ProgressSpinner from 'primevue/progressspinner';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { useConfirm } from 'primevue/useconfirm';

// Custom
import ContentPane from '@/components/UI/ContentPane.vue'
import ManageModuleView from './ManageModuleView.vue';
import ManageGradeView from './ManageGradeView.vue';
import ManageSessionView from './ManageSessionView.vue';
import ManageScheduleView from './ManageScheduleView.vue';
import TheHeader from '@/components/class_mgmt/TheHeader.vue';

// stores
import { useUtilitiesStore } from '@/stores/utilities';
import { useClassStore } from '@/stores/class';
import ManageStudentView from './ManageStudentView.vue';

const utilitiesStore = useUtilitiesStore()
const classStore = useClassStore()

const toast = useToast()
const router = useRouter()
const confirm = useConfirm()

const isLoading = ref(true)
const learningStrands = ref()
const term = ref()
const classLevel = ref()
const state = ref(false)
const termStatus = ref()

function updateState(termInput, classLevelInput) {
    if (termInput) {
        term.value = termInput
        termStatus.value = termInput.status
    }

    if (classLevelInput) { 
        classLevel.value = classLevelInput
        learningStrands.value = classLevelInput.class_learning_strands
        state.value = true
    }
    else state.value = false
}

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


onBeforeRouteLeave((to) => {
    if (classStore.leave) {
        return true
    }

    confirm.require({
        message: 'Do you really want to leave? you have unsaved changes!',
        header: 'Redirect Confirmation',
        accept: async () => {
            classStore.leave = true
            await router.push(to)
        }
    })

    return false
})
</script>

<template>
    <ProgressSpinner v-if="isLoading" class="self-center" />
    <ContentPane v-else header="Class" subheader="Management">
        <TheHeader @updateState="updateState" :state="state" />
        <TabView v-if="state" class="bg-white shadow-xl rounded-md">
            <TabPanel>
                <template #header>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-user" />
                        <span class="u-txt-active">Students</span>
                    </div>
                </template>
                <ManageStudentView :classLevel="classLevel" />
            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-note-sticky" />
                        <span class="u-txt-active">Modules</span>
                    </div>
                </template>
                <ManageModuleView :learningStrands="learningStrands" :termStatus="termStatus" />
            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-star" />
                        <span class="u-txt-active">Grades</span>
                    </div>
                </template>
                <ManageGradeView :learningStrands="learningStrands" :termStatus="termStatus" />
            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-calendar-days" />
                        <span class="u-txt-active">Sessions</span>
                    </div>
                </template>
                <ManageSessionView :term="term" :learningStrands="learningStrands" :termStatus="termStatus" />
            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-clock" />
                        <span class="u-txt-active">Schedules</span>
                    </div>
                </template>
                <ManageScheduleView :classLevel="classLevel" :termStatus="termStatus" />
            </TabPanel>
        </TabView>
    </ContentPane>
</template>