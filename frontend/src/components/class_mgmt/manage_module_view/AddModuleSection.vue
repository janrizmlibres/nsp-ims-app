<script setup>
// Presets
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import { useToast } from 'primevue/usetoast';
import { computed, inject, ref } from 'vue';

//  stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import { useUsersStore } from '@/stores/users';

const toast = useToast()

const classLearningStrandStore = useClassLearningStrandStore()
const usersStore = useUsersStore()

const term = inject('term')
const classLevel = inject('classLevel')
const learningStrandInput = inject('learningStrandInput')
const termStatus = inject('termStatus')
const allModules = inject('allModules')
const min = ref()
const max = ref()
const dates = ref(null);
const selectionType = ref(1)
const disableInput = computed(() => !learningStrandInput.value || !termStatus.value)
const disableAdd = computed(() => (() => {
        if (invalidModuleRange.value) return true
        if (selectionType.value === 1 && 
            (!min.value || (dates.value ? (dates.value.length === 0 || dates.value[1] === null) : !dates.value))
        ) {
            return true
        }

        if (selectionType.value === 2 &&
            (!min.value || !max.value || (dates.value ? (dates.value.length === 0 || dates.value[1] === null) : !dates.value))
        ) {
            return true
        }

        return false
    })()
)
const invalidModuleRange = ref(false)

const selection = ref([
    {label: 'Single', value: 1},
    {label: 'Multiple', value: 2}
])

const onSubmit = inject('updateModuleTable')

async function addModule() {
    try {
        const range = ref([])
        for (let date of dates.value) {
            const offset = date.getTimezoneOffset()
            date = new Date(date.getTime() - (offset*60*1000))
            range.value.push(date)
        }

        await classLearningStrandStore.addModule(learningStrandInput.value.id, {
            min: min.value,
            max: max.value ? max.value : min.value,
            distriDate: range.value[0],
            retriDate: range.value[1]
        }).then(async (message) => {
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: message,
                life: 3000
            })

            try {
                await usersStore.addAudit(
                    selectionType.value === 1 ? 
                    `Added: LAS ${min.value} to ${learningStrandInput.value.learning_strand.code} of ${classLevel.value.school_level}, SY ${term.value.academic_year}` :
                    `Added: LAS ${min.value} to LAS ${max.value} to ${learningStrandInput.value.learning_strand.code} of ${classLevel.value.school_level}, SY ${term.value.academic_year}`
                )
            } catch(error) {
                console.log(error);
            }

            onSubmit()
            resetForm()
        })
    } catch(error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.response.data.message,
            life: 3000
        })
    }
}

function validateModuleRangeInput() {
    invalidModuleRange.value = false

    if (selectionType.value === 1 && allModules.value.some(obj => obj.title === ("LAS " + min.value))) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: `LAS${min.value} exists already`,
            life: 3000
        })

        invalidModuleRange.value = true
    }

    if (selectionType.value === 2 && max.value) {
        if (min.value > max.value) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Incorrect module input range',
                life: 3000
            })

            invalidModuleRange.value = true
        }

        let existingModules = []
        for(let i = min.value; i < max.value+1; i++) {
            if (allModules.value.some(obj => obj.title === ("LAS " + i))) {
                existingModules.push(`LAS${i}`)
            }
        }

        if (existingModules.length) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: `${existingModules.toString()} exist already`,
                life: 3000
            })

            invalidModuleRange.value = true
        }
    }
}

function resetForm() {
    min.value = null;
    max.value = null;
    dates.value = null;
}
</script>

<template>
    <div class="flex flex-col">
        <span class="font-semibold text-lg u-txt-active mb-4">Add Learning Activity Sheets</span>
        <div class="flex flex-col mb-4">
            <label>Selection Type</label>
            <Dropdown v-model="selectionType" :options="selection" optionLabel="label" optionValue="value" class="w-full" :disabled="disableInput" @update:modelValue="resetForm" />
        </div>
        <div v-if="selectionType === 1" class="flex flex-col mb-4">
            <label for="title">No.</label>
            <InputNumber v-model="min" inputId="num" :invalid="invalidModuleRange" :min="1" :disabled="disableInput" @update:modelValue="validateModuleRangeInput" />
        </div>
        <div v-if="selectionType === 2" class="flex flex-col mb-4">
            <label for="title">From</label>
            <InputNumber v-model="min" inputId="min" :invalid="invalidModuleRange" :min="1" @update:modelValue="validateModuleRangeInput" />
        </div>
        <div v-if="selectionType === 2" class="flex flex-col mb-4">
            <label for="title">To</label>
            <InputNumber v-model="max" inputId="max" :invalid="invalidModuleRange" :min="min+1" :max="min+10" @update:modelValue="validateModuleRangeInput" />
        </div>
        <div class="flex flex-col gap-4 mb-4">
            <label for="calendar">Distribution Date - Retrieval Date</label>
            <Calendar v-model="dates" id="calendar" showIcon showButtonBar iconDisplay="input" selectionMode="range" hideOnRangeSelection :manualInput="false" :disabled="disableInput" />
        </div>
        <div class="flex flex-row gap-2">
            <Button type="button" outlined label="Add" :disabled="disableAdd" @click="addModule" class="w-full u-border-pcolor u-txt-pcolor hover:u-bg-pcolor-2 hover:text-white" />
            <Button type="button" outlined label="Reset" :disabled="!min && !max && !dates" @click="resetForm" severity="danger" class="w-full" />
        </div>
    </div>
</template>