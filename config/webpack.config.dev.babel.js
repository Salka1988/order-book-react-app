// Import webpack
import webpack from 'webpack';

// Import webpack plugins
import { merge as webpackMerge } from 'webpack-merge';

// Import common configuration
import baseConfig from './webpack.config.base.babel';

import { paths } from './paths';

export default webpackMerge(baseConfig, {
  mode: 'development',

  // Control how source maps are generated
  devtool: false,

  // Spin up a server for quick development
  devServer: {
    open: ['http://localhost:8080/'],
    //open: true,

    port: 8080,

    static: {
      directory: paths.public,
    },

    // Enable gzip compression of generated files.
    compress: true,

    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
  ],
});
