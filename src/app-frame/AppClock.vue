<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const time = ref(getTime())

const interval = setInterval(() => {
  time.value = getTime()
}, 1_000)

function getTime(): string {
  return new Date().toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  })
}

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="clock">{{ time }}</div>
</template>

<style scoped>
.clock {
  font-weight: bold;
}
</style>
