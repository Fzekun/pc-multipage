var config = require('./config')
var webpack = require('webpack')
var merge = require('webpack-merge')
//var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var utils = require('./utils');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./config/dev-client'].concat(baseWebpackConfig.entry[name])
})


module.exports = merge(baseWebpackConfig, {
    // eval-source-map is faster for development
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: './src/pages/index/index.html',
        //     inject: true
        // })
    ]
})

var pages = utils.getEntry('./src/pages/**/*.html');

for (var pathname in pages) {
    // 配置生成的html文件，定义路径等
    var conf = {
        filename: pathname + '.html',
        template: pages[pathname],   // 模板路径
        inject: true,              // js插入位置
        minify: {
            //removeComments: true,
            //collapseWhitespace: true,
            //removeAttributeQuotes: true
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'

    };

    if (pathname in module.exports.entry) {
        conf.chunks = ['manifest', 'vendor', pathname];
        conf.hash = true;
    }

    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}

