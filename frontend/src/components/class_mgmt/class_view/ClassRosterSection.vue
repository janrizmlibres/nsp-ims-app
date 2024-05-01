<script setup>
// Presets
import Divider from 'primevue/divider';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import { FilterMatchMode } from 'primevue/api';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// Custom Components
import RosterTabHeader from './RosterTabHeader.vue';
import RosterTable from './RosterTable.vue';

// stores
import { useClassStore } from '@/stores/class';

const route = useRoute()

const classStore = useClassStore()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const isFetching = ref(true)
const active = ref()
const inactive = ref()
const drop = ref()
async function fetchStudents(id) {
    const students = await classStore.getAllStudents({classId: id})

    active.value = students[0]
    inactive.value = students[1]
    drop.value = students[2]

    isFetching.value = false
}

watch(() => route.query.id, fetchStudents, {immediate: true})
</script>

<template>
    <div>
        <div class="bg-transparent border-none flex flex-row justify-between items-center px-4">
            <div class="u-txt-active font-semibold text-3xl content-center">Class Roster</div>
            <RosterTabHeader :filters="filters" />
        </div>
        <Divider class="before:border-t before:border-surface-400"/>

        <TabView class="p-2 bg-white shadow-xl rounded-md">
            <TabPanel header="Active">
                <RosterTable :data="active" :filters="filters" />
            </TabPanel>
            <TabPanel header="Inactive">
                <RosterTable :data="inactive" :filters="filters" />
            </TabPanel>
            <TabPanel header="Dropped">
                <RosterTable :data="drop" :filters="filters" />
            </TabPanel>
        </TabView>
    </div>
</template>

<style>
</style>