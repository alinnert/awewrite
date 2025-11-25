<script setup lang="ts">
import { XIcon } from 'lucide-vue-next'
import { useSettingsStore } from './settingsStore'

const settingsStore = useSettingsStore()
</script>

<template>
  <div
    class="app-settings"
    :class="{ 'is-open': settingsStore.isSettingsOpen }"
  >
    <XIcon class="close-button" @click="settingsStore.isSettingsOpen = false" />
  </div>
</template>

<style scoped>
.app-settings {
  position: absolute;
  top: var(--header-height);
  left: calc((var(--settings-width) + 2 * var(--gap)) * -1);
  bottom: var(--gap);
  width: var(--settings-width);
  background-color: var(--theme-panel-background);
  border-radius: var(--panel-border-radius);
  border: 1px solid var(--theme-panel-border-color);
  z-index: 100;
  transition: left var(--panel-transition-duration)
    var(--panel-transition-easing);

  &.is-open {
    left: var(--gap);
  }
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
