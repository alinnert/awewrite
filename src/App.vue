<script setup lang="ts">
import AppClock from './app-frame/AppClock.vue'
import AppContent from './app-frame/AppContent.vue'
import AppFrame from './app-frame/AppFrame.vue'
import AppHeader from './app-frame/AppHeader.vue'
import AppLogo from './app-frame/AppLogo.vue'
import TextEditor from './text-editors/TextEditor.vue'
import AppSettings from './app-settings/AppSettings.vue'
</script>

<template>
  <AppFrame>
    <AppHeader>
      <template #left>
        <AppLogo></AppLogo>
      </template>
      <template #right>
        <AppClock></AppClock>
      </template>
    </AppHeader>
    <AppSettings />
    <AppContent>
      <TextEditor side="left"></TextEditor>
      <TextEditor side="right"></TextEditor>
    </AppContent>
  </AppFrame>
</template>

<style>
:root {
  --theme-color: oklch(0.45 0.1 0);
  --theme-app-background: var(--theme-color);
  --theme-panel-background: oklch(from var(--theme-color) calc(l * 0.7) c h);
  --theme-panel-border-color: oklch(from var(--theme-color) calc(l * 1.3) c h);
  --gap: 12px;
  --header-height: 40px;
  --settings-width: 400px;
  --panel-border-radius: 12px;
  --panel-transition-duration: 0.3s;
  --panel-transition-easing: cubic-bezier(0, 0.5, 0.5, 1);
}
</style>
