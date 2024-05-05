<script setup>
import StrandInfoView from './StrandInfoView.vue';
import GradesView from './GradesView.vue';
import AttendanceView from './AttendanceView.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const currentComponent = computed(() => {
    if (route.query.action == 'viewGrades') return GradesView
    else if (route.query.action == 'viewAttendance') return AttendanceView
    else return StrandInfoView
})
</script>

<template>
    <component :is="currentComponent"></component>
</template>

<style>
</style>