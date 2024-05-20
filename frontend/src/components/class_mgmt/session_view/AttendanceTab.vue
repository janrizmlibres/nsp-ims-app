<script setup>
// Presets
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import ProgressSpinner from 'primevue/progressspinner';
import InputText from 'primevue/inputtext';
import Divider from 'primevue/divider';
import { ref, watch } from 'vue';

// // Custom
import AttendanceTable from '../session_view/AttendanceTable.vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';


const props = defineProps(['modelValue'])
const emit = defineEmits(['onUpdate'])

const regular = ref([])
const hybrid = ref([])
const isFetching = ref(true)
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
});

function updateAttendanceData(data) {
    emit('onUpdate', data)
}

watch(() => props.modelValue, (data) => {
    isFetching.value = true
    
    regular.value.length = 0
    hybrid.value.length = 0
    
    regular.value = data.regular
    hybrid.value = data.hybrid
    
    isFetching.value = false
}, {immediate: false})

</script>

<template>
    <div class="flex flex-col h-full overflow-hidden bg-white shadow-xl rounded-md px-5 pt-5">
        <div class="flex flex-row justify-between">
            <div class="flex flex-row gap-4 items-center px-4">
                <i class="fa fa-calendar-days fa-2xl u-txt-active"></i>
                <span class="font-semibold text-3xl u-txt-active">Attendances</span>
            </div>
            <span class="relative">
                <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                <InputText v-model="filters['global'].value" placeholder="Keyword Search"  class="pl-10 font-normal" showClear />
            </span>
        </div>
        <Divider />
        <TabView>
            <TabPanel header="Regular">
                <ProgressSpinner v-if="isFetching" class="flex justify-center" />
                <AttendanceTable v-else v-model="regular" :isNotActive="!termStatus" :filters="filters" @onUpdate="updateAttendanceData" />
            </TabPanel>
            <TabPanel header="Hybrid">
                <ProgressSpinner v-if="isFetching" class="flex justify-center" />
                <AttendanceTable v-else v-model="hybrid" :isNotActive="!termStatus" :filters="filters" @onUpdate="updateAttendanceData" />
            </TabPanel>
            <TabPanel header="Drop">
                <ProgressSpinner v-if="isFetching" class="flex justify-center" />
                <AttendanceTable v-else v-model="drop" :isNotActive="true" :filters="filters" @onUpdate="updateAttendanceData" />
            </TabPanel>
        </TabView>
    </div>
</template>

<style>
</style>