<script setup>
// Presets
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Dropdown from 'primevue/dropdown';
import Toolbar from 'primevue/toolbar';
import InputText from 'primevue/inputtext';
import { computed, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';

// // Custom
import GradesTable from '@/components/class_mgmt/manage_grade_view/GradesTable.vue';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import { FilterMatchMode } from 'primevue/api';

const classLearningStrandStore = useClassLearningStrandStore()

const props = defineProps(['learningStrands', 'termStatus'])
const toast = useToast()

const termStatus = computed(() => props.termStatus)
const classLearningStrandId = ref()
const active = ref([])
const inactive = ref([])
const drop = ref([])
const isFetching = ref(true)
const learningStrandInput = ref()
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

function updateGradesData(data) {
    isFetching.value = true

    active.value.length = 0
    inactive.value.length = 0
    drop.value.length = 0
    
    const actTemp = []
    const inactTemp = []
    const dropTemp = []

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
}

watch(() => props.learningStrands, () => {
    learningStrandInput.value = null
    active.value = []
    inactive.value = []
    drop.value = []
})

watch(() => learningStrandInput.value, (input) => {
    if (input) {
        isFetching.value = true
        classLearningStrandId.value = input.id
        try {
            classLearningStrandStore.getAllGrades(input.id).then((data) => {  
                updateGradesData(data)
            })
            
            isFetching.value = false
        } catch (error) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Unexpected error encountered. Please refresh this page.',
                life: 3000
            })
        }
    }
})
</script>

<template>
    <div class="relative flex flex-col h-full">
        <Toolbar class="!p-2">
            <template #end>
                <div class="flex flex-row gap-4 items-center mr-4">
                    <label class="font-semibold">Learning Strand:</label>
                    <Dropdown v-model="learningStrandInput" :options="props.learningStrands" optionLabel="learning_strand.name" placeholder="Select a Learning Strand" style="width: 20rem;"/> 
                </div>
                <span class="relative">
                    <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search"  class="pl-10 font-normal" showClear />
                </span>
            </template>
        </Toolbar>
        <TabView>
            <TabPanel header="Active">
                <GradesTable v-model="active" :id="classLearningStrandId" :isNotActive="!termStatus" :filters="filters" @onUpdate="updateGradesData" />
            </TabPanel>
            <TabPanel header="Inactive">
                <GradesTable v-model="inactive" :id="classLearningStrandId" :isNotActive="!termStatus" :filters="filters" @onUpdate="updateGradesData" />
            </TabPanel>
            <TabPanel header="Dropped">
                <GradesTable v-model="drop" :id="classLearningStrandId" :isNotActive="true" :filters="filters" @onUpdate="updateGradesData" />
            </TabPanel>
        </TabView>
    </div>
</template>

<style>
</style>