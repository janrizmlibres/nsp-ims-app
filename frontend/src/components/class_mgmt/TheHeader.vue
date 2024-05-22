<script setup>
// Presets
import Dropdown from 'primevue/dropdown';
import Panel from 'primevue/panel';
import { computed, ref } from 'vue';

// stores
import { useUtilitiesStore } from '@/stores/utilities';

const emit = defineEmits(['updateState'])
const props = defineProps(['state'])

const utilitiesStore = useUtilitiesStore()

const terms = computed(() => utilitiesStore.terms)
const classes = computed(() => termInput.value.class_levels)

const termInput = ref(terms.value.find(term => term.status === true))
const classLevelInput = ref()

const enableLearningStrandDropdown = ref(false)

function updateTerm() {
    classLevelInput.value = null
    emit('updateState', termInput.value, classLevelInput.value)
}

function updateClassLevel() {
    enableLearningStrandDropdown.value = true; 
    
    emit('updateState', termInput.value, classLevelInput.value)
}
</script>

<template>
    <div class="flex gap-4 bg-white rounded-md shadow-xl py-2 px-6 mb-2">
        <div class="flex flex-row gap-4 items-center">
            <label class="font-semibold w-full">Academic Year:</label>
            <Dropdown v-model="termInput" :options="terms" optionLabel="academic_year" placeholder="Select an Academic Year" class="w-full" @update:modelValue="updateTerm" />
        </div>
        <div class="flex flex-row gap-4 items-center">
            <label class="font-semibold w-full">Class Level:</label>
            <Dropdown v-model="classLevelInput" :options="classes" optionLabel="school_level" placeholder="Select a Level" class="w-full" @update:modelValue="updateClassLevel" />
        </div>
    </div>

    <Panel v-if="!props.state" class="shadow-md mb-8">
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