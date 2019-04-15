const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const apiMocker = require('mocker-api')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
module.exports = (env, argv) => {
  return {
    entry: ['./src/index.js'],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: { presets: ['@babel/env'] },
        },
        {
          test: /\.(css|less)$/,
          use: [
            argv.mode !== 'production'
              ? 'style-loader'
              : MiniCssExtractPlugin.loader, // 将 JS 字符串生成为 style 节点
            'css-loader', // 将 CSS 转化成 CommonJS 模块
            'postcss-loader',
            'less-loader', // 将 less 编译成 CSS,
          ],
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      alias: {
        '@src': path.resolve('src'),
        '@api': path.resolve('src/api'),
        '@component': path.resolve('src/component'),
        '@pages': path.resolve('src/pages'),
        '@utils': path.resolve('src/utils'),
        '@component': path.resolve('src/component'),
      },
    },
    output: {
      path: path.resolve(__dirname, 'dist/'),
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: path.join(__dirname, 'public/'),
      host: 'localhost',
      port: 3333,
      publicPath: 'http://localhost:3333/dist/',
      hotOnly: true,
      before(app) {
        if (process.env.MOCK_ENV) {
          apiMocker(app, path.resolve(__dirname, 'mocker/index.js'))
        }
      },
    },
    plugins:
      argv.mode !== 'production'
        ? [new webpack.HotModuleReplacementPlugin()]
        : [
            new HtmlWebpackPlugin({
              title: 'slg后台',
              filename: 'index.html',
              template: 'src/tel.html',
            }),
            new CopyPlugin([
              {
                from: path.resolve(__dirname, 'public'),
                to: path.resolve(__dirname, 'dist'),
              },
            ]),
            new MiniCssExtractPlugin({
              filename: 'main.css',
            }),
            new CleanWebpackPlugin(),
          ],
  }
}
