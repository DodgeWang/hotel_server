let log4js = require('log4js');
let fs = require('fs');
let logConfig = require('../config/log_config');


//加载配置文件
log4js.configure(logConfig);

let errorLogger = log4js.getLogger('errorLogger');
let resLogger = log4js.getLogger('resLogger');
let debugLogger = log4js.getLogger();

let logUtil = {
	error(error, req) {
        if (error) {
            if (typeof (error) == "string") {
                errorLogger.error('***** node server error *****', error);
                debugLogger.error('***** node server error *****', error)
            } else {
                errorLogger.error(formatError(req, error, 'node'));
                debugLogger.error(formatError(req, error, 'node'))
            }
        }
    },

    res(req, result) {
        if (req) {
            resLogger.info(formatRes(req, result));
        }
    }
}



//格式化响应日志
let formatRes = function (req, resTime) {
    let logText = new String();

    //响应日志开始
    logText += "\n" + "*************** response log start ***************" + "\n";

    //添加请求日志
    logText += formatReqLog(req, resTime);

    //响应状态码
    logText += "response status: " + req.status + "\n";

    //响应内容
    logText += "response body: " + "\n" + JSON.stringify(req.body) + "\n";

    //响应日志结束
    logText += "*************** response log end ***************" + "\n";

    return logText;
}


//格式化错误日志
let formatError = function (req = {}, error = {}, type = 'node') {
    let logText = new String();
    //错误信息开始
    logText += "\n" + "***************  " + type + " error log start ***************" + "\n";

    logText += formatReqLog(req);

    //错误名称
    logText += "err name: " + error.name + "\n";
    //错误信息
    logText += "err message: " + error.message + "\n";
    //错误详情
    logText += "err stack: " + error.stack + "\n";

    //错误信息结束
    logText += "***************  " + type + "  error log end ***************" + "\n";

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