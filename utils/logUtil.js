let log4js = require('log4js');
let fs = require('fs');
let logConfig = require('../config/log_config');


//加载配置文件
log4js.configure(logConfig);

let errorLogger = log4js.getLogger('errorLogger');
let resLogger = log4js.getLogger('resLogger');

let logUtil = {
	error(error, req, resTime) {
        if (error) {
            if (typeof (error) == "string") {
                errorLogger.error('***** node server error *****', error);
            } else {
                errorLogger.error(formatError(req, error, 'node', resTime));
            }
        }
    }
}



//格式化错误日志
let formatError = function (req = {}, error = {}, type = 'node', resTime = 0) {
    let logText = new String();
    // let err = type === 'h5' ? req.query : error;
    //错误信息开始
    logText += "\n" + "***************  " + type + " error log start ***************" + "\n";

    logText += formatReqLog(req);

    //错误名称
    logText += "err name: " + error.name + "\n";
    //错误信息
    logText += "err message: " + error.message + "\n";
    //错误详情
    logText += "err stack: " + error.stack + "\n";


    // //添加请求日志
    // if (!_.isEmpty(req)) {
    //     logText += formatReqLog(req);
    // }
    // if (type === 'h5') {
    //     //用户信息
    //     if (err.userInfo) {
    //         logText += "request user info:  " + err.userInfo + "\n";
    //     }
    //     // 客户端渠道信息
    //     if (err.pageParams) {
    //         logText += "request client channel info:  " + err.pageParams + "\n";
    //     }
    //     // 客户端设备信息
    //     if (err.clientInfo) {
    //         logText += "request mobile info:  " + err.clientInfo + "\n";
    //     }
    //     //报错位置
    //     logText += "err line: " + err.line + ", col: " + err.col + "\n";
    //     //错误信息
    //     logText += "err message: " + err.msg + "\n";
    //     //错误页面
    //     logText += "err url: " + err.url + "\n";

    // } else { // node server
    //     //错误名称
    //     logText += "err name: " + error.name + "\n";
    //     //错误信息
    //     logText += "err message: " + error.message + "\n";
    //     //错误详情
    //     logText += "err stack: " + error.stack + "\n";
    // }
    //错误信息结束
    logText += "***************  " + type + "  error log end ***************" + "\n";

    // let loginLog = new SystemOptionLogModel();
    // loginLog.type = type + '-exception';
    // loginLog.logs = logText;
    // loginLog.save();

    return logText;
};


//格式化请求日志
let formatReqLog = function (req) {

    let logText = new String();
    let method = req.method;
    // 访问路径
    logText += "request url: " + req.url + "\n";
    //访问方法
    logText += "request method: " + method + "\n";
    //客户端ip
    logText += "request client ip:  " + req.ip + "\n";

    return logText;
}


module.exports = logUtil;