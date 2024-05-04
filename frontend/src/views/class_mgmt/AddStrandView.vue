<script setup>
// Presets
import Button from 'primevue/button';
import { useConfirm } from "primevue/useconfirm";
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Custom
import ContentPane from '@/components/UI/ContentPane.vue'
import CreateClassForm from '@/components/class_mgmt/create_class_view/CreateClassForm.vue';
import LearningStrandsTable from '@/components/class_mgmt/create_class_view/LearningStrandsTable.vue';

//  stores
import { useClassStore } from '@/stores/class';


const route = useRoute()
const router = useRouter()
const confirm = useConfirm();

const classStore = useClassStore()

const learningStrandData = ref([])
const scheduleData = ref([])
const tableData = ref([])

function addForm(strandData, strandScheduleData) {
    const start_time_hours = strandScheduleData.start_time.getHours()
    const start_time_minutes = strandScheduleData.start_time.getMinutes()
    const start_time = start_time_hours + ':' + start_time_minutes

    const end_time_hours = strandScheduleData.end_time.getHours()
    const end_time_minutes = strandScheduleData.end_time.getMinutes()
    const end_time = end_time_hours + ':' + end_time_minutes

    learningStrandData.value.push({
        name: strandData.strand.name,
        teacher: strandData.volunteer.fullname
    })

    scheduleData.value.push({
        name: strandData.strand.name,
        days: strandScheduleData.school_days.toString(),
        start_time: start_time,
        end_time: end_time,
    })

    tableData.value.push({
        name: strandData.strand.name,
        teacher: strandData.volunteer.fullname,
        school_days: strandScheduleData.school_days.toString(),
        start_time: strandScheduleData.start_time.toLocaleTimeString(),
        end_time: strandScheduleData.end_time.toLocaleTimeString()
    })
}

async function submitData() {
    for (var learningStrand of learningStrandData.value) {
        try {
            await classStore.addLearningStrand(route.query.id, learningStrand)
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    for (var schedule of scheduleData.value) {
        try {
            await classStore.addSchedule(route.query.id, schedule)
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    router.back()
}

const cancel = () => {
    confirm.require({
        group: 'actionGuard',
        message: ' Are you sure you want to cancel?',
        header: 'Confirmation',
        accept: () => {
            router.back()
        },
        reject: () => {}
    });
};
</script>

<template>
    <ContentPane header="Add Learning Strands">
        <div class="w-fit">
            <CreateClassForm @addForm="addForm"/>
        </div>
        
        <div class="bg-white rounded-md shadow-xl flex flex-col p-7 pt-4 flex-1">            
            <LearningStrandsTable :classData="tableData"/>

            <div class="flex justify-end">
                <Button v-if="tableData.length != 0"
                    class="mr-4"
                    label="Submit"
                    icon="fa-solid fa-circle-check"
                    @click="submitData"
                />
                <Button v-else
                    class="mr-4"
                    label="Submit"
                    icon="fa-solid fa-circle-check"
                    disabled
                />
                <Button icon="fa-solid fa-circle-xmark" label="Cancel" class="ml-2" @click="cancel" severity="danger" />
            </div>
        </div>
    </ContentPane>
</template>