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

function fetchStudents(data) {
    isFetching.value = true
    
    try {
        active.value = data.active.enrollments
        inactive.value = data.inactive.enrollments
        drop.value = data.drop != null ? data.drop.enrollments : null

    } catch(error) {
        console.log(error)
    }
    
    isFetching.value = false
}

watch(() => classStore.students, fetchStudents, {immediate: false})
</script>

<template>
    <div>
        <div class="bg-transparent border-none flex flex-row justify-between items-center">
            <div class="flex flex-row gap-4 items-center px-4">
                <i class="fa fa-address-book fa-2xl u-txt-active"></i>
                <span class="font-semibold text-3xl u-txt-active">Class Roster</span>
            </div>
            <RosterTabHeader :filters="filters" />
        </div>
        <Divider class="before:border-t before:border-surface-400"/>

        <ProgressSpinner v-if="isFetching" class="flex justify-center" />
        <TabView v-else class="p-2 bg-white shadow-xl rounded-md u-border-bottom u-txt-active"
            :pt="{
                tabpanel: {
                    headerTitle: {class:'u-txt-active'}
                }
            }"
            :ptOptions="{mergeProps:true}">
            <TabPanel header="Active">
                <RosterTable v-model="active" :filters="filters" />
            </TabPanel>
            <TabPanel header="Inactive">
                <RosterTable v-model="inactive" :filters="filters" />
            </TabPanel>
            <TabPanel header="Dropped">
                <RosterTable v-model="drop" :filters="filters" />
            </TabPanel>
        </TabView>
    </div>
</template>

<style>
</style>