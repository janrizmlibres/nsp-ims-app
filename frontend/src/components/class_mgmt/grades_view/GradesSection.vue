<script setup>
// Presets
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import ProgressSpinner from 'primevue/progressspinner';
import { ref, watch } from 'vue';

// // Custom
import GradesTable from '@/components/class_mgmt/grades_view/GradesTable.vue';

// stores
import { useStrandStore } from '@/stores/strand';

const strandStore = useStrandStore()

const active = ref([])
const inactive = ref([])
const drop = ref([])
const isFetching = ref(true)

function fetchUpdate(data) {
    isFetching.value = true

    try {
        for (const grade of data) {
            const enrollment = grade.learner.enrollments[0]

            if (enrollment.status == 'Active') active.value.push(grade)
            else if (enrollment.status == 'Inactive') inactive.value.push(grade)
            else drop.value.push(grade)
        }
    } catch(error) {
        console.log(error)
    }
    
    isFetching.value = false
}

watch(() => strandStore.grades, fetchUpdate, {immediate: false})
</script>

<template>
    <TabView class="p-2 bg-white shadow-xl rounded-md">
        <TabPanel header="Active">
            <ProgressSpinner v-if="isFetching" class="flex justify-center" />
            <GradesTable v-else :dropTable="false" v-model="active" />
        </TabPanel>
        <TabPanel header="Inactive">
            <ProgressSpinner v-if="isFetching" class="flex justify-center" />
            <GradesTable v-else :dropTable="false" v-model="inactive" />
        </TabPanel>
        <TabPanel header="Dropped">
            <ProgressSpinner v-if="isFetching" class="flex justify-center" />
            <GradesTable v-else :dropTable="true" v-model="drop" />
        </TabPanel>
    </TabView>
</template>

<style>
</style>