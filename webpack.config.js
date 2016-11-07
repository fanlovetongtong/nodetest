const config={
  entry:'./js/index.js',
  output:{
    filename:'index.js',
    path:'./dist'
  },
  module:{
    loaders:[
      {test:/\.(js$)/,loader:'babel-loader'},
      {
          test: /\.vue$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'vue'
        }
    ]
  }
}
module.exports=config;
