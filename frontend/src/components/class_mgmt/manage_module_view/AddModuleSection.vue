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
const props = defineProps(['id', 'state'])
const toast = useToast()
const classLearningStrandStore = useClassLearningStrandStore()
const min = ref()
const max = ref()
const dates = ref(null);
const classLearningStrandId = computed(() => props.id)

async function addModule() {
    const range = ref([])
    try {
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
            summary: 'Duplicated Module Title',
            detail: error.response.data.message,
            life: 3000
        })
    }
    
    min.value = null;
    max.value = null;
    dates.value = null;
    emit('onUpdateDisplay')
}
</script>

<template>
    <div class="flex flex-col">
        <span class="font-semibold text-lg u-txt-active mb-4">Add Learning Activity Sheets</span>
        <div class="flex flex-col mb-4">
            <label for="title">From</label>
            <InputNumber v-model="min" inputId="min" :disabled="!classLearningStrandId" />
        </div>
        <div class="flex flex-col mb-4">
            <label for="title">To</label>
            <InputNumber v-model="max" inputId="max" :disabled="!classLearningStrandId" />
        </div>
        <div class="flex flex-col gap-4 mb-4">
            <label for="calendar">Distribution Date - Retrieval Date</label>
            <Calendar v-model="dates" id="calendar" showIcon showButtonBar iconDisplay="input" selectionMode="range" hideOnRangeSelection :manualInput="false" :disabled="!classLearningStrandId" />
        </div>
        <Button type="button" outlined rounded label="Add" :disabled="!min || !max || !dates" @click="addModule" />
    </div>
</template>