<script setup>
// Presets
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import ProgressSpinner from 'primevue/progressspinner';
import InputText from 'primevue/inputtext';
import Toolbar from 'primevue/toolbar';
import { computed, ref, watch } from 'vue';

// // Custom
import ModuleSubmissionTable from './ModuleSubmissionTable.vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useRoute } from 'vue-router';


const props = defineProps(['modelValue'])
const emit = defineEmits(['onUpdate'])
const route = useRoute()

const termStatus = computed(() => route.query.status)
const active = ref([])
const inactive = ref([])
const drop = ref([])
const isFetching = ref(true)
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
});

function updateModuleData(data) {
    emit('onUpdate', data)
}

watch(() => props.modelValue, (data) => {
    isFetching.value = true
    
    active.value.length = 0
    inactive.value.length = 0
    drop.value.length = 0
    
    const actTemp = []
    const inactTemp = []
    const dropTemp = []

    for (const moduleSubmission of data.module_submissions) {
        const enrollment = moduleSubmission.enrollment

        if (enrollment.status == 'Active') actTemp.push(moduleSubmission)
        else if (enrollment.status == 'Inactive') inactTemp.push(moduleSubmission)
        else dropTemp.push(moduleSubmission)
    }

    active.value = actTemp
    inactive.value = inactTemp
    drop.value = dropTemp

    isFetching.value = false
}, {immediate: false})

</script>

<template>
    <div class="flex flex-col h-full overflow-hidden shadow-xl">
        <Toolbar class="!p-2">
            <template #start>
                <div class="flex flex-row gap-4 items-center px-4">
                    <i class="fa fa-note-sticky fa-lg u-txt-active"></i>
                    <span class="font-semibold text-xl u-txt-active">Module Submissions</span>
                </div>
            </template>
            <template #end>
                <span class="relative">
                    <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search"  class="pl-10 font-normal"/>
                </span>
            </template>
        </Toolbar>
        <TabView>
            <TabPanel header="Active">
                <ProgressSpinner v-if="isFetching" class="flex justify-center" />
                <ModuleSubmissionTable v-else v-model="active" :isNotActive="!termStatus" :filters="filters" @onUpdate="updateModuleData" />
            </TabPanel>
            <TabPanel header="Inactive">
                <ProgressSpinner v-if="isFetching" class="flex justify-center" />
                <ModuleSubmissionTable v-else v-model="inactive" :isNotActive="!termStatus" :filters="filters" @onUpdate="updateModuleData" />
            </TabPanel>
            <TabPanel header="Drop">
                <ProgressSpinner v-if="isFetching" class="flex justify-center" />
                <ModuleSubmissionTable v-else v-model="drop" :isNotActive="true" :filters="filters" @onUpdate="updateModuleData" />
            </TabPanel>
        </TabView>
    </div>
</template>

<style>
</style>