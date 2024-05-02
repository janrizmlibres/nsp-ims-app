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

function addForm(data) {
    learningStrandData.value.push({
        name: data.name,
        teacher: data.teacher
    })

    for (var school_day of data.class_schedule.school_days) {
        scheduleData.value.push({
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
        group: 'cancel',
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