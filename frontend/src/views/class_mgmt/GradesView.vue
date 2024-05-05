<script setup>
// Presets
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// // Custom
import ContentPane from '@/components/UI/ContentPane.vue';
import GradesTable from '@/components/class_mgmt/grades_view/GradesTable.vue';

// stores
import { useStrandStore } from '@/stores/strand';

const strandStore = useStrandStore()
const route = useRoute()

const name = ref()

async function fetchGrades(query) {
    try {
        await strandStore.getStrand(query.id)
        await strandStore.getAllGrades(query.id)

        name.value = strandStore.strand.learning_strand.name
    } catch (error) {
        console.log(error)
    }
}

watch(() => route.query, fetchGrades, {immediate: true})
</script>

<template>
    <ContentPane header="View Grades" :subheader="name">
        <TabView class="p-2 bg-white shadow-xl rounded-md">
            <TabPanel header="Active">
                <GradesTable :dropTable="false" group="active" />
            </TabPanel>
            <TabPanel header="Inactive">
                <GradesTable :dropTable="false" group="inactive" />
            </TabPanel>
            <TabPanel header="Dropped">
                <GradesTable :dropTable="true" group="drop" />
            </TabPanel>
        </TabView>
    </ContentPane>
</template>

<style>
</style>