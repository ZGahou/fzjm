const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const pxtorem = require('postcss-pxtorem');
const bundleConfig = require("../debug/bundle-config.json");
const config = require('../config');
const root = config.config;

const svgDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
    path.resolve(__dirname, '../src/images/icons'),  // 2. 自己私人的 svg 存放目录
];

module.exports = {
    entry: {
        main: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            'webpack/hot/only-dev-server',
            'babel-polyfill',
            root.SRC_PATH + "/index.js"
        ],
    },
    output: {
        filename: '[name].[hash].js',
        path: root.DEBUG_PATH,
        publicPath: '',
    },
    devtool: 'cheap-source-map',
    plugins: [
        new cleanWebpackPlugin(
            ['debug/main.*.js', 'debug/main.*.js.map',],　   //匹配删除的文件
            {
                root: path.resolve(__dirname, '../'),       　//根目录
                verbose: true,        　　　　　　　　　   　//开启在控制台输出信息
                dry: false        　　　　　　　　　 　      //启用删除文件
            }
        ),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new htmlWebpackPlugin({
            title: 'erBai',
            filename: 'index.html',
            template: root.TPL_PATH,
            vendorName: bundleConfig.vendor.js,
            reactName: bundleConfig.react.js,
            inject: 'body',
            minify: {
                removeComments: true,            //去注释
                collapseWhitespace: true,        //压缩空格
                removeAttributeQuotes: true      //去除属性引用
            }
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../debug/vendor-manifest.json')
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../debug/react-manifest.json')
        })
    ],
    resolve: {
        extensions: [' ', '.web.js', '.js', '.jsx', '.less', '.css'],
        modules: [
            path.resolve(__dirname, '../node_modules'),
            path.join(__dirname, '../src')
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    'babel-loader'
                ],
                exclude: path.resolve(__dirname, '../node_modules'),
                include: path.join(__dirname, '../src')
            },
            {
                test: /\.(less|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
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
                                    }),
                                    pxtorem({rootValue: 100, propWhiteList: []})
                                ]
                            }
                        }
                    },
                    {
                        loader: 'less-loader', options: {noIeCompat: true}
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|md)$/,
                use: ['file-loader?limit=10000&name=[md5:hash:base64:10].[ext]']
            },
            {
                test: /\.(svg)$/i,
                use: ['svg-sprite-loader'],
                include: svgDirs,  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
            },
        ]
    }
};