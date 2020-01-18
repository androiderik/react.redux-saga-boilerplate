/* eslint-disable global-require */
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const DotEnv = require('./plugins/DotEnv')

const patterns = [
  {
    to: path.resolve(process.cwd(), 'build'),
    from: path.resolve(process.cwd(), 'public'),
  },
]

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  /* eslint-disable prefer-object-spread */
  output: Object.assign(
    {
      /* Compile into js/build.js */
      path: path.resolve(process.cwd(), 'build'),
      publicPath: '/',
    },
    options.output
  ),
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        /* Apply rule for .sass, .scss or .css files */
        test: /\.(sa|c|sc)ss$/,
        /* Loaders are applying from bottom to top */
        use: [
          {
            /* This loader extract all the css ejected from sass-loader then budle it */
            loader: MiniCssExtractPlugin.loader,
          },
          {
            /* This loader resolves url() and @imports inside CSS */
            loader: 'css-loader',
          },
          {
            /* First we transform SASS to standard CSS */
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: options.plugins.concat([
    new DotEnv(),
    /* Copies individual files or entire directories, which already exist, to the build directory */
    new CopyPlugin(patterns),
  ]),
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js'],
  },
  devtool: options.devtool,
  target: 'web',
  performance: options.performance || {},
})
