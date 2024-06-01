<script setup>
// Presets
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Toolbar from 'primevue/toolbar';
import InputText from 'primevue/inputtext';
import { inject, provide, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';

// // Custom
import GradesTable from '@/components/class_mgmt/class_learning_strand_view/grades_tab/GradesTable.vue';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';

const toast = useToast()

const classLearningStrandStore = useClassLearningStrandStore()

const filters = inject('filters')
const learningStrand = inject('learningStrand')

const active = ref([])
const inactive = ref([])
const drop = ref([])

const isFetching = ref(false)

provide('isFetching', isFetching)
provide('updateGradesData', updateGradesData)

function updateGradesData() {
    isFetching.value = true

    active.value.length = 0
    inactive.value.length = 0
    drop.value.length = 0

    const actTemp = []
    const inactTemp = []
    const dropTemp = []

    classLearningStrandStore.getAllGrades(learningStrand.value.id).then((data) => {  
        for (const grade of data) {
            const enrollment = grade.enrollment

            if (enrollment.status == 'Active') actTemp.push(grade)
            else if (enrollment.status == 'Inactive') inactTemp.push(grade)
            else dropTemp.push(grade)
        }

        active.value = actTemp
        inactive.value = inactTemp
        drop.value = dropTemp

        isFetching.value = false
    }).catch((error) => {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.response.data.message,
            life: 3000
        })

        isFetching.value = false
    })
}

watch(() => learningStrand.value, () => {
    updateGradesData()
})
</script>

<template>
    <div class="relative flex flex-col h-full">
        <Toolbar class="!p-2">
            <template #end>
                <span class="relative">
                    <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search"  class="pl-10 font-normal w-96" showClear />
                </span>
            </template>
        </Toolbar>
        <TabView>
            <TabPanel header="Active">
                <GradesTable v-model="active" :disableEdit="false" />
            </TabPanel>
            <TabPanel header="Inactive">
                <GradesTable v-model="inactive" :disableEdit="false" />
            </TabPanel>
            <TabPanel header="Dropped">
                <GradesTable v-model="drop" :disableEdit="true" />
            </TabPanel>
        </TabView>
    </div>
</template>

<style>
</style>