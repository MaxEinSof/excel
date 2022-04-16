const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development'
  const isProd = argv.mode === 'production'

  const basePlugins = [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: getFileName('css')
    })
  ]

  function getPlugins() {
    if (isDev) {
      basePlugins.push(new ESLintPlugin({ emitError: false }))
    }

    return basePlugins
  }

  function getFileName(ext) {
    return `[name]${isProd ? '.[contenthash]' : ''}.bundle.${ext}`
  }

  return {
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: [
        'core-js/stable',
        'regenerator-runtime/runtime',
        './index.js'
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: getFileName('js'),
      clean: true
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src', 'core')
      }
    },
    plugins: getPlugins(),
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
      port: 3000,
      open: true,
      hot: true,
      watchFiles: './'
    }
  }
}
