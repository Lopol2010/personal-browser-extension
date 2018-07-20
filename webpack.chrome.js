const merge = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')

process.env.CHROME = true

module.exports = merge(common, {
    output: {
        path: path.join(__dirname, 'dist-chrome'),
    }
})