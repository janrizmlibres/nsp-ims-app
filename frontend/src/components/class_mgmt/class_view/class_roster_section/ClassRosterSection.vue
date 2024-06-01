<script setup>
// Presets
import Divider from 'primevue/divider';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
import { FilterMatchMode } from 'primevue/api';
import { computed, provide, ref } from 'vue';

// Custom Components
import StudentsTable from './StudentsTable.vue';

const props = defineProps(['modelValue'])

const active = computed(() => props.modelValue.active)
const inactive = computed(() => props.modelValue.inactive)
const drop = computed(() => props.modelValue.drop)

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

provide('filters', filters)
</script>

<template>
    <div class="h-full">
        <div class="bg-transparent border-none flex flex-row justify-between items-center">
            <div class="flex flex-row gap-4 items-center px-4">
                <i class="fa fa-address-book fa-2xl u-txt-active"></i>
                <span class="font-semibold text-3xl u-txt-active">Class Roster</span>
            </div>
            <div>
                <span class="relative mr-2">
                    <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                    <InputText v-model="filters['global'].value" placeholder="Search" class="pl-10 font-normal"/>
                </span>
            </div>
        </div>
        <Divider class="before:border-t before:border-surface-400"/>

        <TabView class="p-2 bg-white shadow-xl rounded-2xl u-border-bottom u-txt-active"
            :pt="{
                tabpanel: {
                    headerTitle: {class:'u-txt-active'}
                }
            }"
            :ptOptions="{mergeProps:true}">
            <TabPanel header="Active">
                <StudentsTable v-model="active" />
            </TabPanel>
            <TabPanel header="Inactive">
                <StudentsTable v-model="inactive" />
            </TabPanel>
            <TabPanel header="Dropped">
                <StudentsTable v-model="drop" />
            </TabPanel>
        </TabView>
    </div>
</template>

<style>
</style>