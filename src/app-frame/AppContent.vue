<script setup lang="ts">
import { useSettingsStore } from '@/app-settings/settingsStore'

const settingsStore = useSettingsStore()
</script>

<template>
  <div
    class="content"
    :class="{ 'is-settings-open': settingsStore.isSettingsOpen }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.content {
  position: relative;
  transition: margin var(--panel-transition-duration)
    var(--panel-transition-easing);

  &.is-settings-open {
    margin-left: calc(var(--settings-width) + var(--gap));
  }
}
</style>
