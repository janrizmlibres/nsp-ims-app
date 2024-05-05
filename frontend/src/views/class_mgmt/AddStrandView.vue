<script setup>
// Presets
import Button from 'primevue/button';
import { useConfirm } from "primevue/useconfirm";
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

// Custom
import ContentPane from '@/components/UI/ContentPane.vue'
import CreateClassForm from '@/components/class_mgmt/create_class_view/CreateClassForm.vue';
import LearningStrandsTable from '@/components/class_mgmt/create_class_view/LearningStrandsTable.vue';

//  stores
import { useClassStore } from '@/stores/class';

const toast = useToast()
const route = useRoute()
const router = useRouter()
const confirm = useConfirm();

const classStore = useClassStore()

const learningStrandData = ref([])
const tableData = ref([])

function addForm(strandData, strandScheduleData) {    
    const scheduleData = ref([])
    for (const schedule of strandScheduleData) {

        const start_time_hours = schedule.start_time.getHours()
        const start_time_minutes = schedule.start_time.getMinutes()
        const start_time = start_time_hours + ':' + start_time_minutes

        const end_time_hours = schedule.end_time.getHours()
        const end_time_minutes = schedule.end_time.getMinutes()
        const end_time = end_time_hours + ':' + end_time_minutes

        scheduleData.value.push({
            name: strandData.strand.name,
            days: schedule.school_days.toString(),
            start_time: start_time,
            end_time: end_time,
        })

        tableData.value.push({
            name: strandData.strand.name,
            teacher: strandData.volunteer.fullname,
            school_days: schedule.school_days.toString(),
            start_time: schedule.start_time.toLocaleTimeString(),
            end_time: schedule.end_time.toLocaleTimeString()
        })
    }

    learningStrandData.value.push({
        name: strandData.strand.name,
        teacher: strandData.volunteer.fullname,
        schedule: scheduleData.value
    })
}

async function submitData() {
    for (var learningStrand of learningStrandData.value) {
        try {
            await classStore.addLearningStrand(route.query.id, learningStrand)

            for (var schedule of learningStrand.schedule) {
                try {
                    await classStore.addSchedule(route.query.id, schedule)
                } catch (error) {
                    console.log(error.response.data.message);
                }
            }
        } catch (error) {
            toast.add({
                severity: 'error',
                summary: 'Duplicated Learning Strand',
                detail: error.response.data.message,
                life: 3000
            })
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
        <CreateClassForm @addForm="addForm"/>
 
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