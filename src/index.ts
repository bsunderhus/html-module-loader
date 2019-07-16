import { getOptions, OptionObject } from 'loader-utils'
import { loader } from 'webpack'
import { sourceToString, filterDocument } from './utils'
import * as HTML from './html-parser'
import { Options as MinifyOptions } from 'html-minifier'
import createScript from './create-script'

export interface Options extends OptionObject {
  esModule?: boolean
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
    .then(filterDocument)
    .then(document => createScript(document, options))
    .then(script => this.callback(null, script))
    .catch(e => this.callback(e))
}
