let { logUtil, service} = require("../utils");
let { Employee, EmployeeInfo } = require('../models');
let modelt = require('../models');

// let Employee = require('../models').Employee;
// let EmployeeInfo = require('../models').EmployeeInfo;
const staticSetting = require("../config/staticSetting");
let { langConfig } = require("../config/lang_config");



var User = require('../models').User;
var UserCheckin = require('../models').UserCheckin;
// let sequelize = require('../utils/db');



/**
 * 登录测试接口
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.loginTest = (req, res, next) => {	
	try{		
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
	    			msg: langConfig(req).resMsg.loginError
	    		})
	    	}    
	    	result.dataValues.powerList = [2001,3002];       
            req.session.userInfo = result.dataValues;
            req.session.LANG = 2;
	    	res.json({
	    		state: 1,
	    		msg: langConfig(req).resMsg.success
	    	})

        }).catch(err => {
        	logUtil.error(err, req);
	    	return res.json({
	    		state: 0,
	    		msg: langConfig(req).resMsg.loginFailure
	    	})
        });
	}catch(err){
        logUtil.error(err, req);
        return res.json({
	    	state: 0,
	    	msg: langConfig(req).resMsg.loginFailure
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
	    			msg: langConfig(req).resMsg.loginError
	    		})
	    	}           
            req.session.userInfo = result.dataValues;
            // req.session.LANG = 2;
	    	res.json({
	    		state: 1,
	    		msg: langConfig(req).resMsg.success
	    	})

        }).catch(err => {
        	logUtil.error(err, req);
	    	return res.json({
	    		state: 0,
	    		msg: langConfig(req).resMsg.loginFailure
	    	})
        });
	}catch(err){
        logUtil.error(err, req);
        return res.json({
	    	state: 0,
	    	msg: langConfig(req).resMsg.loginFailure
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
		console.log("haha")
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
exports.getEmployeeList = (req, res) => {
	try{
		Employee.findAll({include:[EmployeeInfo]}).then(function(employee){
  employee = JSON.stringify(employee)
    res.send(employee)
}).catch(function(err){
	console.log("***************")
	res.send(err)
});
	}catch(err){
		console.log(err);
		res.json({
			a:"err"
		})
	}
}



/**
 * 添加员工
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.addEmployee = (req, res, next) => {
     	Employee.create({username:'itbilu', password:'itbilu.com'}).then(employee => { 		

            console.log("***************")

            console.log(employee)


            console.log("***************")

     		var s = EmployeeInfo.build({name:'123'});
            employee.setEmployeeInfo(s);
            console.log(employee.get("username"))
		    res.send('ok');
	    }).catch(err => {
	    	console.log('*****************')
            console.log(err)
            console.log('*****************')
            res.send("error")
     
	    })

	//     User.create({username:'itbilu', password:'itbilu.com'}).then(function(user){
		
	// 	var userCheckin = UserCheckin.build({loginIp:'127.0.0.1'});
	// 	user.setUserCheckin(userCheckin);

	// 	res.set('Content-Type', 'text/html; charset=utf-8');
	// 	res.end('UserCheckin 插入数据成功');
	// }).catch(err => {
	// 	console.log(err)
	// });
}



/**
 * 编辑员工
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
// exports.editEmployeeById = (req, res, next) => {

// }



/**
 * 删除员工
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
// exports.delEmployee = (req, res, next) => {

// }



