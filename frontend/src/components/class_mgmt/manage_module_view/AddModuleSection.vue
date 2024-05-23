<script setup>
// Presets
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';
import { useToast } from 'primevue/usetoast';
import { computed, ref } from 'vue';

//  stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';

const emit = defineEmits(['onUpdate', 'onUpdateDisplay'])
const props = defineProps(['id', 'state', 'termStatus'])
const toast = useToast()
const classLearningStrandStore = useClassLearningStrandStore()

const termStatus = computed(() => props.termStatus)
const min = ref()
const max = ref()
const dates = ref(null);
const classLearningStrandId = computed(() => props.id)
const invalid = ref()

async function addModule() {
    const range = ref([])
    try {
        invalid.value = false 

        if (min.value > max.value) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Incorrect input range!',
                life: 3000
            })
            invalid.value = true
            return
        }

        for (let date of dates.value) {
            const offset = date.getTimezoneOffset()
            date = new Date(date.getTime() - (offset*60*1000))
            range.value.push(date)
        }
        
        await classLearningStrandStore.addModule(classLearningStrandId.value, {
            min: min.value,
            max: max.value,
            distriDate: range.value[0],
            retriDate: range.value[1]
        }).then(() => {
            classLearningStrandStore.getAllModules(classLearningStrandId.value).then((data) => {
                emit('onUpdate', data)
            })
        })
        
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Module added successfully!',
            life: 3000
        })
    } catch(error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.response.data.message,
            life: 3000
        })
    }
    
    try {
        await staffsStore.addAudit(
            min.value === max.value ? 
            `Added: ${module.title} to ${learningStrandInput.value.learning_strand.code} of ${classLevel.school_level}, ${term.academic_year}` :
            `Added: LAS ${min.value} to ${max.value} to ${learningStrandInput.value.learning_strand.code} of ${classLevel.school_level}, ${term.academic_year}`
        )
    } catch(error) {
        console.log(error);
    }

    resetForm()
    emit('onUpdateDisplay')
}

function resetForm() {
    invalid.value = false
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
            <InputNumber v-model="min" inputId="min" :invalid="invalid" :disabled="!classLearningStrandId || !termStatus" />
        </div>
        <div class="flex flex-col mb-4">
            <label for="title">To</label>
            <InputNumber v-model="max" inputId="max" :invalid="invalid" :disabled="!classLearningStrandId || !termStatus" />
        </div>
        <div class="flex flex-col gap-4 mb-4">
            <label for="calendar">Distribution Date - Retrieval Date</label>
            <Calendar v-model="dates" id="calendar" showIcon showButtonBar iconDisplay="input" selectionMode="range" hideOnRangeSelection :manualInput="false" :disabled="!classLearningStrandId || !termStatus" />
        </div>
        <div class="flex flex-row gap-2">
            <Button type="button" outlined rounded label="Add" :disabled="!min || !max || (dates ? (dates.length === 0 || dates[1] === null) : !dates)" @click="addModule" class="w-full" />
            <Button type="button" outlined rounded label="Reset" :disabled="!min && !max && !dates" @click="resetForm" severity="danger" class="w-full" />
        </div>
    </div>
</template>