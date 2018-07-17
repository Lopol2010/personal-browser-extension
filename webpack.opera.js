const merge = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')

process.env.CHROME = false

module.exports = merge(common, {

    output: {
        path: path.join(__dirname, 'dist-opera'),
    },
    plugins: [  
        new webpack.DefinePlugin({
            BUILD_PLATFORM: 'opera'
        })
    ]
})