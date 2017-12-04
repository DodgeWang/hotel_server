const path = require('path');

module.exports = {
	//服务器配置
    server: {
        port: 2000, //服务器端口号
    },
    //测试数据库配置
    database: {
        database: 'test', // 使用哪个数据库
        username: 'root', // 用户名
        password: '000000', // 口令
        host: 'localhost', // 主机名
        port: 3306 // 端口号，MySQL默认3306
    },
    
    //日志配置
    log: {
        SYSTEMLOGPATH: path.resolve(__dirname, '../../logs') // 服务器日志保存目录
    }
}