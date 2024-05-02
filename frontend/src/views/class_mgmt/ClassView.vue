<script setup>
import ClassInfoView from './ClassInfoView.vue';
import AddStrandView from './AddStrandView.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const currentComponent = computed(() => {
    return route.query.action == null ? ClassInfoView : AddStrandView
})
</script>

<template>
    <component :is="currentComponent"></component>
</template>

<style>
</style>