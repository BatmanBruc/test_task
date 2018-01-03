const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './js/app.js',
  output: {
    path: path.resolve(__dirname, './js/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?url=false', 'sass-loader?url=false']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('../css/style.css')
  ]
};