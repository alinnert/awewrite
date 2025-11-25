<script setup lang="ts">
import { MaximizeIcon } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { useTextEditorsStore } from './textEditorsStore'
type Props = {
  side: 'left' | 'right'
}

const { side } = defineProps<Props>()

const textEditorsStore = useTextEditorsStore()

const cssLeftValue = computed((): string => {
  return side === 'left' ? '0' : '50%'
})

const cssRightValue = computed((): string => {
  return side === 'right' ? '0' : '50%'
})

textEditorsStore.newFile(side)

const storage = computed(() => textEditorsStore.editors[side][0])
const targetIdentifier = computed(
  () => storage.value?.targetIdentifier ?? '<none>',
)
const text = ref(storage.value?.read() ?? '')

watch(storage, (storage) => {
  if (storage === undefined) return
  text.value = storage.read()
})

watch(text, (text) => {
  if (storage.value === undefined) return
  storage.value.write(text)
})

const characterCount = computed(() => {
  const count = text.value.length
  return count + (count === 1 ? ' character' : ' characters')
})

const wordCount = computed(() => {
  const matches = text.value.replace(/['";:,.?¿\-!¡]+/g, '').match(/\S+/g) ?? []
  return matches.length + (matches.length === 1 ? ' word' : ' words')
})
</script>

<template>
  <div class="text-editor">
    <div class="width-container">
      <div class="header">
        <div><strong>target:</strong> {{ targetIdentifier }}</div>
        <div class="tools">
          <MaximizeIcon />
        </div>
      </div>
      <textarea class="textarea" v-model="text"></textarea>
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
  border: 1px solid var(--theme-panel-border-color);
  margin: 0 var(--gap) var(--gap);
  border-radius: var(--panel-border-radius);
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

.header {
  border-top-left-radius: var(--panel-border-radius);
  border-top-right-radius: var(--panel-border-radius);
}

.footer {
  border-bottom-left-radius: var(--panel-border-radius);
  border-bottom-right-radius: var(--panel-border-radius);
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
