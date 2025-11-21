<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { registerEditor, textEditors } from './textEditors.ts'
import { MaximizeIcon } from 'lucide-vue-next'

type Props = {
  side: 'left' | 'right'
}

const { side } = defineProps<Props>()

const cssLeftValue = computed((): string => {
  return side === 'left' ? '0' : '50%'
})

const cssRightValue = computed((): string => {
  return side === 'right' ? '0' : '50%'
})

registerEditor(side)
const storage = computed(() => textEditors[side])
if (storage.value === undefined) {
  throw new Error('')
}

const target = computed(() => storage.value?.targetIdentifier ?? '<none>')

const content = ref(storage.value.read())

watch(storage, (storage) => {
  if (storage === undefined) return
  content.value = storage.read()
})

watch(content, () => {
  if (storage.value === undefined) return
  storage.value.write(content.value)
})

const characterCount = computed(() => {
  const count = content.value.length
  return count + (count === 1 ? ' character' : ' characters')
})

const wordCount = computed(() => {
  const count = (
    content.value.replace(/['";:,.?¿\-!¡]+/g, '').match(/\S+/g) || []
  ).length
  return count + (count === 1 ? ' word' : ' words')
})
</script>

<template>
  <div class="text-editor">
    <div class="width-container">
      <div class="header">
        <div><strong>target:</strong> {{ target }}</div>
        <div class="tools">
          <MaximizeIcon />
        </div>
      </div>
      <textarea class="textarea" v-model="content"></textarea>
      <div class="footer">
        <div>{{ characterCount }} / {{ wordCount }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-editor {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: v-bind('cssLeftValue');
  right: v-bind('cssRightValue');
}

.width-container {
  flex-basis: 400px;
  flex-shrink: 1;
  flex-grow: 0;
  display: grid;
  grid-template-rows: auto 1fr auto;
  position: relative;
  border: 1px solid silver;
  margin: 10px;
  border-radius: 4px;
  background: oklch(1 0 0 / 0.3);

  &:focus-within {
    box-shadow: 0 0 0 4px oklch(1 0 0 / 0.5);
  }
}

.header,
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: silver;
  padding: 4px 8px;
}

.tools {
  line-height: 0;
}

.textarea {
  resize: none;
  border: none;
  background: transparent;
  padding: 8px;

  &:focus {
    outline: none;
  }
}
</style>
