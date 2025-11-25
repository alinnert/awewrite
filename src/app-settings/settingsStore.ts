import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    isSettingsOpen: false,
  }),
  actions: {
    toggleSettings() {
      this.isSettingsOpen = !this.isSettingsOpen
    },
  },
})
