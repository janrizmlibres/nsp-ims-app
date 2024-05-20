<script setup>
// Presets
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import { computed, onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';

// stores
import { useVolunteerStore } from '@/stores/volunteer';

const toast = useToast()
const emit = defineEmits(['onUpdate'])
const props = defineProps(['id', 'learningStrands', 'termStatus'])

const termStatus = computed(() => props.termStatus)
const volunteerStore = useVolunteerStore()
const volunteers = computed(() => volunteerStore.volunteers)
const learningStrands = computed(() => props.learningStrands)
const learningStrandInput = ref()

onMounted(() => {
    try {
        volunteerStore.getAllVolunteers()
    } catch(error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered.',
            life: 3000
        })
    }
})

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
    if(formData.value.volunteer != null || formData.value.start_time != null || formData.value.end_time != null || formData.value.school_days.length != 0) return false
    else return true
})

function addSchedule() {
    emit('onUpdate', learningStrandInput.value, formData.value)
    resetForm()
}

function resetForm() {
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
            <Dropdown v-model="learningStrandInput" :options="learningStrands" optionLabel="learning_strand.name" placeholder="Select a Strand" />
        </div>
        <div class="flex flex-col mb-4">
            <label>Teacher</label>
            <Dropdown v-model="formData.volunteer" :options="volunteers" optionLabel="fullname" placeholder="Select a Teacher" showClear />
        </div>
        <div class="flex flex-col mb-4">
            <label>Days</label>
            <MultiSelect v-model="formData.school_days" :options="days" placeholder="Select Days" :maxSelectedLabels="3" />
        </div>
        <div class="flex flex-col mb-4">
            <label>Start Time</label>
            <Calendar id="calendar-timeonly" v-model="formData.start_time" timeOnly hourFormat="12" />
        </div>
        <div class="flex flex-col mb-4">
            <label>End Time</label>
            <Calendar id="calendar-timeonly" v-model="formData.end_time" timeOnly hourFormat="12" />
        </div>
        <div class="flex flex-row gap-2">
            <Button type="button" outlined rounded label="Add" :disabled="disableSubmitButton" @click="addSchedule" class="w-full" />
            <Button type="button" outlined rounded label="Reset" :disabled="enableResetButton" @click="resetForm" severity="danger" class="w-full" />
        </div>
    </div>
</template>

<style>
</style>