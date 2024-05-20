<script setup>
// Presets
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import ProgressSpinner from 'primevue/progressspinner';
import { ref, watch } from 'vue';

// // Custom
import AttendanceTable from '../session_view/AttendanceTable.vue';


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
    <TabView class="p-2 bg-white shadow-xl rounded-md max-h-[51rem]">
        <TabPanel header="Regular">
            <ProgressSpinner v-if="isFetching" class="flex justify-center" />
            <AttendanceTable v-else v-model="regular" @onUpdate="updateAttendanceData" />
        </TabPanel>
        <TabPanel header="Hybrid">
            <ProgressSpinner v-if="isFetching" class="flex justify-center" />
            <AttendanceTable v-else v-model="hybrid" @onUpdate="updateAttendanceData" />
        </TabPanel>
    </TabView>
</template>

<style>
</style>