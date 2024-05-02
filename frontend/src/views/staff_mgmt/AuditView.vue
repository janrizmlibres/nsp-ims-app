<script setup>
import ContentPane from '@/components/UI/ContentPane.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
</script>

<template>
  <ContentPane header="Audit Trails">
    <BaseCard>
      <div class="grid grid-cols-2">
        <div>
          <h2>Users</h2>
        </div>
        <div>
          <h2>Actions</h2>
        </div>
      </div>
    </BaseCard>
  </ContentPane>
</template>
