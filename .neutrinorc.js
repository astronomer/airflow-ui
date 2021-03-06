require('dotenv').config();
const typescript = require('neutrinojs-typescript');
const typescriptLint = require('neutrinojs-typescript-eslint');
const react = require('@neutrinojs/react');
const jest = require('@neutrinojs/jest');
const eslint = require('@neutrinojs/eslint');
const { resolve } = require('path');
const copy = require('@neutrinojs/copy');

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
      neutrino.config.resolve.alias.set('theme', resolve(__dirname, 'src/theme'));
    },
    typescript(),
    typescriptLint(),
    eslint({
      eslint: {
        useEslintrc: true,
      },
    }),
    jest({
      moduleDirectories: ['node_modules', 'src'],
    }),
    react({
      env: [
        'SERVER_URL'
      ],
      html: {
        title: 'Apache Airflow',
      }
    }),
    copy({
      patterns: [
        { from: 'src/static/favicon.ico', to: '.' },
        { from: 'src/static/robots.txt', to: '.' },
        { from: 'src/static/_redirects', to: '.' },
      ],
    }),
  ],
};
