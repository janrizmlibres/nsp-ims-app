<script setup>
// Presets
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
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
const session = ref()
const classLearningStrandId = computed(() => props.id)

watch(() => props.data, (data) => session.value = data)

async function updateSession() {
    try {
        await classLearningStrandStore.updateSession(props.data.id, {remarks: session.value.remarks})
        classLearningStrandStore.getAllSessions(classLearningStrandId.value).then((data) => {
            emit('onUpdate', data)
        })

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Session updated successfully',
            life: 3000
        })
    } catch(error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail:"Unexpected error encountered.",
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
    <Dialog v-model:visible="state" modal header="Edit Session" :style="{ width: '20rem' }" :closable="false">
        <div class="flex flex-col gap-4 mb-4">
            <div class="flex flex-col">
                <label>Remarks</label>
                <Textarea v-model="session.remarks" rows="5" cols="30" />
            </div>
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Update" @click="updateSession"></Button>
            <Button type="button" label="Cancel" severity="danger" @click="cancel"></Button>
        </div>
    </Dialog>
</template>