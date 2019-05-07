const path = require('path')
const webpack = require('webpack')
const apiMocker = require('mocker-api')
module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        loader: ['babel-loader', 'awesome-typescript-loader'],
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          // 将 JS 字符串生成为 style 节点
          'css-loader', // 将 CSS 转化成 CommonJS 模块
          'postcss-loader',
          'less-loader', // 将 less 编译成 CSS,
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public/'),
    host: '0.0.0.0',
    port: 3333,
    publicPath: 'http://localhost:3333/dist/',
    hotOnly: true,
    before(app) {
      if (process.env.MOCK_ENV) {
        apiMocker(app, path.resolve(__dirname, 'mocker/index.js'))
      }
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
}
