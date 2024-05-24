<script setup>
// Presets
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import ProgressSpinner from 'primevue/progressspinner';
import InputText from 'primevue/inputtext';
import Toolbar from 'primevue/toolbar';
import { inject, provide, ref, watch } from 'vue';

// // Custom
import AttendanceTable from '../session_view/AttendanceTable.vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';


const attendances = inject('attendances')
const regular = ref([])
const hybrid = ref([])
const drop = ref([])
const isFetching = ref(true)

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
});

provide('filters', filters)

watch(() => attendances.value, (data) => {
    isFetching.value = true
    
    regular.value = data.regular
    hybrid.value = data.hybrid
    drop.value = data.drop
    
    isFetching.value = false
})
</script>

<template>
    <div class="flex flex-col h-full overflow-hidden shadow-xl">
        <Toolbar class="!p-2">
            <template #start>
                <div class="flex flex-row gap-4 items-center px-4">
                    <i class="fa fa-calendar-days fa-lg u-txt-active"></i>
                    <span class="font-semibold text-xl u-txt-active">Attendances</span>
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
            <TabPanel header="Regular">
                <ProgressSpinner v-if="isFetching" class="flex justify-center" />
                <AttendanceTable v-else v-model="regular" :disableEdit="false" />
            </TabPanel>
            <TabPanel header="Hybrid">
                <ProgressSpinner v-if="isFetching" class="flex justify-center" />
                <AttendanceTable v-else v-model="hybrid" :disableEdit="false" />
            </TabPanel>
            <TabPanel header="Drop">
                <ProgressSpinner v-if="isFetching" class="flex justify-center" />
                <AttendanceTable v-else v-model="drop" :disableEdit="true"  />
            </TabPanel>
        </TabView>
    </div>
</template>

<style>
</style>