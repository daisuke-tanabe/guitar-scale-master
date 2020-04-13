const path = require('path');
const Sass = require('sass');
const Fiber = require('fibers');
const autoprefixer = require('autoprefixer');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const mode = process.env.NODE_ENV;
const isProduction = mode === 'production';

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');
const publicPath = path.resolve(__dirname, 'public');

const entry = {
  'app.js': './app.js',
};

module.exports = {
  mode,
  context: srcPath,
  entry,
  output: {
    path: distPath,
    filename: 'bundle.[name]',
  },
  devServer: {
    contentBase: publicPath,
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: '8080',
    stats: 'errors-only',
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: `${!isProduction ? '[name]-[local]-' : ''}[sha512:hash:base64:5]`,
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [autoprefixer],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: Sass,
              sassOptions: {
                fiber: Fiber,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
};
