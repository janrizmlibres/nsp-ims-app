<script setup>
import Divider from 'primevue/divider';
import StrandCard from './StrandCard.vue';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { useClassStore } from '@/stores/class';

const props = defineProps(['classId'])
const router = useRouter()
const classStore = useClassStore()

function showAddStrandForm() {
    router.push({name: 'add-learning-strand', query: {id: props.classId}})
}

    console.log(classStore.allStrands)
</script>

<template>
    <div class="mb-12">
        <div class="bg-transparent border-none flex flex-row gap-x-6 items-center px-4">
            <div class="u-txt-active font-semibold text-3xl content-center">Learning Strands</div>
            <div class="relative mr-2">
                <Button type="button" icon="fa fa-plus" label="Add" @click="showAddStrandForm" aria-haspopup="true" aria-controls="overlay_menu" />
            </div>
        </div>
        <Divider class="before:border-t before:border-surface-400"/>
        
        <div class="grid lg:grid-cols-3 md:grid-cols-1 gap-12 p-4">
            <StrandCard v-for="learningStrand of classStore.allStrands" :key="learningStrand.teacher" :title="learningStrand.learning_strand.name" :teacher="learningStrand.teacher"/>
        </div>
    </div>
</template>

<style>
</style>