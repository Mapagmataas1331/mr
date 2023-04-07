const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'eval-source-map',
    entry: './Pixel_main.js',
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'Pixel_bundle.js'
    }
};
