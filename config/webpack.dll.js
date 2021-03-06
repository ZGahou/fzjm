const webpack = require('webpack');
const path = require('path');
const assetsPlugin = require('assets-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('../config');
const root = config.config;

// 资源依赖包，提前编译
const vendors = [
    'react-hot-loader',
    'immutable',
    'history'
];

module.exports = {
    entry: {
        vendor: vendors
    },
    output: {
        path: root.DEBUG_PATH,
        filename: '[name].[hash].js',
        library: '[name]_library'    //将会定义为 window.${output.library}
    },
    plugins: [
        new cleanWebpackPlugin(
            ['debug/*'],　                                //匹配删除的文件
            {
                root: path.resolve(__dirname, '../'),     //根目录
                verbose: false,        　　　　　　　　  //是否开启在控制台输出信息
                dry: false        　　　　　　　　　 　  //启用删除文件
            }
        ),
        new webpack.DllPlugin({
            context: __dirname,
            path: path.join(__dirname, '../debug', '[name]-manifest.json'),
            name: '[name]_library'
        }),
        new assetsPlugin({
            filename: 'bundle-config.json',
            path: path.join(__dirname, '../debug'),
        }),
    ]
};