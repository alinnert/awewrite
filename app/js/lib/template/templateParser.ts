export function parseTemplate(template: string, data: Record<string, unknown>): string {
  let result = template

  type DataEntry = [key: string, value: unknown]

  const sortedEntries: DataEntry[] = Object.entries(data).toSorted((item1, item2) => {
    if (typeof item1[1] === 'boolean' && typeof item2[1] !== 'boolean') {
      return -1
    }
    return 0
  })

  for (const [key, value] of sortedEntries) {
    switch (typeof value) {
      case 'boolean': {
        result = processBoolean(result, key, value)
        break
      }
      case 'string': {
        result = processString(result, key, value)
        break
      }
      case 'bigint':
      case 'number': {
        result = processString(result, key, value.toString())
        break
      }
    }
  }

  return result
}

function processString(template: string, key: string, value: string): string {
  const regExp = new RegExp(`{{[ \n\t]*${key}[ \n\t]*}}`, 'g')
  return template.replaceAll(regExp, value)
}

function processBoolean(template: string, key: string, value: boolean): string {
  const regExp = new RegExp(
    `{{[ \\n\\t]*if [ \\n\\t]*${key}[ \\n\\t]*}}([\\s\\S]*?){{[ \\n\\t]*endif[ \\n\\t]*}}`,
    'g'
  )
  return template.replaceAll(regExp, value ? '$1' : '')
}
