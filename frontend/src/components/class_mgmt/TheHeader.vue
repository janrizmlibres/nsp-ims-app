<script setup>
// Presets
import Dropdown from 'primevue/dropdown';
import { computed, inject, ref, watch } from 'vue';

// stores
import { useUtilitiesStore } from '@/stores/utilities';

const utilitiesStore = useUtilitiesStore()

const terms = computed(() => utilitiesStore.terms)
const classes = computed(() => termInput.value ? termInput.value.class_levels : termInput.value)
const termInput = ref(terms.value.find(term => term.status === true))
const classLevelInput = ref(null)
const goToInput = ref(null)
const disableGoTo = ref(true)

const goTo = ref([
    {small: 'Students', value: 0},
    {small: 'Modules', value: 1},
    {small: 'Grades', value: 2},
    {small: 'Sessions', value: 3},
    {small: 'Schedules', value: 4},
])

const onSelect = inject('updateViewState')

watch(() => terms.value, () => {
    termInput.value = terms.value.find(term => term.status === true)

    updateTerm()
})

function updateTerm() {
    disableGoTo.value = true
    classLevelInput.value = null
    goToInput.value = null

    onSelect(termInput.value, classLevelInput.value, goToInput.value)
}

function updateClassLevel() {
    disableGoTo.value = false
    goToInput.value = null

    onSelect(termInput.value, classLevelInput.value, goToInput.value)
}

function updateGoToInput() {
    onSelect(termInput.value, classLevelInput.value, goToInput.value)
}
</script>

<template>
    <div class="flex justify-between gap-8 u-bg-pcolor-2 rounded-t-2xl shadow-xl p-4 text-white">
        <div class="flex flex-col gap-1 w-full">
            <small class="font-semibold">Academic Year:</small>
            <Dropdown v-model="termInput" :options="terms" optionLabel="academic_year" placeholder="Select an Academic Year" class="w-full flex-grow" @update:modelValue="updateTerm" />
        </div>
        <div class="flex flex-col gap-1 w-full">
            <small class="font-semibold">Class Level:</small>
            <Dropdown v-model="classLevelInput" :options="classes" optionLabel="school_level" placeholder="Select a Level" class="w-full flex-grow" @update:modelValue="updateClassLevel" />
        </div>
        <div class="flex flex-col gap-1 w-full">
            <small class="font-semibold">Go To:</small>
            <Dropdown v-model="goToInput" :options="goTo" optionLabel="small" optionValue="value" placeholder="Select..." class="w-full flex-grow" :disabled="disableGoTo" @update:modelValue="updateGoToInput" />
        </div>
    </div>
</template>

<style>
</style>