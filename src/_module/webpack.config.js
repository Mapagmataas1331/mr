const path = require('path');

module.exports = {
  mode: 'none',
  devtool: 'eval-source-map',
  entry: {
    main: './main.js',
    index: './index.js',
    novocoin: './novocoin.js',
    pixel: './pixel.js',
    restable: './restable.js',
  },
  output: {
    path: path.resolve(__dirname, '../js'),
    filename: '[name].js'
  }
};
