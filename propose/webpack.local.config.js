var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var ip = '10.10.10.61' // vagrant static ip
var config = require('./webpack.base.config.js')

config.devtool = "#eval-source-map"

config.entry = {
  App1: [
    'webpack-dev-server/client?http://' + ip + ':3000',
    'webpack/hot/only-dev-server',
    './reactjs/App1',
  ],
  App2: [
	  'webpack-dev-server/client?http://' + ip + ':3000',
	  'webpack/hot/only-dev-server',
	  './reactjs/App2',
  ],
  App3:[
	  'webpack-dev-server/client?http://' + ip + ':3000',
	  'webpack/hot/only-dev-server',
	  './reactjs/App3',
  ],
}

config.output.publicPath = 'http://' + ip + ':3000' + '/assets/bundles/'

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new BundleTracker({filename: './webpack-stats-local.json'}),
])

config.module.loaders.push(
  { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot-loader/webpack', 'babel-loader'] }
)

config.module.loaders.push(  {test: /\.css$/, loader: 'style-loader!css-loader?modules', include: /flexboxgrid/})

module.exports = config