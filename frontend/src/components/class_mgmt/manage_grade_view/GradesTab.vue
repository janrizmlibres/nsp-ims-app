<script setup>
// Presets
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Dropdown from 'primevue/dropdown';
import { computed, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';

// // Custom
import GradesTable from '@/components/class_mgmt/manage_grade_view/GradesTable.vue';

// stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';

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

watch(() => learningStrandInput.value, (input) => {
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
})

</script>

<template>
    <Dropdown v-model="learningStrandInput" :options="props.learningStrands" optionLabel="learning_strand.name" placeholder="Select a Strand" class="w-full mb-4" />
    <TabView>
        <TabPanel header="Active">
            <GradesTable :isNotActive="!termStatus" v-model="active" :id="classLearningStrandId" @onUpdate="updateGradesData" />
        </TabPanel>
        <TabPanel header="Inactive">
            <GradesTable :isNotActive="true" v-model="inactive" :id="classLearningStrandId" @onUpdate="updateGradesData" />
        </TabPanel>
        <TabPanel header="Dropped">
            <GradesTable :isNotActive="true" v-model="drop" :id="classLearningStrandId" @onUpdate="updateGradesData" />
        </TabPanel>
    </TabView>
</template>

<style>
</style>