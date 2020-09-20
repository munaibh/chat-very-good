const webpack = require('webpack')
const path = require('path')
const { flattenEntryPoints } = require('./plugins/WebpackPluginUtils')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ManifestPlugin = require('./plugins/ManifestPlugin')
const ServiceWorkerPlugin = require('./plugins/ServiceWorkerPlugin')

module.exports = (env, _argv) => {
  const environment = env.production ? 'production' : 'development'
  const entries = env.production ? [] : ['./config/plugins/HotLoader/subscribe']
  const filename = env.production ? '[name].[contenthash:8]' : '[name]'
  const extract = { loader: MiniCssExtractPlugin.loader, options: { hmr: !env.production } }
  const cleanWhiteList = ['!offline.html', '!web-manifest.json', '!favicon.png']
  const PORT = process.env.APP_PORT || 8080

  const entrypoints = {
    main: [...entries, './client/index' ],
    critical: ['./client/styles/critical.sass'] ,
    style: ['./client/styles/style.sass'],
  }

  return {
    mode: environment,
    entry: env.production ? entrypoints : flattenEntryPoints(entrypoints),
    output: {
      path: path.resolve(__dirname, '..', "public"),
      publicPath: '/',
      filename: `scripts/${filename}.js`,
    },
    module: {
      rules: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{
          loader: 'file-loader',
          options: { name: `images/${filename}.[ext]`, publicPath: '/' }
        }]
      }, {
        test: /\.(sa|sc|c)ss$/,
        use: [ extract, 'css-loader', 'sass-loader' ],
      }],
    },
    plugins: [
      new webpack.DefinePlugin({ __DEV__: !env.production }),
      new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['**/*', ...cleanWhiteList] }),
      new MiniCssExtractPlugin({ filename: `styles/${filename}.css` }),
      new ManifestPlugin(),
      new ServiceWorkerPlugin(),
      ...env.production ? []: [
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Ready to rock! http://localhost:${PORT}`],
          },
        }),
      ],
    ]
  }
}