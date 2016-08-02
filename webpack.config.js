let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let crypto = require('crypto');
module.exports = {
	context: __dirname + "/client",
	entry: "./index",
	output: {
		path: __dirname + "/dist",
		filename: crypto.randomBytes(4).toString('hex')+".js"
	},
	module: {
		loaders: [
			{ 
				test: /\.css$/, 
				loader: "style-loader!css-loader?-url" },
			{
				test: /\.(woff|svg|ttf|eot)([\?]?.*)$/, 
				loader: "file-loader?name=[name].[ext]"
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: [
							'es2015'
						]
				}
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{ 
				test: /\.(glsl|frag|vert)$/, 
				loader: 'glslify-loader' 
			},
			{
				include: path.resolve(__dirname, 'node_modules/pixi-lights'),
				loader: 'transform?glslify'
			}
		],
		postLoaders: [
			{
				include: path.resolve(__dirname, 'node_modules/pixi.js'),
				loader: 'transform?brfs'
			},
			{
				include: path.resolve(__dirname, 'node_modules/glslify'),
				loader: 'transform?brfs'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: '4K 1BIT ENDLESS DUNGEON CHALLENGE',
			filename: 'index.html',
			template: path.resolve(__dirname, 'client/templates/index.html')
		}),
		new CopyWebpackPlugin([
			{ from: 'assets', to: 'assets' }
		]),
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false }
	    }),
	    new CleanWebpackPlugin(['dist'], {
			root: __dirname,
			verbose: true
	    })
	],
	
};