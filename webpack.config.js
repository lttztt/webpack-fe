const path = require('path');
// const devStr = 'development';
const devStr = 'production';
const devMode = devStr !== 'production';
console.log('现在是', devMode ? '开发模式' : '产品模式')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PurifyCssWebpack = require('purifycss-webpack');
const glob = require('glob');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');

module.exports = {
  mode: devStr,
  // devtool:'source-map',
  entry: {
    main: './src/main.js',
    // jquery: 'jquery',
    // loadsh: 'loadsh'
    // index: './src/index.js'
  },
  // entry: ['./src/main.js', './src/index.js'],
  output: {
    // path 需要绝对地址
    // path: __dirname + '/dist',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-withimg-loader'
      },
      {
        test: /\.css$/,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
          test:/\.(sass|scss)$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader','sass-loader'],
      },
      {
        test: /(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              outputPath: 'images'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    port: '8888',
    open: true
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      minify: {
        // collapseWhitespace: true,
        // removeAttributeQuotes: true
      },
      hash: true,
      title: 'webpack-demo',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css'
    }),
    new PurifyCssWebpack({
      paths: glob.sync(path.join(__dirname, 'src/*.html'))
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/assets'),
      to: './assets'
    }]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'lodash'
    })
  ],
  // optimization:{
	// 		splitChunks:{
	// 			cacheGroups:{
	// 				vendor1:{
	// 				    chunks:'initial',
	// 				    name:'jquery',
  //             enforce: true
  //         },
  //         vendor2: {
  //           chunks: 'initial',
  //           name: 'lodash',
  //           enforce: true
  //         }
	// 			}
	// 		}
	// 	}
}