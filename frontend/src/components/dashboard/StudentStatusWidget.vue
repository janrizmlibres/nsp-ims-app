<script setup>
import Card from 'primevue/card';
import Button from 'primevue/button';
import { ref, watch } from 'vue';

const props = defineProps(['data', 'title', 'icon', 'bgColor'])
const total = ref(0)
const active = ref(0)
const inactive = ref(0)
const drop = ref(0)

watch(() => props.data, (data) => {
    total.value = data.length
    active.value = data.filter(enrollment => enrollment.status === 'Active').length
    inactive.value = data.filter(enrollment => enrollment.status === 'Inactive').length
    drop.value = data.filter(enrollment => enrollment.status === 'Drop').length
}, {immediate: true})
</script>

<template>
    <Card class="!rounded-2xl shadow-2xl"
        :pt="{body:{class:['h-full flex flex-col !p-0 ']}, content: {class:['flex-1 p-10 !pt-12']}, footer: {class:[`${props.bgColor} !rounded-b-xl h-12 !p-4 !px-6 shadow-inner !font-normal`]}}" :ptOptions="{mergeProps: true}">
        <template #content>
            <div class="flex flex-row gap-12">
                <label class="text-6xl font-medium u-txt-active">{{ total }}</label>
                    <div class="flex flex-col justify-between gap-2">
                        <label class="text-2xl font-semibold">{{ props.title }}</label>
                        <div class="flex flex-row gap-4">
                            <div class="flex flex-col">
                                <span class="flex flex-row gap-1 items-center">
                                    <i class="fa fa-circle-check" />
                                    <label>Active</label>
                                </span>
                                <label>{{ active }}</label>
                            </div>
                            <div class="flex flex-col">
                                <span class="flex flex-row gap-1 items-center">
                                    <i class="fa fa-triangle-exclamation" />
                                    <label>Inactive</label>
                                </span>
                                <label>{{ inactive }}</label>
                            </div>
                            <div class="flex flex-col">
                                <span class="flex flex-row gap-1 items-center">
                                    <i class="fa fa-square-xmark" />
                                    <label>Inactive</label>
                                </span>
                                <label>{{ drop }}</label>
                            </div>
                        </div>
                    </div>
            </div>
        </template>
        <template #footer>
        </template>
    </Card>
</template>