<script setup>
// Presets
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import { useToast } from 'primevue/usetoast';
import { computed, ref } from 'vue';

//  stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';

const emit = defineEmits(['onUpdate'])
const props = defineProps(['id'])

const toast = useToast()
const classLearningStrandStore = useClassLearningStrandStore()

const value = ref(null);
const dates = ref(null);
const classLearningStrandId = computed(() => props.id)

async function addModule() {
    if (!value.value || !dates.value || Object.values(dates.value).some((element) => element === null) ) {
        toast.add({
            severity: 'error',
            summary: 'Incomplete Form',
            detail: "Please fill all necessary information",
            life: 3000
        })

        return
    }

    const range = ref([])
    try {
        for (let date of dates.value) {
            const offset = date.getTimezoneOffset()
            date = new Date(date.getTime() - (offset*60*1000))
            range.value.push(date)
        }
        
        await classLearningStrandStore.addModule(classLearningStrandId.value, {
            title: value.value,
            distriDate: range.value[0],
            retriDate: range.value[1]
        })

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Module added successfully!',
            life: 3000
        })
    } catch(error) {
        toast.add({
            severity: 'error',
            summary: 'Duplicated Module Title',
            detail: error.response.data.message,
            life: 3000
        })
    }
    classLearningStrandStore.getAllModules(classLearningStrandId.value).then((data) => {
        emit('onUpdate', data)
    })
    
    value.value = null;
    dates.value = null;
    classLearningStrandStore.showHideAddModuleDialog()
}
</script>

<template>
    <Dialog v-model:visible="classLearningStrandStore.visibleAddModuleDialog" modal header="Add Module" :style="{ width: '20rem' }">
        <span class="p-text-secondary block mb-5">Fill up necessary information.</span>
        <div class="flex flex-col mb-4">
            <label>Title</label>
            <InputText id="username" v-model="value" aria-describedby="username-help" />
        </div>
        <div class="flex flex-col gap-4 mb-4">
            <div class="flex flex-col">
                <label>Distribution Date - Retrieval Date</label>
                <Calendar v-model="dates" id="calendar" showIcon iconDisplay="input" selectionMode="range" hideOnRangeSelection :manualInput="false" />
            </div>
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Add" @click="addModule"></Button>
            <Button type="button" label="Cancel" severity="danger" @click="classLearningStrandStore.showHideAddModuleDialog"></Button>
        </div>
    </Dialog>
</template>