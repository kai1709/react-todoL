// Webpack config for development
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  watch: true,
  entry: {
    main: ['webpack/hot/only-dev-server', __dirname + '/../app/main.js']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader?stage=0&experimental']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
      {test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")},
      {test: /\.(png|jpg)$/, loader: 'url-loader?name=images/[name].[ext]&limit=8192'},
      {test: /\.(woff|svg|ttf|eot)([\?]?.*)$/, loader: "file-loader?name=fonts/[name].[ext]"},
      {test: /\.json$/,loader: 'json'}
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'app']
  }
};
