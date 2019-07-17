import * as HTML from './html-parser'

export function createExportStatement() {
  return 'export default'
}

export function sourceToString(source: string | Buffer): string {
  return source instanceof Buffer ? source.toString() : source
}

export function extractScript(document: HTML.Document): string {
  return document.reduce((acc, { type, name, attribs, children }) => {
    if (type === 'script' && name === 'script' && attribs && attribs.type === 'module' && children) {
      return acc + children.reduce((acc, { data = '' }) => acc + data, '')
    }
    return acc
  }, '')
}

export function filterDocument(document: HTML.Document) {
  const next = document.filter(({ type, name }) => {
    if (type === 'tag') return name === 'template'
    if (type === 'script') return false
    return true
  })
  return next
}
