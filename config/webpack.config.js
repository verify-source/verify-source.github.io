const path = require('path');
const webpack = require('webpack');
const rootPath = __dirname + '/../'

module.exports = {
  context: path.resolve(rootPath, 'src'),
  entry: {
    app: './index.js',
  },
  output: {
    path: path.resolve(rootPath, 'dist'),
    filename: '[name].bundle.js',
  },
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015','stage-2'],
						//plugins: [require('babel-plugin-transform-object-rest-spread')]
					}
				}
			}
		]
	}
};
