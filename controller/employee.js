let { logUtil, service} = require("../utils");
let { Employee, EmployeeInfo, EduExperience, WorkExperience, SocialRelations, Role } = require('../models');
const staticSetting = require("../config/staticSetting");
let { langConfig } = require("../config/lang_config");



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
	      attributes: ['username','password','roleId'],
	 	  where: userObj,
	 	  order: [['id', 'DESC']]
	    }).then(result => {
	    	if(!result) {
	    		return res.json({
	    			state: 0,
	    			msg: langConfig(req).resMsg.loginError
	    		})
	    	}

            req.session.userInfo = result.dataValues;
            result.dataValues.powerList = [2001,3002];
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
// exports.getEmployeeList = (req, res) => {
// 	try{
//         let limit = req.query.limit ? parseInt(req.query.limit) : 20;
//         let offset = req.query.pageNum ? parseInt(req.query.pageNum) * limit : 0;

// 		Employee.findAndCountAll({
// 			include:[{
// 				model: EmployeeInfo,
// 				// attributes: ['name']
// 			},{
// 				model: Role
// 			}],
// 			attributes: ['id','username'],
// 			limit: limit,
// 			offset: offset
// 		}).then(employee => {
//               res.json({
// 	    	  state: 1,
// 	    	  msg: langConfig(req).resMsg.success,
// 	    	  data: employee
// 	        }) 
//         }).catch(err => {
// 	       logUtil.error(err, req);
//            return res.json({
// 	    	  state: 0,
// 	    	  msg: langConfig(req).resMsg.error
// 	       })   
//         });
// 	}catch(err){
// 		logUtil.error(err, req);
//         return res.json({
// 	    	state: 0,
// 	    	msg: langConfig(req).resMsg.error
// 	    })   
// 	}
// }




/**
 * 根据ID获取员工信息
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
// exports.getEmployeeById = (req, res) => {
// 	try{
// 		let id = req.query.id;
// 		Employee.findOne({
// 		  include:[EmployeeInfo,EduExperience,WorkExperience,SocialRelations],
// 	 	  where: {
// 	 	  	id: id
// 	 	  },
// 	 	  order: [['id', 'DESC']]
// 	    }).then(employee => {
// 	    	console.log(employee)
//             res.json({
// 	    	  state: 1,
// 	    	  msg: langConfig(req).resMsg.success,
// 	    	  data: employee === null ? null : JSON.stringify(employee)
// 	        }) 
//         }).catch(err => {
// 	       logUtil.error(err, req);
//            return res.json({
// 	    	  state: 0,
// 	    	  msg: langConfig(req).resMsg.error
// 	       })   
//         });

// 	}catch(err){
// 		logUtil.error(err, req);
//         return res.json({
// 	    	state: 0,
// 	    	msg: langConfig(req).resMsg.error
// 	    })   
// 	}
// }




/**
 * 添加员工
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.addEmployee = (req, res, next) => {
    try{
        let { username, password, departmentId, roleId, positionId } = req.body;

    	let paramObj = {
           username: username,  //用户名
           password: service.encrypt(password, staticSetting.encrypt_key),  //密码（加密处理）
           departmentId: departmentId,  //部门id
           roleId: roleId,  //角色id
           positionId: positionId,  //职位id
           employeeStatus: 1  //用户状态
    	}

        //先判断用户是否存在
    	Employee.findOne({
    		where: { username: username},
	 	    order: [['id', 'DESC']]
	 	}).then(result => {
	 		if(result) {
	    		return res.json({
	    			state: 0,
	    			msg: langConfig(req).resMsg.hasUser
	    		})
	    	}
	 	}).then(() => {
	 		return Employee.create(paramObj)  //创建新用户
	 	}).then(user => {
           res.json({
	    	  state: 1,
	    	  msg: langConfig(req).resMsg.success
	        }) 
        }).catch(err => {
           logUtil.error(err, req);
           return res.json({
	    	  state: 0,
	    	  msg: langConfig(req).resMsg.error
	       })   
        }) 
    }catch(err){
    	logUtil.error(err, req);
        return res.json({
	    	state: 0,
	    	msg: langConfig(req).resMsg.error
	    })  
    }
}







let strTo = str => {
	let arrayList = str.split("_&_");
    for(let i = 0; i<arrayList.length;i++){
    	arrayList[i] = JSON.parse(arrayList[i]);
    }
    return arrayList;
}



