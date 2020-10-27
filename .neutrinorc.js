const { resolve } = require('path');
// const airbnb = require('@neutrinojs/airbnb');
const eslint = require('@neutrinojs/eslint');
const react = require('@neutrinojs/react');
const jest = require('@neutrinojs/jest');
const typescript = require('neutrinojs-typescript');
// const typescriptLint = require('neutrinojs-typescript-eslint');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    (neutrino) => {
      neutrino.config.resolve.alias.set('views', resolve(__dirname, 'src/views'));
      neutrino.config.resolve.alias.set('components', resolve(__dirname, 'src/components'));
      neutrino.config.resolve.alias.set('containers', resolve(__dirname, 'src/containers'));
    },
    // airbnb(),
    typescript({ tsconfig: {
      compilerOptions: {
        strict: true,
        allowJs: true,
      },
    } }),
    // typescriptLint(),
    eslint({ eslint: { baseConfig: { extends: [
      'eslint:recommended',
      'plugin:react/recommended',
    ] } } }),
    jest(),
    react({
      html: {
        title: 'Apache Airflow',
        favicon: 'src/static/favicon.ico',
      }
    }),
    
  ],
};
