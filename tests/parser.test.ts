import { parse } from '../src/html-parser'
import path from 'path'
import fs from 'fs'

test('Parser.pase(source: string): DOMElement[]', async () => {
  const html = fs.readFileSync(path.resolve(__dirname, 'template.html'), { encoding: 'utf8' })
  expect(typeof html).toBe('string')
  const document = await parse(html)
  expect(document).toBeInstanceOf(Array)
})
