<script setup>
// Presets
import Dropdown from 'primevue/dropdown';
import { computed, ref, watch } from 'vue';

// stores
import { useUtilitiesStore } from '@/stores/utilities';

const emit = defineEmits(['onSelect'])

const utilitiesStore = useUtilitiesStore()

const terms = computed(() => utilitiesStore.terms)
const classes = computed(() => termInput.value.class_levels)

const termInput = ref(terms.value.find(term => term.status === true))
const classLevelInput = ref()

watch(() => terms.value, () => {
    termInput.value = terms.value.find(term => term.status === true)

    updateTerm()
})

function updateTerm() {
    classLevelInput.value = null

    emit('onSelect', termInput.value, classLevelInput.value)
}

function updateClassLevel() {
    emit('onSelect', termInput.value, classLevelInput.value)
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
</template>

<style>
</style>