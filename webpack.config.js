const config = {
  entry: {
    'home/index': './js/home/index.js',
    'plugin/index':'./js/plugin/index.js'
  },
  output: {
    filename: '[name].js',
    path: './public/js'
  },
  module: {
    loaders: [{
      test: /\.(js|vue)$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel', // 'babel-loader' is also a valid name to reference
      query: {
        presets: ['es2015'],
        plugins: [
          "transform-runtime"
        ]
      },

    }, {
      test: /\.vue$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'vue'
    }, {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    }]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.vue'],
    /**
     * Vue v2.x 之後 NPM Package 預設只會匯出 runtime-only 版本，若要使用 standalone 功能則需下列設定
     */
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
}
module.exports = config;
