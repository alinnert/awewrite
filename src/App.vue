<script setup lang="ts">
import { SettingsIcon } from 'lucide-vue-next'
import AppClock from './app-frame/AppClock.vue'
import AppContent from './app-frame/AppContent.vue'
import AppFrame from './app-frame/AppFrame.vue'
import AppHeader from './app-frame/AppHeader.vue'
import AppLogo from './app-frame/AppLogo.vue'
import AppSettings from './app-frame/AppSettings.vue'
import TextEditor from './text-editors/TextEditor.vue'
import { swapEditors } from './text-editors/textEditors.ts'

function handleSwapTextsClick() {
  swapEditors('left', 'right')
}
</script>

<template>
  <AppFrame>
    <AppHeader>
      <template #left>
        <AppLogo></AppLogo>
        <SettingsIcon />
        <div
          style="
            margin-inline: 8px;
            padding: 4px 12px;
            background: oklch(1 0 0 / 0.3);
            cursor: default;
            border-radius: 4px;
          "
          @click="handleSwapTextsClick"
        >
          Swap texts
        </div>
      </template>
      <template #right>
        <AppClock></AppClock>
      </template>
    </AppHeader>
    <AppSettings></AppSettings>
    <AppContent>
      <TextEditor side="left"></TextEditor>
      <TextEditor side="right"></TextEditor>
    </AppContent>
  </AppFrame>
</template>
