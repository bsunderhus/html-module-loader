import * as HTML from './html-parser'
import { Options } from './index'

export function createExportStatement({ esModule }: Options) {
  return esModule ? 'export default' : 'module.exports ='
}

export function sourceToString(source: string | Buffer): string {
  return source instanceof Buffer ? source.toString() : source
}

export function filterDocument(document: HTML.Document) {
  const next = document.filter(({ type, attribs, children, name }) => {
    if (type === 'tag') return name === 'template'
    if (type === 'script') return name === 'script' && attribs && attribs.type === 'module' && children
    return true
  })
  return next
}
