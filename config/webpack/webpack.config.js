const path = require("path")
const webpack = require("webpack")

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx|)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(scss)$/,
        use: [{
          // inject CSS to page
          loader: 'style-loader'
        }, {
          // translates CSS into CommonJS modules
          loader: 'css-loader'
        }, {
          // Run postcss actions
          loader: 'postcss-loader',
          options: {
            // `postcssOptions` is needed for postcss 8.x;
            // if you use postcss 7.x skip the key
            postcssOptions: {
              // postcss plugins, can be exported to postcss.config.js
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          }
        }, {
          // compiles Sass to CSS
          loader: 'sass-loader'
        }]
      },
    ],
  },
  mode,
  optimization: {
    moduleIds: 'deterministic',
  },
  entry: './app/javascript/Index.jsx',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.wasm'],
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[name].js.map",
    path: path.resolve(__dirname, '..', '..', './app/assets/builds'),
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
}
