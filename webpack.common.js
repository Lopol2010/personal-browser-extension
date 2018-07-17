const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const mode = 'development'

module.exports = {
    context: path.join(__dirname, 'src'),
    mode: mode,
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
            {
                test: /\.sass$/,
                use: [
                    mode === 'development' ? 'style-loader' : CssExtractPlugin.loader,
                        'css-loader',
                        // 'postcss-loader', TODO: config
                        'sass-loader']
            },
            {
                test: /.(ts|tsx)$/,
                use: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.sass']
    },
    plugins: [
        new CopyWebpackPlugin([{from: './manifest.json', cache: true},
                                // {from: './style', to: './style', cache: true},
                                {from: './icons', to: './icons', cache: true},
                                {from: './popup.html', cache: true},
                            ]),
        new CssExtractPlugin({filename: '[name].css'}),
        new webpack.DefinePlugin({
            PLATFORM: JSON.stringify('chrome')
        })
    ]
}