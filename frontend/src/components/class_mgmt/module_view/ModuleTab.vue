<script setup>
// Presets
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
import Toolbar from 'primevue/toolbar';
import { inject, provide, ref } from 'vue';

// // Custom
import ModuleSubmissionTable from './ModuleSubmissionTable.vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

const active = inject('active')
const inactive = inject('inactive')
const drop = inject('drop')
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
});

provide('filters', filters)
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
                <ModuleSubmissionTable v-model="active" :disableEdit="false" />
            </TabPanel>
            <TabPanel header="Inactive">
                <ModuleSubmissionTable v-model="inactive" :disableEdit="false" />
            </TabPanel>
            <TabPanel header="Drop">
                <ModuleSubmissionTable v-model="drop" :disableEdit="true" />
            </TabPanel>
        </TabView>
    </div>
</template>

<style>
</style>