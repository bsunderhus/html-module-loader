import createScript, { IMPORT_META_DOCUMENT } from '../src/create-script'
import { parse } from '../src/html-parser'
import { filterDocument, extractScript } from '../src/utils'

const html = `
  <template>
    <div>
      this is a template
    </div>
  </template>
  <script type="module">
    console.log(import.meta.document)
    console.log(import.meta.document)
    export const one = 1
    export const two = 2
  </script>
`

const init = async () => {
  const document = await parse(html)
  const filteredDocument = filterDocument(document)
  const rawScript = extractScript(document)
  return { document: filteredDocument, script: rawScript }
}

describe('createScript(document: Document, rawScript: string, options: Options): string', () => {
  test('returns a string', async () => {
    const { document, script: rawScript } = await init()
    const script = createScript(document, rawScript, { minify: false })
    expect(typeof script).toBe('string')
  })
  test('returned string must not have import.meta.document', async () => {
    const { document, script: rawScript } = await init()
    const script = createScript(document, rawScript, { minify: false })
    expect(script.includes('import.meta.document')).toBeFalsy()
  })
  test(`${IMPORT_META_DOCUMENT} should be present four times`, async () => {
    const { document, script: rawScript } = await init()
    const script = createScript(document, rawScript, { minify: false })
    const count = (script.match(new RegExp(IMPORT_META_DOCUMENT, 'g')) || []).length
    expect(count).toBe(4)
  })
})
