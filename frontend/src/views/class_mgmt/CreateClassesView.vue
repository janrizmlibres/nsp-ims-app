<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import CreateClassForm from '@/components/class_mgmt/create_class_view/CreateClassForm.vue';
import LearningStrandsTable from '@/components/class_mgmt/create_class_view/LearningStrandsTable.vue';
import { useClassStore } from '@/stores/class';
import Button from 'primevue/button';

import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
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

const learningStrandData = ref([])
const scheduleData = ref([])
const tableData = ref([])

function addForm(data) {
    learningStrandData.value.push({
        classId: route.query.id,
        name: data.name,
        teacher: data.teacher
    })

    for (var school_day of data.class_schedule.school_days) {
        scheduleData.value.push({
            classId: route.query.id,
            name: data.name,
            day: school_day,
            start_time: data.class_schedule.start_time.getUTCHours (),
            end_time: data.class_schedule.end_time.getUTCHours (),
        })
    }

    tableData.value.push({
        name: data.name,
        teacher: data.teacher,
        school_days: data.class_schedule.school_days.toString(),
        start_time: data.class_schedule.start_time.toLocaleTimeString(),
        end_time: data.class_schedule.end_time.toLocaleTimeString()
    })
}

async function submitData() {
    for (var learningStrand of learningStrandData.value) {
        try {
            await classStore.addLearningStrand(learningStrand)
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    for (var schedule of scheduleData.value) {
        try {
            console.log(schedule);
            await classStore.addSchedule(schedule)
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    formData.value = {
        name: '',
        teacher: '',
        class_schedule: {
            school_days: [],
            start_time: ref(),
            end_time: ref()
        }
    }

    tableData.value.length = 0
}
</script>

<template>
    <ContentPane header="Add Learning Strands">
        <div class="w-fit">
            <CreateClassForm :id="route.query.id" :formData="formData" @addForm="addForm"/>
        </div>
        
        <div class="bg-white rounded-md shadow-xl flex flex-col p-7 pt-4 flex-1">            
            <LearningStrandsTable :classData="tableData"/>

            <div class="flex justify-end">
                <Button v-if="tableData.length != 0"
                    class="h-10 u-bg-green mr-4"
                    label="Submit"
                    icon="fa-solid fa-circle-check"
                    @click="submitData"
                />
                <Button v-else
                    class="h-10 u-bg-green mr-4"
                    label="Submit"
                    icon="fa-solid fa-circle-check"
                    disabled
                />
                <Button class="h-10 ml-2 u-bg-red" label="Cancel" icon="fa-solid fa-circle-xmark" />
            </div>
        </div>
    </ContentPane>
</template>