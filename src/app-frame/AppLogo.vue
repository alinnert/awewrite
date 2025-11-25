<script setup lang="ts">
import { useSettingsStore } from '@/app-settings/settingsStore'

const settingsStore = useSettingsStore()
</script>

<template>
  <div class="logo" @click="settingsStore.toggleSettings()">AWE.write</div>
</template>

<style scoped>
.logo {
  font-weight: bold;
  padding-inline: 8px;
  user-select: none;
  cursor: default;
}
</style>
