<script setup>
defineProps(['staffs'])
</script>

<template>
  <div class="pl-8 pt-2 font-medium">
    <p>
      Record(s) count: <span class="u-txt-red"> {{ staffs.length }} </span>
    </p>
  </div>
</template>
