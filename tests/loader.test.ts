import webpack from 'webpack'
import Memoryfs from 'memory-fs'
import path from 'path'
import { Options } from '../src'

const compiler = (entry: string, options?: Options) => {
  const compiler = webpack({
    context: path.resolve(__dirname),
    entry,
    mode: 'development',
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js'
    },
    target: 'web',
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: path.resolve(__dirname, '../src/index.ts'),
          options
        }
      ]
    }
  })
  compiler.outputFileSystem = new Memoryfs()
  return new Promise<webpack.Stats>((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err)
      if (stats.hasErrors()) reject(new Error(stats.toJson().errors.join('\n')))
      resolve(stats)
    })
  })
}

jest.setTimeout(15000)
test('Loader compiles from html to js', async () => {
  const stats = await compiler('./template.html')
  const json = stats.toJson()
  if (json.modules && json.modules.length) {
    expect(typeof json.modules[0].source).toBe('string')
  }
  expect(true).toBe(true)
})
