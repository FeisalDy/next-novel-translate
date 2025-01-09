export function capitalizeSentences (text: string): string {
  return text
    .replace(/\r\n/g, '<br />')
    .replace(/(^|\.|\?|\!)\s*(<br \/>)?\s*([a-z])/g, (_, p1, p2, p3) => {
      return `${p1}${p2 || ''} ${p3.toUpperCase()}`
    })
    .trim()
}
