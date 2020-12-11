const typescript = require('neutrinojs-typescript');
const typescriptLint = require('neutrinojs-typescript-eslint');
const react = require('@neutrinojs/react');
const jest = require('@neutrinojs/jest');
const eslint = require('@neutrinojs/eslint');

module.exports = {
  use: [
    typescript({ tsconfig: {
      compilerOptions: {
        strict: true,
        allowJs: true,
        declaration: true,
      },
    } }),
    typescriptLint(),
    eslint(),
    jest(),
    react({
      html: {
        title: 'Apache Airflow',
        favicon: 'src/static/favicon.ico',
      }
    }),
  ],
};
