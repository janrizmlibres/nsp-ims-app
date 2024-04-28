<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref } from 'vue';

const selectedLevel = ref();
const schoolLevel = ref([
    { name: 'Grade School', code: 'Grade School' },
    { name: 'Junior High School', code: 'Junior High School' }
]);

const selectedStrand = ref();
const learningStrand = ref([
    { name: 'Mathematics', code: 'Mathematics' },
    { name: 'Science', code: 'Science' },
    { name: 'Understanding the Self and Society', code: 'Understanding the Self and Society' }
]);

const selectedStartTime = ref()
const selectedEndTime = ref()

const days = ref([
    {name: "M", key: "1"},
    {name: "T", key: "2"},
    {name: "W", key: "3"},
    {name: "TH", key: "4"},
    {name: "F", key: "5"},
    {name: "S", key: "6"},
]);

const selectedDays = ref(['Marketing']);

import { useClassesStore } from '@/stores/classes';
import { useRouter } from 'vue-router';

const router = useRouter()
const classesStore = useClassesStore()
</script>

<template>
    <ContentPane header="Create Class">
        <div class="flex flex-col bg-white rounded-md shadow-xl p-8 w-fit mb-8">
            <span class="font-semibold text-2xl u-txt-active mb-8">Add a Learning Strand</span>
            <div class="flex flex-row">
                <!-- select school level and learning strand -->
                <div class="flex flex-col mr-24">
                    <div class="flex flex-col justify-between mb-8">
                        <span class="mr-3 u-txt-active">School Level</span>
                        <span class="relative">
                            <Dropdown v-model="selectedLevel" :options="schoolLevel" optionLabel="name" placeholder="Select a Level" class="w-full md:w-[14rem]" />
                        </span>
                    </div>

                    <div class="flex flex-col justify-between">
                        <span class="mr-3 u-txt-active">Learning Strand</span>
                        <span class="relative">
                            <Dropdown v-model="selectedStrand" :options="learningStrand" optionLabel="name" placeholder="Select a Level" class="w-full md:w-[14rem]" />
                        </span>
                    </div>
                </div>

                <!-- select days and time -->
                <div class="flex flex-col">
                    <div class="grid grid-flow-col mb-8">
                        <span class="mr-3 u-txt-active">School Days</span>
                        <div class="grid grid-cols-3 card gap-3">
                            <div v-for="day of days" :key="day.key" class="flex items-center">
                                <Checkbox v-model="selectedDays" :inputId="day.key" name="day" :value="day.name" class="mr-2"/>
                                <label :for="day.key">{{ day.name }}</label>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <span class="mr-3 u-txt-active">Start Time</span>
                            <div>
                                <Calendar id="calendar-timeonly" v-model="selectedStartTime" timeOnly hourFormat="12" />
                            </div>
                        </div>
                        <div>
                            <span class="mr-3 u-txt-active">End Time</span>
                            <div>
                                <Calendar id="calendar-timeonly" v-model="selectedEndTime" timeOnly hourFormat="12" />
                            </div>
                        </div>
                    </div>
                    <Button icon="fa fa-plus" label="Add" class="col-start-2 inset-y-0 right-0 self-end" />
                </div>
            </div>
        </div>
        <div class="bg-white rounded-md shadow-xl flex flex-col p-7 pt-12 flex-1">            
            <DataTable 
                :value="classesStore.data" dataKey="id" 
                :sortField="Object.keys(classesStore.data[0])[0]" :sortOrder="-1" removableSort 
                resizableColumns columnResizeMode="fit"
                v-model:filters="classesStore.filters" :globalFilterFields="classesStore.globalFilters"
                v-model:selection="classesStore.primarySelection" selectionMode="single" 
                @rowSelect="showModule" @rowUnselect="{}"
                :ptOptions="{mergeProps:true}"
                :pt="{
                    root: {
                        class: ['flex flex-col h-full pt-2 justify-between overflow-auto mb-8']
                    },
                    column: {
                        headercell: ({ context, props }) => ({
                            class: [
                                'font-medium',
                                {
                                'space-nowrap border-y bg-clip-padding': context.resizable
                                // Resizable
                                },
                                // Color
                                (props.sortable === '' || props.sortable) && context.sorted ? 'bg-white u-txt-active' : 'bg-white u-txt-active',
                                {'hover:bg-surface-50': context.sorted}
                            ]
                        }),
                            sorticon: ({ context }) => ({
                                class: ['ml-2', context.sorted ? 'u-legend-txt-color dark:text-white/80' : 'u-txt-active dark:text-white/70']
                        }),
                            bodycell: {class: 'py-3 '}
                    },
                    bodyrow: ({ context, props }) => ({
                        class: [
                            { 'u-bg-pcolor text-surface-100 dark:bg-primary-400/30': context.selected },
                            { 'bg-surface-0 text-surface-600 dark:bg-surface-800': !context.selected },
                            { 'font-bold bg-surface-0 dark:bg-surface-800': props.frozenRow },
                            // State
                            { 'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-transparent': context.selectable },
                            { 'hover:u-bg-pcolor hover:text-white': props.selectionMode && !context.selected },
                            // Misc
                            { 'cursor-pointer': props.selectionMode }
                        ]
                    })
                }"
            >
                <template #empty> <div class="text-center">No records found.</div> </template>
                <template #loading> <div class="text-center">Loading class records. Please wait.</div> </template>

                <Column v-for="col of classesStore.dataColumns" :key="col.field" :field="col.field" :header="col.header" sortable></Column>
            </DataTable>

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