export function getWordCount(text) {
  return (text.replace(/['";:,.?¿\-!¡]+/g, '').match(/\S+/g) || []).length
}