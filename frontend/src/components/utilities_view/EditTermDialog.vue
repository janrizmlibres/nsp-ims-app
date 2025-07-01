<script setup>
// Presets
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';
import { useToast } from 'primevue/usetoast';
import { computed, inject, ref } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { onBeforeRouteLeave, useRouter } from 'vue-router';

//  stores
import { useUsersStore } from '@/stores/users';
import { useUtilitiesStore } from '@/stores/utilities';

const toast = useToast()
const confirm = useConfirm()
const router = useRouter()

const utilitiesStore = useUtilitiesStore()
const usersStore = useUsersStore()

const editTermDialogState = inject('editTermDialogState')
const term = inject('term')
const dates = ref(null)
const disableUpdate = computed(() => 
                        invalidBatch.value || 
                        invalidRange.value || !term.value.batch_number ||
                        ((term.value.batch_number === utilitiesStore.terms.find(academicTerm => academicTerm.id === term.value.id).batch_number) && (dates.value ? !dates.value[1] : dates.value === null)))
const enableLeave = computed(() => (term.value ? term.value.batch_number === utilitiesStore.terms.find(academicTerm => academicTerm.id === term.value.id).batch_number : true) && (dates.value ? dates.value.length === 0 : !dates.value))
const invalidBatch = ref(false)
const invalidRange = ref(false)
const onSubmit = inject('updateTermsTable')

async function updateTerm() {
    try {
        const range = ref([])
        if (dates.value ? dates.value.length : dates.value) {
            for (let date of dates.value) {
                const offset = date.getTimezoneOffset()
                date = new Date(date.getTime() - (offset*60*1000))
                range.value.push(date)
            }
        }

        console.log(typeof term.value.start_date);

        await utilitiesStore.updateTerm(term.value.id, {
            batch_number: term.value.batch_number,
            start_date: (dates.value ? dates.value.length : false) ? range.value[0] : term.value.start_date,
            end_date: (dates.value ? dates.value.length : false) ? range.value[1] : term.value.end_date,
            academic_year:  (dates.value ? dates.value.length : false) ? range.value[0].getFullYear() + '-' + range.value[1].getFullYear() : 
                            new Date(term.value.start_date).getFullYear() + '-' + new Date(term.value.end_date).getFullYear()
        }).then(() => {
            onSubmit()
            resetForm()
        })
        editTermDialogState.value = false
        toast.add({
            severity: 'success',
            summary: 'Update Successful',
            detail: 'The academic year has been updated successfully!',
            life: 3000
        })
    } catch (error) {
        console.log(error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered. Please refresh this page.',
            life: 3000
        })
    }
};

async function cancel() {
    if (!enableLeave.value) {
        confirm.require({
            message: 'Do you really want to leave? you have unsaved changes!',
            header: 'Redirect Confirmation',
            accept: () => {
                resetForm()
                term.value = null
                editTermDialogState.value = false
                toast.add({
                    severity: 'info',
                    summary: 'Cancelled',
                    detail: 'Date range update cancelled.',
                    life: 3000
                })
            }
        })
    } else {
        resetForm()
        editTermDialogState.value = false
    }
}

function validateInputs() {
    invalidBatch.value = false
    invalidRange.value = false

    if (term.value.batch_number !== utilitiesStore.terms.find(academicTerm => academicTerm.id === term.value.id).batch_number && utilitiesStore.terms.some(academicTerm => academicTerm.batch_number === term.value.batch_number)) {
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

        if ((startDateYear + '-' + endDateYear) !== utilitiesStore.terms.find(academicTerm => academicTerm.id === term.value.id).academic_year && utilitiesStore.terms.some(academicTerm => academicTerm.academic_year === startDateYear + '-' + endDateYear)) {
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
    dates.value = null
    invalidBatch.value = false
    invalidRange.value = false
}

onBeforeRouteLeave(() => {
    if (enableLeave.value) {
        editTermDialogState.value = false
        return true
    }

    confirm.require({
        message: 'Do you really want to leave? you have unsaved changes!',
        header: 'Redirect Confirmation',
        accept: () => {
            term.value = null
            resetForm()
            router.back()
        }
    })

    return false
})
</script>

<template>
    <Dialog v-model:visible="editTermDialogState" modal header="Edit Academic Year" :style="{ width: '20rem' }" :closable="false" :draggable="false">
        <div class="flex flex-col gap-4 mb-4">
            <div class="flex flex-col">
                <label>Batch No.</label>
                <InputNumber v-model="term.batch_number" :invalid="invalidBatch" @update:modelValue="validateInputs" />
            </div>
            <div class="flex flex-col">
                <label>Start Date - End Date</label>
                <Calendar v-model="dates" id="calendar" showIcon showButtonBar iconDisplay="input" selectionMode="range" :invalid="invalidRange" hideOnRangeSelection :manualInput="false" @update:modelValue="validateInputs" />
                <small>Optional</small>
            </div>
            <div class="flex flex-col">
                <label>Student Admission KPI</label>
                <InputNumber v-model="term.saKPI" :min="0" />
                <small>Optional</small>
            </div>
            <div class="flex flex-col">
                <label>Enrollment KPI</label>
                <InputNumber v-model="term.eKPI" :min="0" />
                <small>Optional</small>
            </div>
            <div class="flex flex-col">
                <label>Volunteer Admission KPI</label>
                <InputNumber v-model="term.vaKPI" :min="0" />
                <small>Optional</small>
            </div>
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" outlined rounded label="Update" :disabled="disableUpdate" @click="updateTerm" class="u-border-pcolor u-txt-pcolor hover:u-bg-pcolor-2 hover:text-white" />
            <Button type="button" outlined rounded label="Cancel" severity="danger" @click="cancel" />
        </div>
    </Dialog>
</template>