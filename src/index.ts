import { getOptions, OptionObject } from 'loader-utils'
import { loader } from 'webpack'
import { sourceToString, filterDocument, extractScript } from './utils'
import * as HTML from './html-parser'
import { Options as MinifyOptions } from 'html-minifier'
import createScript from './create-script'

export interface Options extends OptionObject {
  minify?: boolean | MinifyOptions
}

declare global {
  interface ImportMeta {
    document: Document
  }
}
export default function(this: loader.LoaderContext, source: string | Buffer) {
  this.async()
  const options: Options = {
    esModule: true,
    minify: this._compiler.options.mode === 'production',
    ...getOptions(this)
  }
  HTML.parse(sourceToString(source))
    .then(document => [filterDocument(document), extractScript(document)] as const)
    .then(([document, script]) => createScript(document, script, options))
    .then(script => this.callback(null, script))
    .catch(e => this.callback(e))
}
