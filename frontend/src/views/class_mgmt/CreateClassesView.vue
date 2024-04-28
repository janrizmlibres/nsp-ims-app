<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import CreateClassForm from '@/components/class_mgmt/create_class_view/CreateClassForm.vue';
import LearningStrandsTable from '@/components/class_mgmt/create_class_view/LearningStrandsTable.vue';
import Button from 'primevue/button';

import { ref } from 'vue';
import { useTermStore } from '@/stores/term';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios'

const props = defineProps({level: String})
const termStore = useTermStore()
const authStore = useAuthStore()
const formData = ref({
    name: '',
    teacher: '',
    class_schedule: {
        school_days: [],
        start_time: ref(),
        end_time: ref()
    }
})

const classData = ref({
    academic_year: termStore.active_year,
    school_level: props.level,
})
const scheduleData = ref([])
const tableData = ref([])

function addForm(data) {
    scheduleData.value.push(data)

    const temp = {
        name: data.name,
        teacher: data.teacher,
        school_days: data.class_schedule.school_days.toString(),
        start_time: data.class_schedule.start_time.toLocaleTimeString(),
        end_time: data.class_schedule.end_time.toLocaleTimeString()
    }
    tableData.value.push(temp)

    console.log(scheduleData.value)
}

function submitData() {
    try {
        const result = await axios.post(
        'http://localhost:8080/class_mgmt/createClass',
        { ...classData.value },
        {
            headers: { Authorization: 'Bearer ' + authStore.token }
        }
        )
        console.log(result.data.message)
    } catch (error) {
        console.log(error)
    }

    
}
</script>

<template>
    <ContentPane header="Create Class">
        <div class="w-fit">
            <CreateClassForm :level="props.level" :formData="formData" @addForm="addForm"/>
        </div>
        
        <div class="bg-white rounded-md shadow-xl flex flex-col p-7 pt-4 flex-1">            
            <LearningStrandsTable :classData="tableData"/>

            <div class="flex justify-end">
                <Button
                    class="h-10 u-bg-green mr-4"
                    label="Submit"
                    icon="fa-solid fa-circle-check"
                    @click="submitData"
                />
                <Button class="h-10 ml-2 u-bg-red" label="Cancel" icon="fa-solid fa-circle-xmark" />
            </div>
        </div>
    </ContentPane>
</template>