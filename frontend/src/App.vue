<script setup>
import Button from 'primevue/button'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
</script>

<template>
  <div class="p-4">
    <!-- Example PrimeVue component -->
    <Button label="Submit" />

    <!-- Example element styled with Tailwind -->
    <h1 class="text-3xl font-bold underline">Hello world!</h1>

    <!-- Example icon from Font Awesome -->
    <FontAwesomeIcon :icon="faEnvelope" size="lg" />
  </div>
</template>
