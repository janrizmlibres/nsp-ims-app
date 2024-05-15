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

const utilitiesStore = useUtilitiesStore()
const isLoading = ref(true)
const toast = useToast()

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
        <TabView class="p-2 bg-white shadow-xl rounded-md">
            <TabPanel>
                <template #header>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-note-sticky" />
                        <span class="u-txt-active">Modules</span>
                    </div>
                </template>
                <ManageModuleView />
            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-star" />
                        <span class="u-txt-active">Grades</span>
                    </div>
                </template>
                <ManageGradeView />
            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-calendar-days" />
                        <span class="u-txt-active">Sessions</span>
                    </div>
                </template>
                <ManageSessionView />
            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex items-center gap-2">
                        <i class="fa fa-clock" />
                        <span class="u-txt-active">Schedules</span>
                    </div>
                </template>
                <ManageScheduleView />
            </TabPanel>
        </TabView>
    </ContentPane>
</template>