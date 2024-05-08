<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import InputText from 'primevue/inputtext';
import ClassesTable from '@/components/class_mgmt/classes_view/ClassesTable.vue'; 

import { FilterMatchMode } from 'primevue/api';
import { ref } from 'vue';

const filters = ref(
    {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        batch_number: { value: null, matchMode: FilterMatchMode.CONTAINS },
        academic_year: { value: null, matchMode: FilterMatchMode.CONTAINS },
        start_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
        end_date: { value: null, matchMode: FilterMatchMode.CONTAINS }
    }
)

const globalFilters = ref(['batch_number', 'academic_year', 'start_date', 'end_date'])
</script>

<template>
    <ContentPane header="Class Records">
        <div class="bg-transparent border-none flex justify-between py-2">
            <div class="pt-4 text-surface-600">Select a class in an academic year</div>
            <div>
                <span class="relative mr-2">
                    <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                    <InputText v-model="filters['global'].value" placeholder="Search"  size="small" class="pl-10 font-normal"/>
                </span>
            </div>
        </div>
        
        <div class="bg-white shadow-xl rounded-md p-5">
            <ClassesTable :filters="filters" :globalFilters="globalFilters" />
        </div>
    </ContentPane>
</template>