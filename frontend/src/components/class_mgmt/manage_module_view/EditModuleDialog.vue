<script setup>
// Presets
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import { useToast } from 'primevue/usetoast';
import { computed, ref, watch } from 'vue';
import { useConfirm } from 'primevue/useconfirm';

//  stores
import { useClassLearningStrandStore } from '@/stores/class_learning_strand';
import { onBeforeRouteLeave, useRouter } from 'vue-router';

const emit = defineEmits(['onUpdate', 'onUpdateDisplay'])
const props = defineProps(['id', 'data', 'state'])
const toast = useToast()
const confirm = useConfirm()
const router = useRouter()
const classLearningStrandStore = useClassLearningStrandStore()

const state = computed(() => props.state)
const module = ref()
const classLearningStrandId = computed(() => props.id)
const dates = ref([])
const leave = computed(() => Boolean(dates.value ? !dates.value.length : !dates.value))

watch(() => props.data, (data) => module.value = data)

async function updateModule() {
    try {
        const range = ref([])
        for (let date of dates.value) {
            const offset = date.getTimezoneOffset()
            date = new Date(date.getTime() - (offset*60*1000))
            range.value.push(date)
        }

        await classLearningStrandStore.updateModule(props.data.id, {
            distribution_date: range.value[0],
            retrieval_date: range.value[1],
        }).then(() => {
            classLearningStrandStore.getAllModules(classLearningStrandId.value).then((data) => {
                emit('onUpdate', data)
            })
        })

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Module updated successfully!',
            life: 3000
        })
        
        dates.value = []
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
    if (dates.value ? dates.value.length : dates.value) {
        confirm.require({
            message: 'Do you really want to leave? you have unsaved changes!',
            header: 'Redirect Confirmation',
            accept: () => {
                dates.value = []
                emit('onUpdateDisplay')
            }
        })
    } else {
        dates.value = []
        emit('onUpdateDisplay')
    }
}

onBeforeRouteLeave((to) => {
    if (leave.value) {
        return true
    }

    confirm.require({
        message: 'Do you really want to leave? you have unsaved changes!',
        header: 'Redirect Confirmation',
        accept: async () => {
            await router.push(to)
        }
    })

    return false
})
</script>

<template>
    <Dialog v-model:visible="state" modal header="Edit Module" :style="{ width: '20rem' }" :closable="false">
        <div class="flex flex-col gap-4 mb-4">
            <label>Distribution Date - Retrieval Date</label>
            <Calendar v-model="dates" id="calendar" showIcon showButtonBar iconDisplay="input" selectionMode="range" hideOnRangeSelection :manualInput="false" />
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Update" @click="updateModule"></Button>
            <Button type="button" label="Cancel" severity="danger" @click="cancel"></Button>
        </div>
    </Dialog>
</template>