<script setup>
import StudentsTable from '@/components/class_mgmt/manage_student_view/StudentsTable.vue';

const props = defineProps(['classLevel'])
</script>

<template>
    <StudentsTable :classLevel="props.classLevel" />
</template>