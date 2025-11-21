<script setup lang="ts"></script>

<template>
  <div class="app-header">
    <div class="slot left">
      <slot name="left"></slot>
    </div>
    <div class="slot right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style scoped>
.app-header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  padding: 8px;
  color: white;
}

.slot {
  display: flex;
  align-items: center;
}

.left {
  grid-column-start: 1;
}

.right {
  grid-column-start: 3;
}
</style>
