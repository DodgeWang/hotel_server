let { logUtil, service} = require("../utils");
let { Department } = require('../models');
const staticSetting = require("../config/staticSetting");
let { langConfig } = require("../config/lang_config");



/**
 * 获取部门列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getDepartmentList = (req, res) => {
	try{

		let queryConfig = {
			attributes: ['id','departmentName'],
			order: [['id', 'DESC']]
		}
		//如果有页数和条数限制
		if(req.query.pageSize && req.query.pageNow ){
			let limit = parseInt(req.query.pageSize);
            let offset = (parseInt(req.query.pageNow)-1) * limit;
            queryConfig.limit = limit;
            queryConfig.offset = offset;
		}

		Department.findAndCountAll(queryConfig).then(department => {
			console.log(department)
              res.json({
	    	  state: 1,
	    	  msg: langConfig(req).resMsg.success,
	    	  data: department
	        }) 
        }).catch(err => {
	       logUtil.error(err, req);
           return res.json({
	    	  state: 0,
	    	  msg: langConfig(req).resMsg.error
	       })   
        });
	}catch(err){
		logUtil.error(err, req);
        return res.json({
	    	state: 0,
	    	msg: langConfig(req).resMsg.error
	    })   
	}
}



/**
 * 添加部门
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.addDepartment = (req, res) => {
	try{
        let departmentName = req.body.name;
		Department.create({departmentName: departmentName}).then(department => {
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
        });
	}catch(err){
		logUtil.error(err, req);
        return res.json({
	    	state: 0,
	    	msg: langConfig(req).resMsg.error
	    })   
	}
}



/**
 * 修改部门信息
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.editDepartment = (req, res) => {
	try{
		let id = parseInt(req.body.id);
        let departmentName = req.body.name;
        let param = {
        	departmentName: departmentName
        }

		Department.update(param,{
			where: {id: id}
		}).then(department => {
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
        });
	}catch(err){
		logUtil.error(err, req);
        return res.json({
	    	state: 0,
	    	msg: langConfig(req).resMsg.error
	    })   
	}
}


/**
 * 删除部门信息
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.delDepartment = (req, res) => {
	try{
		let id = parseInt(req.query.id);
        res.json({
	    	  state: 1,
	    	  msg: langConfig(req).resMsg.success
	        }) 

		
	}catch(err){
		logUtil.error(err, req);
        return res.json({
	    	state: 0,
	    	msg: langConfig(req).resMsg.error
	    })   
	}
}






