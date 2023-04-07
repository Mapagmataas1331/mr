const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'eval-source-map',
    // entry: './REStable_main.js',
    entry: './Pixel_main.js',
    output: {
        path: path.resolve(__dirname, './'),
        // filename: 'REStable_bundle.js'
        filename: 'Pixel_bundle.js'
    }
};
