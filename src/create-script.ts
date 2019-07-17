import * as HTML from './html-parser'
import { minify, Options as MinifierOptions } from 'html-minifier'
import { Options } from './index'
import { createExportStatement } from './utils'

export const PARSER = 'HTMLModuleLoader_parser'
export const IMPORT_META_DOCUMENT = 'HTMLModuleLoader_importMetaDocument'

function createHTMLString(document: HTML.Document, options?: boolean | MinifierOptions) {
  let HTMLString = HTML.stringify(document)
  if (options) HTMLString = minify(HTMLString, options === true ? undefined : options)
  return HTMLString
}

export default function createScript(document: HTML.Document, options: Options): string {
  const exprt = createExportStatement()
  const HTMLString = createHTMLString(document, options.minify)
  const script = document.reduce((acc, { name, attribs, children }) => {
    if (name === 'script' && attribs && attribs.type === 'module' && children) {
      return acc + children.reduce((acc, { data = '' }) => acc + data, '')
    }
    return acc
  }, '')
  const parser = `
    const ${PARSER} = new DOMParser();
    const ${IMPORT_META_DOCUMENT} = ${PARSER}.parseFromString(\`${HTMLString}\`, 'text/html');
  `
  return `
    ${parser}
    ${script.replace('import.meta.document', IMPORT_META_DOCUMENT)}
    ${!script.includes(exprt) ? `${exprt} ${IMPORT_META_DOCUMENT};` : ''}
  `
}
