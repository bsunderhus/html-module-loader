import { sourceToString, filterDocument, extractScript, createExportStatement } from '../src/utils'
import { parse } from '../src/html-parser'

describe('sourceToString(source: string | Buffer): string', () => {
  test('returns string when receives string', () => {
    expect(typeof sourceToString('test')).toBe('string')
  })
  test('returns string when receives a Buffer', () => {
    expect(typeof sourceToString(Buffer.from('test', 'utf8'))).toBe('string')
  })
})

const html = `
  <template>
    <div>
      this is a template
    </div>
  </template>
  <script type="module">
    console.log(import.meta.document)
    export const one = 1
    export const two = 2
  </script>
`

describe('filterDocument(document: Document): Document', () => {
  test('receives a document returns another document', async () => {
    const document = await parse(html)
    const next = filterDocument(document)
    expect(document === next).toBeFalsy()
  })
  test('filters scripts from the documents root', async () => {
    const next = filterDocument(await parse(html))
    next.forEach(({ type }) => expect(type !== 'script').toBeTruthy())
  })
})

describe('extractScript(document: Document): string', () => {
  test('receives a document returns string', async () => {
    const document = await parse(html)
    expect(typeof extractScript(document)).toBe('string')
  })
})

describe('createExportStatement(): string', () => {
  test('returns a string', () => {
    expect(typeof createExportStatement()).toBe('string')
  })
})
