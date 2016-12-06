var config = require('./config/config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = config.dev.env
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./config/webpack.dev')


// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express();
var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb();
    })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(context, options))
})

app.use(devMiddleware)
app.use(hotMiddleware)




// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'));
express.static(path.join(__dirname,'dist'))


app.get('/list',function(req,res,next){
    // var filepath = path.join(compiler.outputPath, '/pages/list.html');
    // compiler.outputFileSystem.readFile(filepath, function(err, result) {
    //     if (err) {
    //         // something error
    //         return next(err);
    //     }
    //     res.set('content-type', 'text/html');
    //     res.send(result);
    //     res.end();
    // });
    res.sendFile(path.join(__dirname,'dist/pages/list.html'));
});
app.get('/',function(req,res,next){
    var filepath = path.join(compiler.outputPath, '/pages/index.html');
    compiler.outputFileSystem.readFile(filepath, function(err, result) {
        if (err) {
            // something error
            return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    });

});

module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    var uri = 'http://localhost:' + port
    console.log('Listening at ' + uri + '\n')
});

// /**
//  * Created by fengzekun on 16/11/30.
//  */
// var express = require('express'),
//     webpack = require('webpack'),
//     webpackConfig = require('./config/webpack.dev.js');
// var path = require('path');
//
// var app = express();
// var compiler = webpack(webpackConfig);
//
// var devMiddleware = require('webpack-dev-middleware')(compiler, {
//     publicPath: webpackConfig.output.publicPath,
//     stats: {
//         colors: true
//     }
// });
// var hotMiddleware = require('webpack-hot-middleware')(compiler);
// // force page reload when html-config-plugin template changes
// // compiler.plugin('compilation', function (compilation) {
// //     compilation.plugin('html-config-plugin-after-emit', function (data, cb) {
// //         console.log(11);
// //         //hotMiddleware.publish({ action: 'reload' });
// //     })
// // })
//
// app.use(devMiddleware);
// app.use(hotMiddleware);
//
// // var staticPath = path.posix.join('/', 'static');
// // app.use(staticPath, express.static('./static'));
// //
// // app.use('/', express.static('dist'));
//
// // app.use('/',express.static('static'));
// // app.use(express.static('/','static'));
// //app.use(express.static(path.join(__dirname, 'dist')));
//
// // app.get('*',function(req,res){
// //     res.sendFile(__dirname + '/dist/index.html');
// // });
// // app.get('/list',function(req,res,next){
// //     // var viewname = req.params.viewname
// //     //     ? req.params.viewname + '.html'
// //     //     : 'index.html';
// //     //
// //     // //res.sendFile(viewname);
// //     // var filepath = path.join(compiler.outputPath,viewname);
// //     compiler.outputFileSystem.readFile(filepath, function(err, result) {
// //         if (err) {
// //             // something error
// //             return next(err);
// //         }
// //         res.set('content-type', 'text/html');
// //         res.send(result);
// //         res.end();
// //     });
// // });
//
//
// app.listen(3000,'0.0.0.0',function(){
//
// });