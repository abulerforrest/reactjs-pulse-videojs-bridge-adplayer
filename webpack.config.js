//var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

const extractSass = new ExtractTextPlugin({
    filename: "/css/style.min.css",
    disable: process.env.NODE_ENV === "development"
});

var isProd = process.env.NODE_ENV === 'production' // true or false
var cssDev = ['style-loader', 'css-loader', 'sass-loader']
var cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: ''
})
var cssConfig = isProd ? cssProd : cssDev

module.exports = {
  plugins:[
    extractSass,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  entry: ['react-hot-loader/patch', './js/index.js', 'babel-polyfill'],
  output: {
    filename: 'js/bundle.min.js',
    path: __dirname,
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  watch: true,
module: {
  loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-3'],
          plugins: ['transform-function-bind']
        }
      },
      {
  test: /\.css$/,
  loader: 'style-loader'
}, {
  test: /\.css$/,
  loader: 'css-loader',
  query: {
    modules: true,
    localIdentName: '[name]__[local]___[hash:base64:5]'
  }
},
      {
        test:/\.scss$/,
        use: extractSass.extract({
            use: [{
                loader: "css-loader", options: { minimize: true }
            }, {
                loader: "sass-loader"
            }],
            // use style-loader in development
            fallback: "style-loader"
        })
      }
    ]
  },
  devServer: {
    contentBase: __dirname,
    compress: true,
    hot: true,
    open: true,
    inline:true,
    port: 8008

  },
  plugins: [
    new ExtractTextPlugin({
      filename: "/css/style.min.css",
      disable: !isProd,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
