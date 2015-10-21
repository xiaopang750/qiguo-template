var webpack = require('webpack');
var definePlugin = new webpack.DefinePlugin({
	__DEV__: !process.env.NODE_ENV
});
var ExtractTextPlugin = require("extract-text-webpack-plugin");

/*var commonsPlugin =
  new webpack.optimize.CommonsChunkPlugin('common.js');*/

module.exports = {
	entry: {
		page1: './static/js/page/page1.js',
		page2: './static/js/page/page2.js'
	},
	output: {
		path: __dirname + "/dist",
		publicPath: '/',
		filename: '/js/[name].js'
	},
	module: {
		loaders: [{
			test: /\.css$/,
			exclude: ['node_modules'],
			loader: ExtractTextPlugin.extract("style-loader", "css-loader")
		}, {
			test: /\.styl$/,
			exclude: ['node_modules'],
			loader: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader")
		}, {
			test: /\.(png|jpg)$/,
			exclude: ['node_modules'],
			loader: 'file-loader',
			query: {
				name: 'img/[name].[ext]'
			}
		}, {
			test: /\.jsx$/,
			exclude: ['node_modules'],
			loader: 'babel-loader'
		},{
			test: /\.jade$/,
			exclude: ['node_modules', 'views'],
			loader: 'jade-loader'
		}]
	},
	plugins: [
		definePlugin,
		new ExtractTextPlugin("/css/[name].css"),
		new ExtractTextPlugin("/deji/[name].js")
	]
};