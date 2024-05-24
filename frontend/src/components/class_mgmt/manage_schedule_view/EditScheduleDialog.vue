<script setup>
// Presets
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import { useToast } from 'primevue/usetoast';
import { computed, inject, ref, watch } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { format } from 'date-fns';

//  stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import { useVolunteerStore } from '@/stores/volunteer';
import { useClassStore } from '@/stores/class';
import { useUsersStore } from '@/stores/users';
import { onBeforeRouteLeave, useRouter } from 'vue-router';

const volunteerStore = useVolunteerStore()
const classLearningStrandStore = useClassLearningStrandStore()
const classStore = useClassStore()
const usersStore = useUsersStore()

const toast = useToast()
const confirm = useConfirm()
const router = useRouter()

const editScheduleDialogState = inject('editScheduleDialogState')
const schedule = inject('schedule')
const classLevel = inject('classLevel')
const term = inject('term')
const startingData = ref()
const startTime = ref()
const endTime = ref()
const volunteers = computed(() => volunteerStore.volunteers)

const disableUpdate = computed(() => JSON.stringify(schedule.value) === JSON.stringify(startingData.value) && !startTime.value && !endTime.value)
const invalid = ref()

const days = ref(["M", "T", "W", "TH", "F", "S"]);

const onSubmit = inject('updateScheduleTable')

classStore.leave = false

watch(() => schedule.value, (data) => {
    startingData.value = {... data}
})

async function updateSchedule() {
    try {
        if ((startTime.value.getHours() >= endTime.value.getHours()) && (startTime.value.getMinutes() >= endTime.value.getMinutes())) {
            toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Incorrect input range!',
                    life: 3000
                })
                invalid.value = true
                return
        }

        await classLearningStrandStore.updateSchedule(schedule.value.scheduleId, {
            volunteer: schedule.value.volunteer,
            days: schedule.value.school_days.toString(),
            start_time: startTime.value ? format(new Date(startTime.value), "HH:mm") : undefined,
            end_time: endTime.value ? format(new Date(endTime.value), "HH:mm") : undefined,
        }).then(async (message) => {
            invalid.value = false
            classStore.leave = true
            startTime.value = null
            endTime.value = null

            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: message,
                life: 3000
            })

            try {
                await usersStore.addAudit(
                    `Updated: Schedule of ${schedule.value.code} of ${classLevel.value.school_level}, SY ${term.value.academic_year}`
                )
            } catch(error) {
                console.log(error);
            }

            onSubmit(schedule.value.classLevelId) 
            editScheduleDialogState.value = false
        })
    } catch(error) {
        console.log(error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered.',
            life: 3000
        })
    }
};

async function cancel() {
    if (!disableUpdate.value || startTime.value || endTime.value) {
        confirm.require({
            message: 'Do you really want to leave? you have unsaved changes!',
            header: 'Redirect Confirmation',
            accept: () => {
                classStore.leave = true
                startTime.value = null
                endTime.value = null
                editScheduleDialogState.value = false
            }
        })
    } else editScheduleDialogState.value = false
}

onBeforeRouteLeave(() => {
    if (JSON.stringify(schedule.value) === JSON.stringify(startingData.value) && !startTime.value && !endTime.value) {
        editScheduleDialogState.value = false
        return true
    }

    confirm.require({
        message: 'Do you really want to leave? you have unsaved changes!',
        header: 'Redirect Confirmation',
        accept: () => {
            schedule.value = {... startingData.value}
            startTime.value = null
            endTime.value = null
            router.back()
        }
    })

    return false
})
</script>

<template>
    <Dialog v-model:visible="editScheduleDialogState" modal header="Edit Schedule" :style="{ width: '20rem' }" :closable="false">
        <div class="flex flex-col gap-4 mb-4">
            <label>Teacher</label>
            <Dropdown v-model="schedule.volunteer" :options="volunteers" optionLabel="fullname" :placeholder="schedule.volunteer.fullname" />
        </div>
        <div class="flex flex-col gap-4 mb-4">
            <label>Days</label>
            <MultiSelect v-model="schedule.school_days" :options="days" placeholder="Select Days" :maxSelectedLabels="2" />
        </div>
        <div class="flex flex-col gap-4 mb-4">
            <label>Start Time</label>
            <Calendar id="calendar-timeonly" v-model="startTime" timeOnly hourFormat="12" :invalid="invalid" showIcon iconDisplay="input" icon="pi pi-clock cursor-pointer" @update:modelValue="invalid = false" />
        </div>
        <div class="flex flex-col gap-4 mb-4">
            <label>End Time</label>
            <Calendar id="calendar-timeonly" v-model="endTime" timeOnly hourFormat="12" :invalid="invalid" showIcon iconDisplay="input" icon="pi pi-clock cursor-pointer" @update:modelValue="invalid = false" />
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Update" :disabled="disableUpdate" outlined rounded @click="updateSchedule"></Button>
            <Button type="button" label="Cancel" severity="danger" outlined rounded @click="cancel"></Button>
        </div>
    </Dialog>
</template>