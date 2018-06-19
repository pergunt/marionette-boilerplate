const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");
var TEST_DIR = path.resolve(__dirname, "test");

const common = {
  entry: SRC_DIR + '/js/app.js',
  resolve: {
    alias: {
      Templates: SRC_DIR +  '/js/templates',
      Views: SRC_DIR + '/js/views',
      Models: SRC_DIR + '/js/models',
      Fixtures: TEST_DIR + '/fixtures',
      Img: SRC_DIR + '/img'
    },
    extensions:['.js', '.jst']
  },
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    },
    {
      test: /\.jst$/,
      use: {
        loader: 'underscore-template-loader'
      }
    },
    {
	    test: /\.js$/,
	    exclude: /node_modules/,
	    use: 'babel-loader',
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader?name=fonts/[name].[ext]'
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'file-loader?name=img/[name].[ext]'
    }]
  },
  plugins: [
	  new HtmlWebpackPlugin({
		  template: path.join(__dirname, 'src/index.html'),
		  filename: 'index.html',
		  path: DIST_DIR
	  }),
	new ExtractTextPlugin('app.css'),
	new webpack.ProvidePlugin({
	  $: 'jquery',
	  jQuery: 'jquery', 'window.jQuery': 'jquery',
	  _: 'underscore'
	})
  ]
};

const prod = {
	plugins: [
		...common.plugins,
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new webpack.optimize.UglifyJsPlugin({
			uglifyOptions: {
				warnings: false,
				output: {
					comments: false,
					beautify: false
				}
			}
		})
	]
};
const devServer = {
	devServer: {
		port: 8000,
		historyApiFallback: true,
		inline: true,
	}
};
module.exports = function(env) {
	if (env ==='development') {
		return {...common, ...devServer}
	}
	if (env ==='production') {
		return {...common, ...prod}
	}
}

