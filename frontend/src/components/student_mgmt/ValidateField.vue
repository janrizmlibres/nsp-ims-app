<script setup>
import { ref } from 'vue'

const props = defineProps({
  isInvalid: {
    type: Boolean,
    default: false
  }
})

const isInvalid = ref(props.isInvalid)

function inputEntered(value) {
  isInvalid.value = !value
}
</script>

<template>
  <slot :isInvalid="isInvalid" :inputEntered="inputEntered"></slot>
</template>
