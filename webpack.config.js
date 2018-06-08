const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    context: path.join(__dirname, 'src'),
    mode: 'development',
    devtool: 'cheap-source-map',
    entry: {
        'js/background/background': './js/background/background.js',
        'js/inject/openload/openload': './js/inject/openload/openload.js',
        'js/inject/openload/video': './js/inject/openload/video.js',
        'js/popup/popup': './js/popup/popup.js',
        // oload_v: './js/inject/torjackan/torjackan.js'

    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    // devServer: {
    //     port: 9000,
    //     contentBase:    path.join(__dirname, 'dist')
    // },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new CopyWebpackPlugin(['./manifest.json'])
    ]
}