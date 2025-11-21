import { texts } from './textEditors'

export function switchTexts() {
  const leftText = texts.leftText$.value
  const rightText = texts.rightText$.value
  texts.leftText$.set(rightText)
  texts.rightText$.set(leftText)
}
