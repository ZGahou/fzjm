const path = require('path');

//项目根路径
const ROOT_PATH = path.resolve(__dirname, '../');

//路径配置
exports.config = {
    ROOT_PATH: ROOT_PATH,                                     //项目根路径
    SRC_PATH: path.resolve(ROOT_PATH, 'src'),               //项目源码路径
    DIST_PATH: path.resolve(ROOT_PATH, 'dist'),              //线上打包生成路径
    DEBUG_PATH: path.resolve(ROOT_PATH, 'debug'),             //开发打包生产路径
    TPL_PATH: path.resolve(ROOT_PATH, 'src/index.html'),    //html模板
    PRO_TPL: path.resolve(ROOT_PATH, 'src/pro.html'),      //线上html模板

    DEBUG_API: "http://regouhaitao.com:7001",                //开发接口
    DIST_API: "http://fenzhongjinke.com",                   //生产接口

    // 服务器配置
    server_host: '127.0.0.1',
    server_port: 3000
};
