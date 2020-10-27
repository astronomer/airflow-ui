const { resolve } = require('path');
const airbnb = require('@neutrinojs/airbnb');
const react = require('@neutrinojs/react');
const jest = require('@neutrinojs/jest');

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
    airbnb(),
    react({
      html: {
        title: 'Apache Airflow',
        favicon: 'src/static/favicon.ico',
      }
    }),
    jest(),
  ],
};
