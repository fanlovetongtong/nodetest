const config = {
  entry: {
    'home/index':'./js/home/index.js'
  },
  output: {
    filename: '[name].js',
    path: './public/js'
  },
  module: {
    loaders: [{
      test: /\.(js$)/,
      loader: 'babel-loader',
query: {
            presets: ['es2015']
          }
    }, {
      test: /\.vue$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'vue'
    }, {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    }]
  },
  devtool: 'source-map'
}
module.exports = config;
