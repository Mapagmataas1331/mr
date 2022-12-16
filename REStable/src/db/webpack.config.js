const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: './db.js',
    output: {
        path: path.resolve(__dirname, 'webpack'),
        filename: 'bundle.js'
    }
};
