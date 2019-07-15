import { Parser, DomHandler, DomElement, DomUtils } from 'htmlparser2'

export type Document = DomElement[]

export function stringify(dom: Document) {
  return DomUtils.getOuterHTML(dom)
}

export function print(dom: Document) {
  console.log(stringify(dom))
}

export function parse(source: string): Promise<Document> {
  return new Promise<Document>((resolve, reject) => {
    const parser = new Parser(new DomHandler((error, dom) => (error ? reject(error) : resolve(dom))))
    parser.write(source)
    parser.end()
  })
}
