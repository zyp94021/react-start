const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const apiMocker = require('mocker-api')
module.exports = {
  entry: ['./src/index.js'],
  mode: 'development',
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
          process.env.NODE_ENV !== 'production'
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
    publicPath: '/dist/',
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
        apiMocker(app, path.resolve('./mocker/index.js'))
      }
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'dist/[name].css',
      chunkFilename: 'dist/[name].css',
    }),
  ],
}
