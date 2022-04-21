import { getWordCount } from './getWordCount.js'

export function updateWordCounter() {
  const counterElement = $('#word-counter')
  const leftCounter = getWordCount($('#leftTextarea').val())
  const rightCounter = getWordCount($('#rightTextarea').val())

  counterElement.text(
    'Words: ' +
      leftCounter.toLocaleString() +
      ' / ' +
      rightCounter.toLocaleString(),
  )
}
