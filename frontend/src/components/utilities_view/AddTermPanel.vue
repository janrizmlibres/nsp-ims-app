<script setup>
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import OverlayPanel from 'primevue/overlaypanel';
import InputNumber from 'primevue/inputnumber';
import { useToast } from 'primevue/usetoast';
import { computed, inject, ref } from 'vue'
import { useUtilitiesStore } from '@/stores/utilities';

const utilitiesStore = useUtilitiesStore()

const toast = useToast()

const op = inject('op')
const batch = ref(null)
const saKPI = ref(0)
const eKPI = ref(0)
const vaKPI = ref(0)
const dates = ref(null);
const disableAdd = computed(() => invalidBatch.value || invalidRange.value || !batch.value || (dates.value ? !dates.value[1] : !dates.value))
const invalidBatch = ref(false)
const invalidRange = ref(false)

const onSubmit = inject('updateTermsTable')

async function addTerm() {
    try {        
        const range = ref([])
        for (let date of dates.value) {
            const offset = date.getTimezoneOffset()
            date = new Date(date.getTime() - (offset*60*1000))
            range.value.push(date)
        }
        
        await utilitiesStore.addTerm({
            batch_number: batch.value,
            academic_year: range.value[0].getFullYear() + '-' + range.value[1].getFullYear(),
            start_date: range.value[0],
            end_date: range.value[1],
            student_admission_kpi: saKPI.value,
            enrollment_kpi: eKPI.value,
            volunteer_admission_kpi: vaKPI.value
        })

        onSubmit()

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Academic Term added successfully!',
            life: 3000
        })
    } catch(error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered. Please refresh this page.',
            life: 3000
        })
    }

    resetForm()
}

function validateInputs() {
    invalidBatch.value = false
    invalidRange.value = false

    if (utilitiesStore.terms.some(academicTerm => academicTerm.batch_number === batch.value)) {
        toast.add({
            severity: 'error',
            summary: 'Duplicate Batch Number',
            detail: 'A batch number already exists.',
            life: 3000
        })
        
        invalidBatch.value = true
    }

    if (dates.value ? dates.value[1] : dates.value) {
        let startDateYear = dates.value[0].getFullYear();
        let endDateYear = dates.value[1].getFullYear();

        if (utilitiesStore.terms.some(academicTerm => academicTerm.academic_year === startDateYear + '-' + endDateYear)) {
            toast.add({
                severity: 'error',
                summary: 'Duplicate Academic Term',
                detail: 'An Academic Term already exists.',
                life: 3000
            })
            
            invalidRange.value = true
        }

        if (endDateYear - startDateYear !== 1) {
            toast.add({
                severity: 'error',
                summary: 'Invalid Date Range',
                detail: 'The start and end dates must be exactly one year apart.',
                life: 3000
            })
            
            invalidRange.value = true
        }

        if (dates.value[0] > dates.value[1]) {
            toast.add({
                severity: 'error',
                summary: 'Invalid Date Range',
                detail: 'The start date cannot be later than the end date.',
                life: 3000
            })
            
            invalidRange.value = true
        }
    }
}

function resetForm() {
    batch.value = null
    dates.value = null
}
</script>

<template>
    <OverlayPanel ref="op">
        <div class="flex flex-col">
            <span class="p-text-secondary block mb-5">Fill up necessary information.</span>
            <div class="flex flex-col gap-4 mb-4">
                <div class="flex flex-col">
                    <label>Batch No.</label>
                    <InputNumber v-model="batch" :invalid="invalidBatch" @update:modelValue="validateInputs" />
                </div>
                <div class="flex flex-col">
                    <label>Start Date - End Date</label>
                    <Calendar v-model="dates" id="calendar" :invalid="invalidRange" showIcon showButtonBar iconDisplay="input" selectionMode="range" hideOnRangeSelection :manualInput="false" @update:modelValue="validateInputs" />
                </div>
                <div class="flex flex-col">
                    <label>Student Admission KPI</label>
                    <InputNumber v-model="saKPI" :min="0" />
                    <small>Optional</small>
                </div>
                <div class="flex flex-col">
                    <label>Enrollment KPI</label>
                    <InputNumber v-model="eKPI" :min="0" />
                    <small>Optional</small>
                </div>
                <div class="flex flex-col">
                    <label>Volunteer Admission KPI</label>
                    <InputNumber v-model="vaKPI" :min="0" />
                    <small>Optional</small>
                </div>
            </div>
            <div class="flex justify-end gap-2">
                <Button
                    type="button"
                    label="Create"
                    icon="fa-solid fa-plus"
                    :disabled="disableAdd"
                    @click="addTerm"
                    class="u-bg-pcolor text-white hover:u-bg-pcolor"
                />
            </div>
        </div>
    </OverlayPanel>
</template>