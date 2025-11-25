<script setup lang="ts"></script>

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
  grid-template-rows: var(--header-height) 1fr;
  font-family: sans-serif;
  background: var(--theme-app-background);
}
</style>
