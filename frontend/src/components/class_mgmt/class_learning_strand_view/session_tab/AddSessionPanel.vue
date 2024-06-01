<script setup>
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import OverlayPanel from 'primevue/overlaypanel';
import { computed, inject, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { format } from 'date-fns';
import { useUsersStore } from '@/stores/users';

const toast = useToast()

const classLearningStrandStore = useClassLearningStrandStore()
const usersStore = useUsersStore()

const op = inject('op')
const learningStrand = inject('learningStrand')
const term = inject('term')
const classLevel = inject('classLevel')
const selectedMonth = ref()
const sessionByMonths = inject('sessionByMonths')
const sessions = ref([])
const date = ref()
const minDate = ref()
const maxDate = ref()
const currentMonth = ref()
const selectionType = ref(1)
const disableAdd = computed(() => (date.value ? (date.value.length === 0 || date.value[1] === null) : !date.value) || invalidDateRange.value)

const disableInputComponent = computed(() => !selectedMonth.value)
const invalidDateRange = ref(false)

const selection = ref([
    {label: 'Single', value: 1},
    {label: 'Multiple', value: 2},
])

const onSubmit = inject('updateSessionTable')

function addSelectedDate() {
    sessions.value = []

    if (!date.value) return
    if (date.value.constructor === Array && date.value[1] !== null) {
        let startDate = date.value[0]
        let endDate = date.value[1]

        let currentDate = new Date(startDate.getTime());

        while (currentDate <= endDate) {
            sessions.value.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
    else sessions.value.push(new Date(date.value))
}

async function addSession() {
    try {
        resetForm()

        let newDates = []
        for (const session of sessions.value) {
            const offset = session.getTimezoneOffset()
            let newDate = format(new Date(session.getTime() - (offset*60*1000)), "yyyy-MM-dd");
            newDates.push(newDate)
        }

        await classLearningStrandStore.addSession(learningStrand.value.id, {dates:newDates}). then(async (message) =>{
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: message,
                life: 3000
            })

            try {
                for (const date of newDates) {
                    await usersStore.addAudit(
                        `Added: Session ${date} to ${learningStrand.value.code} of ${classLevel.value.school_level}, SY ${term.value.academic_year}`
                    )
                }
            } catch(error) {
                console.log(error);
            }

            onSubmit()
        })
    } catch (error) {
        console.log(error);
    }
}

function validateModuleRangeInput() {
    addSelectedDate()

    invalidDateRange.value = false
    
    if (selectionType.value === 2 && sessions.value.length === 1 && date.value[1] !== null) {
        invalidDateRange.value = true

        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Incorrect date range',
            life: 3000
        })
    }
    

    let newDates = []
    for (const session of sessions.value) {
        const offset = session.getTimezoneOffset()
        let newDate = format(new Date(session.getTime() - (offset*60*1000)), "yyyy-MM-dd");
        newDates.push(newDate)
    }

    let existingSessions = []
    let month = sessionByMonths.value[new Date(newDates[0]).getMonth()]
    for(const date of newDates) {
        if (month.sessions.some(obj => new Date(obj.date).toDateString() === new Date(date).toDateString())) {
            existingSessions.push(new Date(date).toDateString())
        }
    }

    if (existingSessions.length) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: `${existingSessions.toString()} exists already`,
            life: 3000
        })

        invalidDateRange.value = true
    }
}

function resetForm() {
    invalidDateRange.value = false
    date.value = null
}

watch(() => selectedMonth.value, (data) => {
    if (data) {
        let date = new Date(data.date)
        minDate.value = new Date(date.getFullYear(), date.getMonth(), 1);
        maxDate.value = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        currentMonth.value = minDate.value.getMonth()
    }
})
</script>

<template>
    <OverlayPanel ref="op">
        <div class="flex flex-col">
            <span class="font-semibold text-lg u-txt-active mb-4">Add Session</span>
            <div class="flex flex-col mb-4">
                <label>Select Month</label>
                <Dropdown v-model="selectedMonth" :options="sessionByMonths" optionLabel="month" class="w-full" />
            </div>
            <div class="flex flex-col mb-4">
                <label>Selection Type</label>
                <Dropdown v-model="selectionType" :options="selection" optionLabel="label" optionValue="value" class="w-full" :disabled="disableInputComponent" @update:modelValue="resetForm" />
            </div>
            <div v-if="selectionType === 1" class="flex flex-col gap-4 mb-4">
                <label>Session Date</label>
                <Calendar v-model="date" id="calendar" :minDate="minDate" :maxDate="maxDate" :currentMonth="currentMonth" showIcon showButtonBar iconDisplay="input" :invalid="invalidDateRange" :disabled="disableInputComponent" @update:modelValue="validateModuleRangeInput" />
            </div>
            <div v-if="selectionType === 2" class="flex flex-col gap-4 mb-4">
                <label>Session Dates</label>
                <Calendar v-model="date" id="calendar" :minDate="minDate" :maxDate="maxDate" :currentMonth="currentMonth" showIcon showButtonBar iconDisplay="input" :invalid="invalidDateRange" :disabled="disableInputComponent" selectionMode="range" hideOnRangeSelection :manualInput="false" @update:modelValue="validateModuleRangeInput" />
            </div>
            <div class="flex flex-row gap-2">
                <Button type="button" outlined label="Add" :disabled="disableAdd" @click="addSession" class="w-full u-border-pcolor u-txt-pcolor hover:u-bg-pcolor-2 hover:text-white" />
                <Button type="button" outlined label="Reset" :disabled="!date" @click="resetForm" severity="danger" class="w-full" />
            </div>
        </div>
    </OverlayPanel>
</template>