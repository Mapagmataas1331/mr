const path = require('path');

module.exports = {
  mode: 'none',
  devtool: 'eval-source-map',
  entry: {
    main: './main.js',
    hub: './hub.js',
    index: './index.js',
    pixel: './pixel.js',
    restable: './restable.js',
    novocoin: './novocoin.js',
  },
  output: {
    path: path.resolve(__dirname, '../js'),
    filename: '[name].js'
  }
};
