<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import { useStrandStore } from '@/stores/strand';
import { ref } from 'vue';

const strandStore = useStrandStore()

const days = ref([
    {name: "M", key: "1"},
    {name: "T", key: "2"},
    {name: "W", key: "3"},
    {name: "TH", key: "4"},
    {name: "F", key: "5"},
    {name: "S", key: "6"},
]);
</script>

<template>
    <Dialog v-model:visible="strandStore.visibleDialog" modal header="Edit Information" :style="{ width: '20rem' }">
        <span class="p-text-secondary block mb-5">Update Strand Information.</span>
        <div class="flex flex-col mb-4">
            <span class="mr-3 u-txt-active">Teacher</span>
            <span class="relative">
                <Dropdown placeholder="Select a Teacher" class="w-full md:w-[14rem]" />
            </span>
        </div>
        <div class="flex flex-col mb-4">
            <span class="mr-3 u-txt-active">School Days</span>
            <div class="grid grid-cols-3 gap-3">
                <div v-for="day of days" :key="day.key" class="flex items-center">
                    <Checkbox :inputId="day.key" name="day" :value="day.name" class="mr-2"/>
                    <label :for="day.key">{{ day.name }}</label>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-4 mb-4">
            <div>
                <span class="mr-3 u-txt-active">Start Time</span>
                <div>
                    <Calendar id="calendar-timeonly" timeOnly hourFormat="12" showIcon iconDisplay="input" icon="pi pi-clock cursor-pointer" />
                </div>
            </div>
            <div>
                <span class="mr-3 u-txt-active">End Time</span>
                <div>
                    <Calendar id="calendar-timeonly" timeOnly hourFormat="12" showIcon iconDisplay="input" icon="pi pi-clock cursor-pointer" />
                </div>
            </div>
        </div>
        <div class="flex justify-content-end gap-2">
            <Button type="button" label="Save" @click="strandStore.showHideDialog"></Button>
            <Button type="button" label="Cancel" severity="danger" @click="strandStore.showHideDialog"></Button>
        </div>
    </Dialog>
</template>