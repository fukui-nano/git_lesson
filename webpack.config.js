const webpack = require('webpack');
const path = require('path');
const basePath = path.resolve(__dirname, 'src');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const enabledSourceMap = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: 'production',
  entry: {
    'assets/scripts/app': [
      `./src/assets/scripts/app.js`,
    ],
    'assets/styles/app': [
      `./src/assets/styles/app.scss`,
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: enabledSourceMap,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer', { grid: true }],
                  ['postcss-sort-media-queries', { sort: 'mobile-first' }],
                  'postcss-flexbugs-fixes',
                  ['cssnano', { autoprefixer: false }],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: enabledSourceMap,
              sassOptions: {
                outputStyle: 'expanded',
              },
            },
          },
          {
            loader: 'import-glob-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'assets/scripts/vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new miniCssExtractPlugin({
      filename: '[name].css',
      ignoreOrder: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/assets/images',
          to: 'assets/images',
        },
      ],
    }),
    new ImageMinimizerPlugin({
      test: /\.(jpe?g)$/i,
      deleteOriginalAssets: false,
      generator: [
        {
          type: "asset",
          filename: '[path][name].jpg.webp',
          implementation: ImageMinimizerPlugin.squooshGenerate,
          options: {
            encodeOptions: {
              webp: {
                quality: 90,
              },
            },
          },
        },
      ],
    }),
    new ImageMinimizerPlugin({
      test: /\.(png)$/i,
      deleteOriginalAssets: false,
      generator: [
        {
          type: "asset",
          filename: '[path][name].png.webp',
          implementation: ImageMinimizerPlugin.squooshGenerate,
          options: {
            encodeOptions: {
              webp: {
                quality: 90,
              },
            },
          },
        },
      ],
    }),
    new ImageMinimizerPlugin({
      test: /\.(jpe?g|png|avif)$/i,
      minimizer: {
        implementation: ImageMinimizerPlugin.squooshMinify,
        options: {
          encodeOptions: {
            mozjpeg: {
              quality: 85,
            },
            oxipng: {
              level: 3,
              interlace: false,
            },
            avif: {
              cqLevel: 0,
            },
          },
        },
      },
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  // devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/,
  },
  target: ['web', 'es5'],
  resolve: {
    alias: {
      '~': basePath,
    },
  },
};


