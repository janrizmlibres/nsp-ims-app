<script setup>
// Presets
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Dropdown from 'primevue/dropdown';
import Toolbar from 'primevue/toolbar';
import InputText from 'primevue/inputtext';
import { inject, provide, ref, watch } from 'vue';

// // Custom
import GradesTable from '@/components/class_mgmt/manage_grade_view/GradesTable.vue';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';

const classLearningStrandStore = useClassLearningStrandStore()

const learningStrands = inject('learningStrands')
const filters = inject('filters')
const active = ref([])
const inactive = ref([])
const drop = ref([])
const learningStrandInput = ref()

const isFetching = ref(false)

provide('isFetching', isFetching)
provide('updateGradesData', updateGradesData)
provide('learningStrandInput', learningStrandInput)

function updateGradesData() {
    try {
        isFetching.value = true
        active.value.length = 0
        inactive.value.length = 0
        drop.value.length = 0

        const actTemp = []
        const inactTemp = []
        const dropTemp = []

        classLearningStrandStore.getAllGrades(learningStrandInput.value.id).then((data) => {  
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
        })
    } catch (error) {
        console.log(error);
    }
}

watch(() => learningStrands.value, () => {
    learningStrandInput.value = null
    active.value = []
    inactive.value = []
    drop.value = []
})
</script>

<template>
    <div class="relative flex flex-col h-full">
        <Toolbar class="!rounded-none !border-x-0">
            <template #end>
                <div class="flex flex-row gap-4 items-center mr-4">
                    <label class="font-semibold">Learning Strand:</label>
                    <Dropdown v-model="learningStrandInput" :options="learningStrands" optionLabel="learning_strand.name" placeholder="Select a Learning Strand" style="width: 20rem;" @update:modelValue="updateGradesData"/> 
                </div>
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