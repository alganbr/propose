var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.local.config')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  public: '10.10.10.61:3000',
  inline: true,
  historyApiFallback: true,
  watch: true,
  watchOptions: {
  	aggregateTimeout: 300,
    poll: 1000
  }
}).listen(3000, config.ip, function (err, result) {
  if (err) {
    console.log(err)
  }

  console.log('Listening at ' + config.ip + ':3000')
})