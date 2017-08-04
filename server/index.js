const express = require('express');
const path = require('path');
const app = express();
const config = require('../config');
const root = config.config;
const proxy = require('./middleware/proxy');
const bodyParser = require('body-parser');
const isDev = process.env.NODE_ENV !== 'production';   //true为测试环境，false为生产环境

if (isDev) {
    const webpack = require('webpack');
    const webpackConfig = require('../config/webpack.dev');
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
        historyApiFallback: true,
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        headers: {"X-Custom-Header": "yes"},
        stats: {
            colors: true
        },
        watchOptions: {
            poll: true
        },
    }));

    app.use(webpackHotMiddleware(compiler));

    const reload = require('reload');
    const http = require('http');
    const server = http.createServer(app);
    reload(app);

    app.use('/proxy', proxy(root.DEBUG_API));

    app.use(bodyParser.urlencoded({extended: false}));

    app.use(bodyParser.json());

    app.use(express.static(path.join(__dirname, '../debug')));

    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../debug/index.html'))
    });

    server.listen(
        {
            host: root.server_host,
            port: root.server_port
        }
        , function () {
            console.log('server(dev) listening  http://' + root.server_host + ':' + root.server_port);
        });
}
else {
    app.use(express.static(path.join(__dirname, '../dist')));

    app.use('/proxy', proxy(root.DEBUG_API));

    app.use(bodyParser.json());

    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'))
    });

    app.listen(
        {
            host: root.server_host,
            port: root.server_port
        }
        , function () {
            console.log('server(pro) listening  http://' + root.server_host + ':' + root.server_port);
        });
}