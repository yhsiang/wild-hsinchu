var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var plugins = [];
var loaders = [ 'babel?stage=0' ];

if (/production/.test(process.env.NODE_ENV)) {
    plugins = [
    new ExtractTextPlugin("styles.css"),
    new StaticSiteGeneratorPlugin('bundle.js', []),
    new webpack.optimize.UglifyJsPlugin()];
}
else {
    plugins = [ new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin() ];
    loaders.unshift('react-hot');
}

module.exports = {
  devtool: 'eval',
  entry: {
    weather: './src/components/weather.jsx',
  },
  output: {
    path: path.join(__dirname, 'build/js'),
    filename: '[name].js',
    publicPath: '/',
    libraryTarget: 'umd'
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: loaders,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: (/production/.test(process.env.NODE_ENV)) ?
          ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader') :
          'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=1'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};
