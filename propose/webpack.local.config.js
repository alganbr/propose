var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var ip = '10.10.10.61' // vagrant static ip
var config = require('./webpack.base.config.js')

config.devtool = "#eval-source-map"

config.entry = {
  Profile: [
    'webpack-dev-server/client?http://' + ip + ':3000',
    'webpack/hot/only-dev-server',
    './reactjs/Profile',
  ],
  Home: [
    'webpack-dev-server/client?http://' + ip + ':3000',
    'webpack/hot/only-dev-server',
    './reactjs/Home',
  ],
  Login: [
    'webpack-dev-server/client?http://' + ip + ':3000',
    'webpack/hot/only-dev-server',
    './reactjs/Login',
  ],
  Register: [
    'webpack-dev-server/client?http://' + ip + ':3000',
    'webpack/hot/only-dev-server',
    './reactjs/Register',
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
  App4: [
    'webpack-dev-server/client?http://' + ip + ':3000',
    'webpack/hot/only-dev-server',
    './reactjs/App4',
  ],
  ProjectViewApp: [
    'webpack-dev-server/client?http://' + ip + ':3000',
    'webpack/hot/only-dev-server',
    './reactjs/ProjectViewApp',
  ]
}

config.output.publicPath = 'http://' + ip + ':3000' + '/assets/bundles/'

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new BundleTracker({filename: './webpack-stats-local.json'}),
])

config.module.loaders.push(
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: [
      'react-hot-loader/webpack',
      'babel-loader'
    ]
  }
)

config.module.loaders.push(
  {
    test: /\.css$/,
    include: /flexboxgrid/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
        }
      }
    ]
  }
)

config.module.loaders.push(
  {
    test: /\.scss$/,
    loaders: [
      require.resolve('style-loader'),
      require.resolve('css-loader'),
      require.resolve('sass-loader')
    ]
  }
)

module.exports = config
