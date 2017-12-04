let logUtil = require("../utils/logUtil");



/**
 * 登录
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.loginAction = (req, res, next) => {
	try{
		cosn.log('s')
	}catch(e){
        logUtil.error(e, req);
	}
	
    res.send("hah")
}




/**
 * 用户注销
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.logOut = (req, res, next) => {

}


