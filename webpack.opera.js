const merge = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')
const webpack = require('webpack')

process.env.CHROME = false

module.exports = merge(common, {

    output: {
        path: path.join(__dirname, 'dist-opera'),
    }
})