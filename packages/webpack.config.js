const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    filename: '[name].[chunkhash].bundle.js',
    path:  path.join(__dirname, 'dist'),
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html"
    })
  ]
};