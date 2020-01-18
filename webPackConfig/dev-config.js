const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const historyApiFallback = require('connect-history-api-fallback')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackConfig = require('./webpack.config')

const port = parseInt(process.env.PORT, 10) || 3001

module.exports = WebpackConfig({
  mode: 'development',
  entry: [
    /* Polyfill that allow us the use
     * promise or WeakMap static methods like Array.from
     * generator functions
     * (no < Stage 4 proposals)
     */
    '@babel/polyfill',
    path.join(process.cwd(), 'src/index.js'),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    /* Webpack.HotModuleReplacementPlugin: Use in case we want to implement hot reloading */
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
    }),
    /* Use Livereload and injects async script tag right after body */
    new BrowserSyncPlugin({
      port,
      server: {
        baseDir: [
          path.resolve(process.cwd(), 'build'),
          path.resolve(process.cwd(), 'public'),
        ],
      },
      open: false,
      middleware: [historyApiFallback()],
    }),
    /* Bundles the CSS ejected from sass-loader */
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
  ],
  devtool: 'eval-source-map',
  performance: {
    hints: false,
  },
})
