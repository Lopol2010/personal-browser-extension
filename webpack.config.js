const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')


var config = {
    context: path.join(__dirname, 'src'),
    mode: 'development',
    devtool: 'cheap-source-map',
    entry: {
        'js/background/background': './js/background/background.js',
        'js/inject/openload/openload': './js/inject/openload/openload.js',
        'js/inject/openload/video': './js/inject/openload/video.js',
        'js/popup/popup': './js/popup/popup.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            // {
            //     test: /\.ts$/,
            //     loader: 'ts-loader'
            // }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    plugins: [
        new CopyWebpackPlugin([{from: './manifest.json', cache: true}])
    ]
}
module.exports = config