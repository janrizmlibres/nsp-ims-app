<script setup>
// Presets
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import Tag from 'primevue/tag';
import { useToast } from 'primevue/usetoast';
import { computed, ref, watch } from 'vue';
import { useConfirm } from 'primevue/useconfirm';

//  stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';

const emit = defineEmits(['onUpdate', 'onUpdateDisplay'])
const props = defineProps(['id', 'data', 'state'])
const toast = useToast()
const classLearningStrandStore = useClassLearningStrandStore()
const confirm = useConfirm()
const state = computed(() => props.state)
const module = ref()
const classLearningStrandId = computed(() => props.id)
const dates = ref([])

watch(() => props.data, (data) => module.value = data)
const statuses = ref([
    { label: 'Finished', value: true },
    { label: 'Unfinished', value: false }
]);

const getStatusLabel = (status) => {
    switch (status) {
        case true:
            return 'success';

        case false:
            return 'warning';

        default:
            return null;
    }
};

async function updateModule() {
    try {
        const range = ref([])
        for (let date of dates.value) {
            const offset = date.getTimezoneOffset()
            date = new Date(date.getTime() - (offset*60*1000))
            range.value.push(date)
        }

        await classLearningStrandStore.updateModule(props.data.id, {
            title: props.data.title,
            distribution_date: range.value[0],
            retrieval_date: range.value[1],
            status: props.data.status
        })

        classLearningStrandStore.getAllModules(classLearningStrandId.value).then((data) => {
            emit('onUpdate', data)
        })

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Module updated successfully!',
            life: 3000
        })
    } catch(error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unexpected error encountered.',
            life: 3000
        })
    }
};

async function cancel() {
    confirm.require({
        message: 'Do you really want to leave? you have unsaved changes!',
        header: 'Redirect Confirmation',
        accept: () => {emit('onUpdateDisplay')}
    })
}
</script>

<template>
    <Dialog v-model:visible="state" modal header="Edit Module" :style="{ width: '20rem' }" :closable="false">
        <div class="flex flex-col mb-4">
            <label>Title</label>
            <InputText id="module-title" v-model="module.title" aria-describedby="module-title-help" />
        </div>
        <div class="flex flex-col gap-4 mb-4">
            <div class="flex flex-col">
                <label>Distribution Date - Retrieval Date</label>
                <Calendar v-model="dates" id="calendar" showIcon iconDisplay="input" selectionMode="range" hideOnRangeSelection :manualInput="false" />
                <small>Optional</small>
            </div>
        </div>
        <div class="flex flex-col mb-4">
            <label>Status</label>
            <Dropdown v-model="module.status" :options="statuses" optionLabel="label" optionValue="value" autofocus >
                <template #value="slotProps">
                    <Tag :value="slotProps.value ? 'Finished' : 'Unfinished'" :severity="getStatusLabel(slotProps.value)" />
                </template>
                <template #option="slotProps">
                    <Tag :value="slotProps.option.value ? 'Finished' : 'Unfinished'" :severity="getStatusLabel(slotProps.option.value)" />
                </template>
            </Dropdown>
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Add" @click="updateModule"></Button>
            <Button type="button" label="Cancel" severity="danger" @click="cancel"></Button>
        </div>
    </Dialog>
</template>