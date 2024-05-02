<script setup>
// Presets
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

// stores
import { useClassStore } from '@/stores/class';

const emit = defineEmits(['addForm'])
const route = useRoute()

const term = ref()
const schoolLevel = ref()

onMounted(async () => {
    try {
        await classStore.getClass(route.query.id)
        const classLevel = ref(classStore.classLevel)
        schoolLevel.value = classLevel.value.school_level
        term.value = classLevel.value.term.academic_year
    } catch (error) {
        console.log(error.response.data.message)
    }
})

const classStore = useClassStore()
const formData = ref({
    name: '',
    teacher: '',
    class_schedule: {
        school_days: [],
        start_time: ref(),
        end_time: ref()
    }
})

const learningStrands = ref(['Mathematics', 'Science', 'Understanding the Self and Society']);

const teachers = ref(['Dela Cruz, Shelly', 'Fuentes, Alonzo', 'Firma, Alejandra', 'Horticullado, Gabriel', 'Santos, John']);
const days = ref([
    {name: "M", key: "1"},
    {name: "T", key: "2"},
    {name: "W", key: "3"},
    {name: "TH", key: "4"},
    {name: "F", key: "5"},
    {name: "S", key: "6"},
]);

function resetForm() {
    formData.value = {
        name: '',
        teacher: '',
        class_schedule: {
            school_days: [],
            start_time: ref(),
            end_time: ref()
        }
    }
}

function addForm() {
    emit('addForm', formData.value)
    resetForm()
}
</script>

<template>
    <div class="flex justify-evenly bg-white rounded-md shadow-xl p-2 px-4 mb-2">
        <div>
            <span class="mr-3 u-txt-active">School Year</span>
            <span class="relative">
                <InputText disabled :placeholder="term" />
            </span>
        </div>
        <div>
            <span class="mr-3 u-txt-active">School Level</span>
            <span class="relative">
                <InputText disabled :placeholder="schoolLevel" />
            </span>
        </div>
    </div>

    <div class="flex flex-col bg-white rounded-md shadow-xl p-8 mb-8">
        <span class="font-semibold text-2xl u-txt-active mb-8">Add a Learning Strand</span>
        <div class="flex flex-row">
            <!-- select school level and learning strand -->
            <div class="flex flex-col mr-24">
                <div class="flex flex-col justify-between mb-8">
                    <span class="mr-3 u-txt-active">Learning Strand</span>
                    <span class="relative">
                        <Dropdown v-model="formData.name" :options="learningStrands" placeholder="Select a Strand" class="w-full md:w-[14rem]" />
                    </span>
                </div>

                <div class="flex flex-col justify-between">
                    <span class="mr-3 u-txt-active">Teacher</span>
                    <span class="relative">
                        <Dropdown v-model="formData.teacher" :options="teachers" placeholder="Select a Teacher" class="w-full md:w-[14rem]" />
                    </span>
                </div>
            </div>

            <!-- select days and time -->
            <div class="flex flex-col">
                <div class="grid grid-flow-col mb-8">
                    <span class="mr-3 u-txt-active">School Days</span>
                    <div class="grid grid-cols-3 card gap-3">
                        <div v-for="day of days" :key="day.key" class="flex items-center">
                            <Checkbox v-model="formData.class_schedule.school_days" :inputId="day.key" name="day" :value="day.name" class="mr-2"/>
                            <label :for="day.key">{{ day.name }}</label>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <span class="mr-3 u-txt-active">Start Time</span>
                        <div>
                            <Calendar id="calendar-timeonly" v-model="formData.class_schedule.start_time" timeOnly hourFormat="12" />
                        </div>
                    </div>
                    <div>
                        <span class="mr-3 u-txt-active">End Time</span>
                        <div>
                            <Calendar id="calendar-timeonly" v-model="formData.class_schedule.end_time" timeOnly hourFormat="12" />
                        </div>
                    </div>
                </div>
                <Button icon="fa fa-plus" label="Add" class="col-start-2 inset-y-0 right-0 self-end" @click="addForm" />
            </div>
        </div>
    </div>
</template>

<style>
</style>