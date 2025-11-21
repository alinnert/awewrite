<script setup lang="ts">
</script>

<template>
  <div class="frame">
    <slot></slot>
  </div>
</template>

<style scoped>
.frame {
  position: fixed;
  inset: 0;
  display: grid;
  grid-template-rows: auto 1fr;
  font-family: sans-serif;
  background: oklch(0.45 0.1 0);
}
</style>
