const typescript = require('neutrinojs-typescript');
const typescriptLint = require('neutrinojs-typescript-eslint');
const react = require('@neutrinojs/react');
const jest = require('@neutrinojs/jest');
const eslint = require('@neutrinojs/eslint');
const { resolve } = require('path');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    (neutrino) => {
      // Alias's for internal modules
      neutrino.config.resolve.alias.set('root', resolve(__dirname));
      neutrino.config.resolve.alias.set('src', resolve(__dirname, 'src'));
      neutrino.config.resolve.alias.set('views', resolve(__dirname, 'src/views'));
      neutrino.config.resolve.alias.set('containers', resolve(__dirname, 'src/containers'));
      neutrino.config.resolve.alias.set('utils', resolve(__dirname, 'src/utils'));
      neutrino.config.resolve.alias.set('static', resolve(__dirname, 'src/static'));
      neutrino.config.resolve.alias.set('api', resolve(__dirname, 'src/api'));
      neutrino.config.resolve.alias.set('components', resolve(__dirname, 'src/components'));
    },
    typescript(),
    typescriptLint(),
    eslint({
      eslint: {
        useEslintrc: true,
      },
    }),
    jest(),
    react({
      html: {
        title: 'Apache Airflow',
        favicon: 'src/static/favicon.ico',
      }
    }),
  ],
};
