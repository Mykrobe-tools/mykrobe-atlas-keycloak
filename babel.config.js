module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'ie >= 10'],
        },
      },
    ],
    '@babel/preset-flow',
  ],
  plugins: [
    'inline-dotenv',
    // Keycloak.js is UMD
    '@babel/plugin-transform-modules-umd',
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime',
  ],
  env: {
    production: {
      plugins: ['transform-react-remove-prop-types'],
    },
  },
};
