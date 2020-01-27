/* @flow */

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const dirNode = 'node_modules';
const dirThemes = path.join(__dirname, 'themes');

const cssRegex = /\.css$/;
const sassRegex = /\.(scss|sass)$/;

const baseConfig = {
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    modules: [dirThemes, dirNode],
  },
  // declare jQuery as an external dependency loaded via script tag
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    // expose jQuery as '$' and 'jQuery'
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new MiniCssExtractPlugin({}),
  ],
  module: {
    rules: [
      // BABEL
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules\/(?!(makeandship-js-common|makeandship-api-common|mykrobe-atlas|mykrobe-atlas-jsonschema|carereport-client|mend-client))/,
      },
      // IMAGES
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      },
      // CSS
      {
        test: cssRegex,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      // SASS
      {
        test: sassRegex,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: { precision: 8 },
          },
        ],
      },
      // WOFF Font
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        },
      },
      // WOFF2 Font
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        },
      },
      // TTF Font
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream',
          },
        },
      },
      // EOT Font
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      },
      // SVG Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new CleanWebpackPlugin(),
      new TerserPlugin({
        terserOptions: {
          parse: {
            // we want uglify-js to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            drop_console: true,
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
};

// https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations

const themes = [
  {
    name: 'mykrobe-atlas',
    modules: [path.join(__dirname, 'node_modules/mykrobe-atlas/app')],
  },
  {
    name: 'carereport',
    modules: [path.join(__dirname, 'node_modules/carereport-client/app')],
  },
  {
    name: 'carereport-app',
    modules: [path.join(__dirname, 'node_modules/carereport-client/app')],
  },
  {
    name: 'rightbreathe',
    modules: [path.join(__dirname, 'node_modules/makeandship-js-common/src')],
  },
  {
    name: 'mend',
    modules: [path.join(__dirname, 'node_modules/mend-client/app')],
  },
];

const configurations = themes.map(({ name, modules }) => {
  const src = path.join(__dirname, `themes/${name}/login/src`);
  const destination = path.join(
    __dirname,
    `themes/${name}/login/resources/build`
  );
  return {
    ...baseConfig,
    entry: {
      login: [
        'babel-polyfill',
        path.join(src, `js/login`),
        path.join(src, `styles/login.scss`),
      ],
    },
    output: {
      path: destination,
      publicPath: './',
    },
    resolve: {
      ...baseConfig.resolve,
      modules: [...baseConfig.resolve.modules, ...modules],
    },
    plugins: [new CleanWebpackPlugin(), ...baseConfig.plugins],
  };
});

module.exports = configurations;
