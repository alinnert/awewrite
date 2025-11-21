import { texts } from './textEditors.ts'

export function clearTexts() {
  texts.leftText$.set('')
  texts.rightText$.set('')
}
