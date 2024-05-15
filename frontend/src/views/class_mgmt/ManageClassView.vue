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
        <TabView class="p-2 bg-white shadow-xl rounded-md max-h-[51rem]">
            <TabPanel header="Modules">
                <ManageModuleView />
            </TabPanel>
            <TabPanel header="Grades">
                <ManageGradeView />
            </TabPanel>
            <TabPanel header="Sessions">
                <ManageSessionView />
            </TabPanel>
            <TabPanel header="Schedules">
                <ManageScheduleView />
            </TabPanel>
        </TabView>
    </ContentPane>
</template>