<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

import { useUtilitiesStore } from '@/stores/utilities';

const toast = useToast()
const termStore = useUtilitiesStore()

const dates = ref(null);

async function addTerm() {
    if (Object.values(dates.value).some((element) => element === null) ) {
        toast.add({
            severity: 'error',
            summary: 'Incomplete Form',
            detail: "Please fill up the date range field.",
            life: 3000
        })
        return
    }
    
    const term = termStore.terms.find(term => term.academic_year === dates.value[0].getFullYear() + '-' + dates.value[1].getFullYear());
    if (term) {
        toast.add({
            severity: 'error',
            summary: 'Duplicate Academic Term',
            detail: 'An Academic Term already exists.',
            life: 3000
        })
        return
    }

    if (dates.value[1].getFullYear() - dates.value[0].getFullYear() !== 1) {
        toast.add({
            severity: 'error',
            summary: 'Invalid Date Range',
            detail: 'The start and end dates must be exactly one year apart.',
            life: 3000
        })
        return
    }
    
    if (dates.value[0] > dates.value[1]) {
        toast.add({
            severity: 'error',
            summary: 'Invalid Date Range',
            detail: 'The start date cannot be later than the end date.',
            life: 3000
        })
        return
    }

    const range = ref([])
    try {
        for (let date of dates.value) {
            const offset = date.getTimezoneOffset()
            date = new Date(date.getTime() - (offset*60*1000))
            range.value.push(date)
        }
        
        await termStore.addTerm({
            academic_year: range.value[0].getFullYear() + '-' + range.value[1].getFullYear(),
            start_date: range.value[0],
            end_date: range.value[1],
        })

        await termStore.getTerms()

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
            detail: 'Unexpected error encountered. Please try again.',
            life: 3000
        })
    }

    dates.value = null;
    termStore.showHideAddTermDialog()
}
</script>

<template>
    <Dialog v-model:visible="termStore.visibleAddTermDialog" modal header="Create an Academic Term" :style="{ width: '20rem' }">
        <span class="p-text-secondary block mb-5">Fill up necessary information.</span>
        <div class="flex flex-col gap-4 mb-4">
            <div class="flex flex-col">
                <label>Start Date - End Date</label>
                <Calendar v-model="dates" id="calendar" showIcon iconDisplay="input" selectionMode="range" hideOnRangeSelection :manualInput="false" />
            </div>
        </div>
        <div class="flex justify-end gap-2">
            <Button
                type="button"
                label="Create"
                icon="fa-solid fa-plus"
                @click="addTerm"
                :pt="{
                    root: ({ props, context, parent }) => ({
                        class: [
                            {
                                'u-bg-pcolor-darker': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
                                'border u-bc-button': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain
                            },
                            {
                                'border u-bc-button hover:u-bc-button': props.outlined && props.severity === null && !props.plain
                            },
                            { 
                                'hover:u-bg-button-hover hover:u-bg-border-button-hover': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain 
                            },
                            { 
                                'focus:u-bg-border-button-focus': props.severity === null 
                            },
                        ]
                    })
                }"
                :pt-options="{mergeProps: true}"
            />
        </div>
    </Dialog>
</template>