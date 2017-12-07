let { logUtil, service} = require("../utils");
let { Employee } = require('../models');
const staticSetting = require("../config/staticSetting");



/**
 * 登录测试接口
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.loginTest = (req, res, next) => {	
	try{
		const langConfig = require("../config/lang_config")(req);
		const userObj = {
            userName: 'DaiQiang',
            password: service.encrypt('123', staticSetting.encrypt_key)
        }

	    Employee.findOne({
	      attributes: ['userName','password','roleId'],
	 	  where: userObj,
	 	  order: [['employeeId', 'DESC']]
	    }).then(result => {
	    	if(!result) {
	    		return res.json({
	    			state: 0,
	    			msg: langConfig.resMsg.loginError
	    		})
	    	}           
            req.session.userInfo = result;
	    	res.json({
	    		state: 1,
	    		msg: langConfig.resMsg.success
	    	})

        }).catch(err => {
        	logUtil.error(err, req);
	    	return res.json({
	    		state: 0,
	    		msg: langConfig.resMsg.loginFailure
	    	})
        });
	}catch(err){
        logUtil.error(err, req);
        return res.json({
	    	state: 0,
	    	msg: langConfig.resMsg.loginFailure
	    })   
	}
}





/**
 * 登录
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.loginAction = (req, res, next) => {	
	try{
		const langConfig = require("../config/lang_config")(req);
		const userObj = {
            userName: req.body.username,
            password: service.encrypt(req.body.password, staticSetting.encrypt_key)
        }

	    Employee.findOne({
	      attributes: ['userName','password','roleId'],
	 	  where: userObj,
	 	  order: [['employeeId', 'DESC']]
	    }).then(result => {
	    	if(!result) {
	    		return res.json({
	    			state: 0,
	    			msg: langConfig.resMsg.loginError
	    		})
	    	}           
            req.session.userInfo = result;
            req.session.LANG = 2;
	    	res.json({
	    		state: 1,
	    		msg: langConfig.resMsg.success
	    	})

        }).catch(err => {
        	logUtil.error(err, req);
	    	return res.json({
	    		state: 0,
	    		msg: langConfig.resMsg.loginFailure
	    	})
        });
	}catch(err){
        logUtil.error(err, req);
        return res.json({
	    	state: 0,
	    	msg: langConfig.resMsg.loginFailure
	    })   
	}
}





/**
 * 登录注销
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.logOut = (req, res, next) => {
	try{
		console.ss("haha")
	}catch(err){
		res.sendStatus(500)
	}

}





/**
 * 获取员工列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getEmployeeList = (req, res, next) => {
	try{
	   res.json({
	    	state: 0,
	    	msg: "oooo"
	    })   
	}catch(err){
	   
	}

}



/**
 * 添加员工
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getEmployeeList = (req, res, next) => {
	try{
	   
	}catch(err){
	   
	}

}



/**
 * 编辑员工
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.editEmployeeById = (req, res, next) => {
	try{
	   
	}catch(err){
	   
	}

}



/**
 * 删除员工
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.delEmployee = (req, res, next) => {
	try{
	   
	}catch(err){
	   
	}

}



