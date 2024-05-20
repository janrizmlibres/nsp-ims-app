<script setup>
// Presets
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import { useToast } from 'primevue/usetoast';
import { computed, ref, watch } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { format } from 'date-fns';

//  stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import { useVolunteerStore } from '@/stores/volunteer';
import { onBeforeRouteLeave, useRouter } from 'vue-router';

const volunteerStore = useVolunteerStore()
const classLearningStrandStore = useClassLearningStrandStore()

const emit = defineEmits(['onUpdate', 'onUpdateDisplay'])
const props = defineProps(['data', 'state'])
const toast = useToast()
const confirm = useConfirm()
const router = useRouter()

const state = computed(() => props.state)
const schedule = ref()
const startTime = ref()
const endTime = ref()
const volunteers = computed(() => volunteerStore.volunteers)
const days = ref(["M", "T", "W", "TH", "F", "S"]);
const leave = ref(false)

watch(() => props.data, (data) => schedule.value = data)

async function updateSchedule() {
    try {
        await classLearningStrandStore.updateSchedule(schedule.value.scheduleId, {
            volunteer: schedule.value.volunteer,
            days: schedule.value.school_days.toString(),
            start_time: startTime.value ? format(new Date(startTime.value), "HH:mm") : undefined,
            end_time: endTime.value ? format(new Date(endTime.value), "HH:mm") : undefined,
        }).then(() => { emit('onUpdate', schedule.value.classLevelId) })

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Module updated successfully!',
            life: 3000
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
    confirm.require({
        message: 'Do you really want to leave? you have unsaved changes!',
        header: 'Redirect Confirmation',
        accept: () => {emit('onUpdateDisplay')}
    })
}

onBeforeRouteLeave((to) => {
    if (leave.value) {
        return true
    }

    confirm.require({
        message: 'Do you really want to leave? you have unsaved changes!',
        header: 'Redirect Confirmation',
        accept: async () => {
            leave.value = true
            await router.push(to)
        }
    })

    return false
})
</script>

<template>
    <Dialog v-model:visible="state" modal header="Edit Schedule" :style="{ width: '20rem' }" :closable="false">
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
            <Calendar id="calendar-timeonly" v-model="startTime" timeOnly hourFormat="12" showIcon iconDisplay="input" icon="pi pi-clock cursor-pointer" />
        </div>
        <div class="flex flex-col gap-4 mb-4">
            <label>End Time</label>
            <Calendar id="calendar-timeonly" v-model="endTime" timeOnly hourFormat="12" showIcon iconDisplay="input" icon="pi pi-clock cursor-pointer" />
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Update" @click="updateSchedule"></Button>
            <Button type="button" label="Cancel" severity="danger" @click="cancel"></Button>
        </div>
    </Dialog>
</template>