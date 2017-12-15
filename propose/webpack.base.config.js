var path = require("path")
var webpack = require('webpack')

module.exports = {
  context: __dirname,

  entry: {
    // Add as many entry points as you have container-react-components here
    Profile: './reactjs/Profile',
    Home: './reactjs/Home',
    Login: './reactjs/Login',
    Register: './reactjs/Register',
    ClientProject: './reactjs/ClientProject',
    FreelancerSearch: './reactjs/FreelancerSearch',
    ProjectSearch: './reactjs/ProjectSearch',
    ProjectView: './reactjs/ProjectView',
    OtherProfile: './reactjs/OtherProfile',
    ProjectEdit: './reactjs/ProjectEdit',
    ProjectNew: './reactjs/ProjectNew',
    Dashboard: './reactjs/Dashboard',
    DashboardProject: './reactjs/DashboardProject',
    Proposal: './reactjs/Proposal',
    Settings: './reactjs/Settings',
    Applications: './reactjs/Applications',
    vendors: ['react'],
  },

  output: {
      path: path.resolve('./static/bundles/local/'),
      filename: "[name]-[hash].js"
  },

  externals: [
  ], // add all vendor libs

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name:'vendors', filename:'vendors.js'}),
  ], // add all common plugins here

  module: {
    loaders: [] // add all common loaders here
  },

  resolve: {
    modules: ['node_modules', 'bower_components'],
    extensions: ['.js', '.jsx']
  },

  node: { fs: 'empty' }
}
