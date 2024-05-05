<script setup>
// Presets
import Divider from 'primevue/divider';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import ProgressSpinner from 'primevue/progressspinner';
import { FilterMatchMode } from 'primevue/api';
import { ref, watch } from 'vue';

// Custom Components
import RosterTabHeader from './RosterTabHeader.vue';
import RosterTable from './RosterTable.vue';

// stores
import { useClassStore } from '@/stores/class';

const classStore = useClassStore()

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const isFetching = ref(true)
const active = ref([])
const inactive = ref([])
const drop = ref([])

async function fetchStudents(data) {
    isFetching.value = true
    
    try {
        const students = data
        active.value = students.active.enrollments
        inactive.value = students.inactive.enrollments
        drop.value = students.drop != null ? students.drop.enrollments : null

    } catch(error) {
        console.log(error)
    }
    
    isFetching.value = false
}

watch(() => classStore.students, fetchStudents, {immediate: false})
</script>

<template>
    <div>
        <div class="bg-transparent border-none flex flex-row justify-between items-center px-4">
            <div class="u-txt-active font-semibold text-3xl content-center">Class Roster</div>
            <RosterTabHeader :filters="filters" />
        </div>
        <Divider class="before:border-t before:border-surface-400"/>

        <ProgressSpinner v-if="isFetching" class="flex justify-center" />
        <TabView v-else class="p-2 bg-white shadow-xl rounded-md">
            <TabPanel header="Active">
                <RosterTable :dropTable="false" v-model="active" :filters="filters" />
            </TabPanel>
            <TabPanel header="Inactive">
                <RosterTable :dropTable="false" v-model="inactive" :filters="filters" />
            </TabPanel>
            <TabPanel header="Dropped">
                <RosterTable :dropTable="true" v-model="drop" :filters="filters" />
            </TabPanel>
        </TabView>
    </div>
</template>

<style>
</style>