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

export default function createScript(document: HTML.Document, rawScript: string, options: Options): string {
  const exprt = createExportStatement()
  const HTMLString = createHTMLString(document, options.minify)
  const parser = `
    const ${PARSER} = new DOMParser();
    const ${IMPORT_META_DOCUMENT} = ${PARSER}.parseFromString(\`${HTMLString}\`, 'text/html');
  `
  return `
    ${parser}
    ${rawScript.replace(/import\.meta\.document/g, IMPORT_META_DOCUMENT)}
    ${!rawScript.includes(exprt) ? `${exprt} ${IMPORT_META_DOCUMENT};` : ''}
  `
}
