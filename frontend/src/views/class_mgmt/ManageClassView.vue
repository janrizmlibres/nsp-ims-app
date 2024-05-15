<script setup>
// Presets
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import ProgressSpinner from 'primevue/progressspinner';

// Custom
import ContentPane from '@/components/UI/ContentPane.vue'
import ManageModuleView from './ManageModuleView.vue';
import ManageGradeView from './ManageGradeView.vue';
import ManageSessionView from './ManageSessionView.vue';
import ManageScheduleView from './ManageScheduleView.vue';

// stores
import { useUtilitiesStore } from '@/stores/utilities';
import TheHeader from '@/components/class_mgmt/TheHeader.vue';

const utilitiesStore = useUtilitiesStore()
const isLoading = ref(true)
const toast = useToast()
const learningStrands = ref()
const state = ref(false)
const termStatus = ref()

function updateState(classLevelInput, status) {
    termStatus.value = status
    if (classLevelInput) state.value = true
    else state.value = false
}

onMounted(async () => {
    try {
        await utilitiesStore.getTerms()
        isLoading.value = false
    } catch(error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered. Please refresh this page.',
            life: 3000
        })
    }
})
</script>

<template>
    <ProgressSpinner v-if="isLoading" class="self-center" />
    <ContentPane v-else header="Class" subheader="Management">
        <TheHeader @updateState="updateState" :state="state" />
        <TabView v-if="state" class="p-2 bg-white shadow-xl rounded-md">
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
                <ManageSessionView :learningStrands="learningStrands" :termStatus="termStatus" />
            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-clock" />
                        <span class="u-txt-active">Schedules</span>
                    </div>
                </template>
                <ManageScheduleView :learningStrands="learningStrands" :termStatus="termStatus" />
            </TabPanel>
        </TabView>
    </ContentPane>
</template>