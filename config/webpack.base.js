var path = require('path');
var config = require('./config');
var projectRoot = path.resolve(__dirname, '../');
var utils = require('./utils');




var assetsPath = function (_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

var env = process.env.NODE_ENV;
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap);
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap);
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd;

var entries = utils.getEntry('./src/pages/**/*.js');

module.exports = {
    entry: entries,
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js'],
        alias: {
            'jquery': path.resolve(__dirname,'src/js/jquery.js')
        }
        // fallback: [path.join(__dirname, '../node_modules')],
        // alias: {
        //     'vue$': 'vue/dist/vue',
        //     'src': path.resolve(__dirname, '../src'),
        //     'assets': path.resolve(__dirname, '../src/assets'),
        //     'components': path.resolve(__dirname, '../src/components')
        // }
    },
    resolveLoader: {
        //fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [
            //1.9版本jquery，加上module.exports = jQuery
            {
                test : path.resolve(__dirname,'src/js/jquery.js'),
                loader : 'exports?jQuery'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 100,
                    name: assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 100,
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}

