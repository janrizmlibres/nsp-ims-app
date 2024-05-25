<script setup>
// Presets
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import { computed, inject, onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';

// stores
import { useVolunteerStore } from '@/stores/volunteer';
import { format } from 'date-fns';
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import { useUsersStore } from '@/stores/users';

const toast = useToast()

const classLearningStrandStore = useClassLearningStrandStore()
const usersStore = useUsersStore()

const termStatus = inject('termStatus')
const term = inject('term')
const classLevel = inject('classLevel')
const learningStrands = inject('learningStrands')
const volunteerStore = useVolunteerStore()
const volunteers = computed(() => volunteerStore.volunteers)

const learningStrandInput = ref()
const invalid = ref()

const formData = ref({
    volunteer: null,
    school_days: [],
    start_time: null,
    end_time: null
})

const days = ref(["M", "T", "W", "TH", "F", "S"]);

const disableSubmitButton = computed(() => {
    if(Object.values(formData.value).some(o => o === null) || formData.value.school_days.length === 0) return true
    else return false
})

const enableResetButton = computed(() => {
    if(learningStrandInput.value || formData.value.volunteer != null || formData.value.start_time != null || formData.value.end_time != null || formData.value.school_days.length != 0) return false
    else return true
})

const onSubmit = inject('updateScheduleTable')

async function addSchedule() {
    if ((formData.value.start_time.getHours() >= formData.value.end_time.getHours()) && (formData.value.start_time.getMinutes() >= formData.value.end_time.getMinutes())) {
        toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Incorrect input range!',
                life: 3000
            })
            invalid.value = true
            return
    }

    try {
        await classLearningStrandStore.addSchedule(learningStrandInput.value.id, {
            volunteer: formData.value.volunteer,
            days: formData.value.school_days.toString(),
            start_time: format(new Date(formData.value.start_time), "HH:mm"),
            end_time: format(new Date(formData.value.end_time), "HH:mm"),
        }).then(async (message) => {
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: message,
                life: 3000
            })

            try {
                await usersStore.addAudit(
                    `Added: Schedule for ${learningStrandInput.value.learning_strand.code} of ${classLevel.value.school_level}, SY ${term.value.academic_year}`
                )
            } catch(error) {
                console.log(error);
            }
            
            onSubmit(classLevel.value.id)
        })
    } catch (error) {
        console.log(error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: "Unexpected error encountered.",
            life: 3000
        })
    }
}

onMounted(() => {
    try {
        volunteerStore.getAllVolunteers()
    } catch(error) {
        console.log(error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered.',
            life: 3000
        })
    }
})

function resetForm() {
    invalid.value = false
    learningStrandInput.value = null
    formData.value = {
        volunteer: null,
        school_days: [],
        start_time: null,
        end_time: null
    }
}
</script>

<template>
    <div class="flex flex-col">
        <span class="font-semibold text-lg u-txt-active mb-4">Add Schedule</span>
        <div class="flex flex-col mb-4">
            <label>Learning Strand</label>
            <Dropdown v-model="learningStrandInput" :options="learningStrands" optionLabel="learning_strand.name" :disabled="!termStatus" placeholder="Select a Strand" />
        </div>
        <div class="flex flex-col mb-4">
            <label>Teacher</label>
            <Dropdown v-model="formData.volunteer" :options="volunteers" optionLabel="fullname" placeholder="Select a Teacher" showClear :disabled="!termStatus" />
        </div>
        <div class="flex flex-col mb-4">
            <label>Days</label>
            <MultiSelect v-model="formData.school_days" :options="days" placeholder="Select Days" :maxSelectedLabels="3" :disabled="!termStatus" />
        </div>
        <div class="flex flex-col mb-4">
            <label>Start Time</label>
            <Calendar id="calendar-timeonly" :invalid="invalid" v-model="formData.start_time" showIcon iconDisplay="input" icon="pi pi-clock cursor-pointer" timeOnly hourFormat="12" :disabled="!termStatus" @update:modelValue="invalid = false" />
        </div>
        <div class="flex flex-col mb-4">
            <label>End Time</label>
            <Calendar id="calendar-timeonly" :invalid="invalid" v-model="formData.end_time" showIcon iconDisplay="input" icon="pi pi-clock cursor-pointer" timeOnly hourFormat="12" :disabled="!termStatus" @update:modelValue="invalid = false" />
        </div>
        <div class="flex flex-row gap-2">
            <Button type="button" outlined rounded label="Add" :disabled="disableSubmitButton" @click="addSchedule" class="w-full" />
            <Button type="button" outlined rounded label="Reset" :disabled="enableResetButton" @click="resetForm" severity="danger" class="w-full" />
        </div>
    </div>
</template>

<style>
</style>