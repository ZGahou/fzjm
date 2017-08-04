const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const config = require('./index');
const root = config.config;

module.exports = {
    entry: {
        main: [
            'babel-polyfill',
            root.SRC_PATH + "/index.js"
        ],
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-router-dom',
            'redux-thunk',
            'immutable',
            'react-router-redux',
            'react-redux',
        ]
    },
    output: {
        filename: '[name].js',
        path: root.DIST_PATH,
        publicPath: '',
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']       // 指明公共模块的名称
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new htmlWebpackPlugin({
            title: 'erBai',
            filename: 'index.html',
            template: root.PRO_TPL,
            inject: 'body',
            minify: {
                removeComments: true,               //去注释
                collapseWhitespace: true,           //压缩空格
                removeAttributeQuotes: true         //去除属性引用
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0
        }),
    ],
    resolve: {
        extensions: [' ', '.web.js', '.js', '.jsx', '.less', '.css'],
        modules: [
            path.resolve(__dirname, '../node_modules'),
            path.join(__dirname, '../src')
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/,
                include: path.join(__dirname, '../src')
            },
            {
                test: /\.(less|css)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        "css-loader?minimize",
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins() {
                                    return [
                                        require('autoprefixer')({
                                            browsers: [
                                                '>1%',
                                                'last 2 versions',
                                                'Firefox ESR',
                                                'not ie < 9'
                                            ]
                                        })
                                    ]
                                }
                            }
                        },
                        "less-loader",
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif|md)$/,
                use: ['file-loader?limit=10000&name=[md5:hash:base64:10].[ext]']
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10000&mimetype=image/svg+xml']
            }
        ]
    }
};