import { parse, stringify, print } from '../src/html-parser'

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

describe('parse(source: string): Document', () => {
  test('returns a document', async () => {
    const document = await parse(html)
    expect(document).toBeInstanceOf(Array)
  })
})

describe('stringify(document: Document): string', () => {
  test('returns a string', async () => {
    const document = await parse(html)
    expect(typeof stringify(document)).toBe('string')
  })
})

describe('print(document: Document): void', () => {
  test('returns nothing', async () => {
    const document = await parse(html)
    expect(print(document)).toBeUndefined()
  })
})
