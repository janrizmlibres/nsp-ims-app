<script setup>
// Presets
import Divider from 'primevue/divider';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// Custom Components
import RosterTabHeader from './RosterTabHeader.vue';
import RosterTable from './RosterTable.vue';

// stores
import { useClassStore } from '@/stores/class';

const route = useRoute()

const classStore = useClassStore()

const isFetching = ref(true)
const allStudents = ref([])
onMounted(async () => {
    const students = await classStore.getAllModules({classId: route.query.id})
    allStudents.value.push(... students)

    isFetching.value = false
})
</script>

<template>
    <div>
        <div class="bg-transparent border-none flex flex-row justify-between items-center px-4">
            <div class="u-txt-active font-semibold text-3xl content-center">Class Roster</div>
            <RosterTabHeader />
        </div>
        <Divider class="before:border-t before:border-surface-400"/>

        <TabView class="p-2 bg-white shadow-xl rounded-md">
            <TabPanel header="Active">
                <RosterTable  />
            </TabPanel>
            <TabPanel header="Inactive">
                <RosterTable />
            </TabPanel>
            <TabPanel header="Dropped">
                <RosterTable />
            </TabPanel>
        </TabView>
    </div>
</template>

<style>
</style>