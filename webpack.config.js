var webpack = require('webpack');

module.exports = {

  entry: {
    global: './source/js/bundles/global/index.js'
  },

  output: {
    publicPath: '/shop/assets/js/',
    filename: '[name].min.js',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    loaders: [
      {
	      test: /\.es6.js?$/,
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.min.js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
        semicolons: true,
      },
    }),
  ],

  resolve: {
    extensions: ['', '.js', '.es6.js'],
    modulesDirectories: ['shared', 'bundles', 'node_modules']
  },

  externals: {
    "jquery": "jQuery",
  }
};
