import { getWordCount } from './getWordCount.js'

export function updateWordCounter() {
  const counterElement = document.getElementById('word-counter')

  const leftTextarea = /** @type HTMLTextAreaElement */ (
    document.getElementById('leftTextarea')
  )

  const rightTextarea = /** @type HTMLTextAreaElement */ (
    document.getElementById('rightTextarea')
  )

  const leftCounter = getWordCount(leftTextarea.value)
  const rightCounter = getWordCount(rightTextarea.value)

  counterElement.textContent = `Words [ ${leftCounter} ] [ ${rightCounter} ]`
}
