const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'eval-source-map',
    entry: './REStamle_main.js',
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'REStamle_bundle.js'
    }
};
