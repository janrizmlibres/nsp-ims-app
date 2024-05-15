<script setup>
// Presets
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import { computed, onMounted, ref, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm'

// stores
import { useVolunteerStore } from '@/stores/volunteer';
import { onBeforeRouteLeave, useRouter } from 'vue-router';

const toast = useToast()
const emit = defineEmits(['submit'])
const props = defineProps(['termStatus', 'classLevel'])
const confirm = useConfirm()
const router = useRouter()

const volunteerStore = useVolunteerStore()
const volunteers = computed(() => volunteerStore.volunteers)
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

const leave = ref(true)
const disableSubmitButton = computed(() => {
    if(Object.values(formData.value).some(o => o === null) || formData.value.school_days.length === 0) return true
    else return false
})

const formData = ref({
    volunteer: null,
    school_days: [],
    start_time: null,
    end_time: null
})

const days = ref(["M", "T", "W", "TH", "F", "S"]);

function addSchedule() {
    emit('submit', learningStrandInput.value, formData.value)
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

watch(() => Object.values(formData.value), (data) => {
    if(data[0] != null || data[2] != null || data[3] != null || data[1].length != 0) {
        leave.value = false
    } else leave.value = true
})

onBeforeRouteLeave((to) => {
    if (leave.value) {
        return true
    }

    if(Object.values(formData.value).some(o => o === null) || formData.value.school_days.length === 0) {
        confirm.require({
            message: 'Do you really want to leave? you have unsaved changes!',
            header: 'Redirect Confirmation',
            accept: async () => {
                leave.value = true
                await router.push(to)
            }
        })
    }

    return false
})
</script>

<template>
    <div v-if="props.termStatus" class="flex flex-col bg-white rounded-md shadow-xl p-8 mb-8">
        <div class="text-center text-xl font-semibold u-txt-active mb-8">Add a Schedule</div>
        <div class="grid xl:grid-flow-col lg:grid-flow-row gap-4 u-txt-active">
            <div class="flex flex-col gap-2">
                <label>Learning Strand</label>
                <Dropdown v-model="learningStrandInput" :options="props.classLevel.class_learning_strands" optionLabel="learning_strand.name" placeholder="Select a Strand" class="w-full xl:w-[16rem]" />
            </div>
            <div class="flex flex-col gap-2">
                <label>Teacher</label>
                <Dropdown v-model="formData.volunteer" :options="volunteers" optionLabel="fullname" placeholder="Select a Teacher" class="w-full xl:max-w-[14rem]" />
            </div>
            <div class="flex flex-col gap-2">
                <label>Days</label>
                <MultiSelect v-model="formData.school_days" :options="days" placeholder="Select Days" :maxSelectedLabels="3" class="w-full xl:w-[12rem]" />
            </div>
            <div class="flex flex-col gap-2">
                <label>Start Time</label>
                <Calendar id="calendar-timeonly" v-model="formData.start_time" timeOnly hourFormat="12"  class="w-full xl:max-w-[16rem]" />
            </div>
            <div class="flex flex-col gap-2">
                <label>End Time</label>
                <Calendar id="calendar-timeonly" v-model="formData.end_time" timeOnly hourFormat="12" class="w-full xl:max-w-[16rem]" />
            </div>
            <div class="flex flex-col gap-2 justify-end">
                <label></label>
                <Button label="Add" icon="pi pi-arrow-right" iconPos="right" :disabled="disableSubmitButton" @click="addSchedule" />
            </div>
        </div>
    </div>
</template>

<style>
</style>