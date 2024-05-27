<script setup>
import { ref } from 'vue'

const isInvalid = ref(false)

function inputEntered(value) {
  isInvalid.value = !value
}
</script>

<template>
  <slot :isInvalid="isInvalid" :inputEntered="inputEntered"></slot>
</template>
