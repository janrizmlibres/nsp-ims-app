<script setup>
// Presets
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';
import { useToast } from 'primevue/usetoast';
import { inject, ref } from 'vue';

//  stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import { useStaffsStore } from '@/stores/staffs';

const toast = useToast()

const classLearningStrandStore = useClassLearningStrandStore()
const staffsStore = useStaffsStore()

const term = inject('term')
const classLevel = inject('classLevel')
const learningStrandInput = inject('learningStrandInput')
const termStatus = inject('termStatus')
const min = ref()
const max = ref()
const dates = ref(null);
const classLearningStrandId = inject('classLearningStrandId')

const invalidModuleRange = ref()
const invalidDateRange = ref()

const onSubmit = inject('updateModuleTable')

async function addModule() {
    try {
        const range = ref([])

        if (min.value > max.value) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Incorrect input range!',
                life: 3000
            })
            invalidModuleRange.value = true

            return
        }

        for (let date of dates.value) {
            const offset = date.getTimezoneOffset()
            date = new Date(date.getTime() - (offset*60*1000))
            range.value.push(date)
        }

        if (range.value[0].toDateString() === range.value[1].toDateString()) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Incorrect input range!',
                life: 3000
            })
            invalidDateRange.value = true

            return
        }
        
        await classLearningStrandStore.addModule(classLearningStrandId.value, {
            min: min.value,
            max: max.value,
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
                classLearningStrandStore.getAllModules(classLearningStrandId.value).then((data) => {
                    onSubmit(data)
                    resetForm()
                })
            } catch(error) {
                console.log(error);
            }

            try {
                await staffsStore.addAudit(
                    min.value === max.value ? 
                    `Added: ${module.value.title} to ${learningStrandInput.value.learning_strand.code} of ${classLevel.value.school_level}, SY ${term.value.academic_year}` :
                    `Added: LAS${min.value} to LAS${max.value} to ${learningStrandInput.value.learning_strand.code} of ${classLevel.value.school_level}, SY ${term.value.academic_year}`
                )
            } catch(error) {
                console.log(error);
            }
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

function resetForm() {
    invalidModuleRange.value = false 
    invalidDateRange.value = false
    min.value = null;
    max.value = null;
    dates.value = null;
}
</script>

<template>
    <div class="flex flex-col">
        <span class="font-semibold text-lg u-txt-active mb-4">Add Learning Activity Sheets</span>
        <div class="flex flex-col mb-4">
            <label for="title">From</label>
            <InputNumber v-model="min" inputId="min" :invalid="invalidModuleRange" :disabled="!classLearningStrandId || !termStatus" />
        </div>
        <div class="flex flex-col mb-4">
            <label for="title">To</label>
            <InputNumber v-model="max" inputId="max" :invalid="invalidModuleRange" :disabled="!classLearningStrandId || !termStatus" />
        </div>
        <div class="flex flex-col gap-4 mb-4">
            <label for="calendar">Distribution Date - Retrieval Date</label>
            <Calendar v-model="dates" id="calendar" showIcon showButtonBar iconDisplay="input" selectionMode="range" hideOnRangeSelection :manualInput="false" :invalid="invalidDateRange" :disabled="!classLearningStrandId || !termStatus" />
        </div>
        <div class="flex flex-row gap-2">
            <Button type="button" outlined rounded label="Add" :disabled="!min || !max || (dates ? (dates.length === 0 || dates[1] === null) : !dates)" @click="addModule" class="w-full" />
            <Button type="button" outlined rounded label="Reset" :disabled="!min && !max && !dates" @click="resetForm" severity="danger" class="w-full" />
        </div>
    </div>
</template>