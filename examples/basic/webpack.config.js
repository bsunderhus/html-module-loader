const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
	entry: './index.js',
	context: path.resolve(__dirname, 'src'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	target: 'web',
	plugins: [
		new HtmlWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.html$/,
				loader: 'html-module-loader',
			}
		]
	}
}
