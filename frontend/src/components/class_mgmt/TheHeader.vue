<script setup>
// Presets
import Dropdown from 'primevue/dropdown';
import Panel from 'primevue/panel';
import { computed, onMounted, ref } from 'vue';

// stores
import { useTermStore } from '@/stores/term';
import { useToast } from 'primevue/usetoast';
import { useClassStore } from '@/stores/class';

const emit = defineEmits(['chooseLearningStrand', 'updateState'])
const props = defineProps(['state'])
const toast = useToast()

const termStore = useTermStore()
const classStore = useClassStore()

const terms = ref([])
const classes = ref([])
const learningStrands = ref([]);

const termInput = ref()
const classLevelInput = ref()
const learningStrandInput = ref()

const state = computed(() => props.state)
const enableSchoolLevelDropdown = ref(false)
const enableLearningStrandDropdown = ref(false)

onMounted(() => {
    try {
        termStore.getAllTerms().then((data) => terms.value = data)
    } catch(error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.response.data.message,
            life: 3000
        })
    }
})

function updateTerm() {
    enableLearningStrandDropdown.value = false; 
    enableSchoolLevelDropdown.value = true;

    learningStrandInput.value = null
    classLevelInput.value = null

    termStore.getTerm(termInput.value.id).then((data) => classes.value = data.class_levels)
    emit('updateState', learningStrandInput.value)
}

function updateClassLevel() {
    enableLearningStrandDropdown.value = true; 
    
    learningStrandInput.value = null

    classStore.getAllLearningStrands(classLevelInput.value.id).then((data) => learningStrands.value = data)
    emit('updateState', learningStrandInput.value)
}

function updateLearningStand() {
    emit('updateState', learningStrandInput.value, termInput.value.status)
    emit('chooseLearningStrand', learningStrandInput.value.id)
}
</script>

<template>
    <div class="flex gap-12 bg-white rounded-md shadow-xl p-4 px-6 mb-2">
        <div class="flex flex-col gap-1">
            <label>Academic Year</label>
            <Dropdown v-model="termInput" :options="terms" optionLabel="academic_year" placeholder="Select an Academic Year" class="w-full" @update:modelValue="updateTerm" />
        </div>
        <div class="flex flex-col gap-1">
            <label>Class Level</label>
            <Dropdown v-model="classLevelInput" :options="classes" optionLabel="school_level" placeholder="Select a Level" :disabled="!enableSchoolLevelDropdown" class="w-full" @update:modelValue="updateClassLevel" />
        </div>
        <div class="flex flex-col gap-1">
            <label>Learning Strand</label>
            <Dropdown v-model="learningStrandInput" :options="learningStrands" optionLabel="learning_strand.name" placeholder="Select a Strand" :disabled="!enableLearningStrandDropdown" class="w-full" @update:modelValue="updateLearningStand" />
        </div>
    </div>

    <Panel v-if="!state" class="shadow-md mb-8">
        <template #header>
            <div class="flex items-center gap-2">
                <i class="fa fa-circle-info fa-xl"></i>
                <span class="u-txt-active font-semibold text-xl content-center">Action Required</span>
            </div>
        </template>
        <p class="m-0">
            Please fill necessary information in order to continue. Thank you!
        </p>
    </Panel>
</template>

<style>
</style>