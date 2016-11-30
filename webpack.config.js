/**
 * Created by fengzekun on 16/11/29.
 */
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');


module.exports = {
    entry: {
        index : './src/pages/index/index.js',
        list : './src/pages/list/list.js'
    },
    output : {
        path : './dist',
        publicPath : '',
        filename : 'pages/[name].[hash].js'
    },
    resolve: {
        alias: {
            'jquery': path.resolve(__dirname,'src/js/jquery.js')
        }
    },
    module : {
        loaders: [
            //1.9版本jquery，加上module.exports = jQuery
            {
                test : path.resolve(__dirname,'src/js/jquery.js'),
                loader : 'exports?jQuery'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader','css-loader')
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader : 'url',
                query: {
                    limit: 100,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit : 10000,
                    name : 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    },
    plugins : [
        new webpack.ProvidePlugin({
            $ : "jquery"
        }),
        new ExtractTextPlugin("[name].[hash].css"),
        new HtmlwebpackPlugin({
            filename : 'index.html',
            template : './src/pages/index/index.html',
            chunks : ['index']
        }),
        new HtmlwebpackPlugin({
            filename : 'list.html',
            template : './src/pages/list/list.html',
            chunks : ['list']
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}