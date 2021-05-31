const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs')

const pages =
  fs
    .readdirSync(path.resolve(__dirname, 'src/html'))
    .filter(fileName => fileName.endsWith('.html'))

module.exports = {
  entry: {
    index: './src/js/index.js',
    todo: './src/js/todo.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  plugins: [
    ...pages.map(page => new HtmlWebpackPlugin({
      template: `./src/html/${page}`,
      filename: page,
      inject: false
    })),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ],
  }
}
