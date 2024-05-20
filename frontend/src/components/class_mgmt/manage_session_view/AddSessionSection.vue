<script setup>
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { computed, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { format } from 'date-fns';

const props = defineProps(['id', 'data'])
const toast = useToast()

const emit = defineEmits(['onUpdate'])
const classLearningStrandStore = useClassLearningStrandStore()
const classLearningStrandId = computed(() => props.id)
const data = computed(() => props.data)
const sessions = ref([])
const date = ref()
const minDate = ref()
const maxDate = ref()
const currentMonth = ref()
const selectionType = ref(1)
const selection = ref([
    {label: 'Single', value: 1},
    {label: 'Multiple', value: 2},
])

function addSelectedDate() {
    sessions.value = []

    if (!date.value) return
    if (date.value.constructor === Array) {
        let startDate = date.value[0]
        let endDate = date.value[1]

        let currentDate = new Date(startDate.getTime());

        while (currentDate <= endDate) {
            sessions.value.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
    else sessions.value.push(date.value)
}

async function addSession() {
    let newDates = []
    for (const session of sessions.value) {
        const offset = session.getTimezoneOffset()
        let newDate = format(new Date(session.getTime() - (offset*60*1000)), "yyyy-MM-dd");
        newDates.push(newDate)
    }

    try {
        await classLearningStrandStore.addSession(classLearningStrandId.value, {dates:newDates})
        classLearningStrandStore.getAllSessions(classLearningStrandId.value).then((data) => {
            emit('onUpdate', data)
        })
        
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Session(s) created successfully',
            life: 3000
        })

        resetForm()
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.response.data.message,
            life: 3000
        })
    }
}

function resetForm() {
    date.value = null
}

watch(() => props.data, (data) => {
    resetForm()
    
    if (data) {
        let date = new Date(data.date)
        minDate.value = new Date(date.getFullYear(), date.getMonth(), 1);
        maxDate.value = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        currentMonth.value = minDate.value.getMonth()
    }
})
</script>

<template>
    <div class="flex flex-col">
        <span class="font-semibold text-lg u-txt-active mb-4">Add Session</span>
        <div class="flex flex-col mb-4">
            <label>Selection Type</label>
            <Dropdown v-model="selectionType" :options="selection" optionLabel="label" optionValue="value" class="w-full" :disabled="!data" @update:modelValue="resetForm" />
        </div>
        <div v-if="selectionType === 1" class="flex flex-col gap-4 mb-4">
            <label>Session Date</label>
            <Calendar v-model="date" id="calendar" :minDate="minDate" :maxDate="maxDate" :currentMonth="currentMonth" showIcon showButtonBar iconDisplay="input" :disabled="!data" @update:modelValue="addSelectedDate" />
        </div>
        <div v-if="selectionType === 2" class="flex flex-col gap-4 mb-4">
            <label>Session Dates</label>
            <Calendar v-model="date" id="calendar" :minDate="minDate" :maxDate="maxDate" :currentMonth="currentMonth" showIcon showButtonBar iconDisplay="input" :disabled="!data" selectionMode="range" hideOnRangeSelection :manualInput="false" @update:modelValue="addSelectedDate" />
        </div>
        <div class="flex flex-row gap-2">
            <Button type="button" outlined rounded label="Add" :disabled="!date" @click="addSession" class="w-full" />
            <Button type="button" outlined rounded label="Reset" :disabled="!date" @click="resetForm" severity="danger" class="w-full" />
        </div>
    </div>
</template>