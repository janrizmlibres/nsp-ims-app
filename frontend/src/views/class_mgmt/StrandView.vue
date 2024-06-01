<script setup>
// Presets
import { provide, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Divider from 'primevue/divider';
import { useToast } from 'primevue/usetoast';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

// Custom
import ContentPane from '@/components/UI/ContentPane.vue';
import StrandInfoSection from '@/components/class_mgmt/class_learning_strand_view/StrandInfoSection.vue';
import ModuleTable from '@/components/class_mgmt/class_learning_strand_view/module_tab/ModuleTable.vue';
import SessionTable from '@/components/class_mgmt/class_learning_strand_view/session_tab/SessionTable.vue';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import { useClassStore } from '@/stores/class';
import GradesTab from '@/components/class_mgmt/class_learning_strand_view/grades_tab/GradesTab.vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

const classLearningStrandStore = useClassLearningStrandStore()
const classStore = useClassStore()
const route = useRoute()
const toast = useToast()

const classLevel = ref()
const term = ref()
const learningStrand = ref()
const name = ref()
const classSchedules = ref()

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
});

provide('term', term)
provide('classLevel', classLevel)
provide('learningStrand', learningStrand)
provide('filters', filters)

watch(() => route.query, (query) => {
    try {
        classStore.getClass(query.id).then((data) => {
            classLevel.value = data
            term.value = data.term
        });
        classLearningStrandStore.getClassLearningStrand(query.strand).then((data) => {
            learningStrand.value = data
            classSchedules.value = data.class_schedules
            name.value = data.name
        })
    } catch(error) {
        console.log(error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: "Unexpected error encountered!",
            life: 3000
        })
    }
}, {immediate: true})
</script>

<template>
    <ContentPane :breadcrumb="[{label: `S.Y ${term ? term.academic_year : ''}`}, {label: classLevel ? classLevel.school_level : ''}, {label: name ? name : ''}]">
        <div class="h-full overflow-y-auto">
            <StrandInfoSection v-model="classSchedules" />
            <Divider class="before:border-t before:border-surface-400 my-10"/>
            <TabView class="relative h-full p-2 bg-white shadow-xl rounded-2xl u-border-bottom u-txt-active">
                <TabPanel>
                    <template #header>
                        <div class="flex items-center gap-2">
                            <i class="fa fa-note-sticky" />
                            <span class="font-bold whitespace-nowrap">Modules</span>
                        </div>
                    </template>
                    <ModuleTable />
                </TabPanel>
                <TabPanel>
                    <template #header>
                        <div class="flex items-center gap-2">
                            <i class="fa fa-star" />
                            <span class="font-bold whitespace-nowrap">Grades</span>
                        </div>
                    </template>
                    <GradesTab />
                </TabPanel>
                <TabPanel>
                    <template #header>
                        <div class="flex items-center gap-2">
                            <i class="fa fa-calendar-days" />
                            <span class="font-bold whitespace-nowrap">Sessions</span>
                        </div>
                    </template>
                    <SessionTable />
                </TabPanel>
            </TabView>
        </div>
    </ContentPane>
</template>

<style>
</style>