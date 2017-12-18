let { logUtil, service} = require("../utils");
let { Department } = require('../models');
const staticSetting = require("../config/staticSetting");
let { langConfig } = require("../config/lang_config");




/**
 * 添加部门
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.addDepartment = (req, res, next) => {
	try{
        let name = req.body.name;
        let paramObj = {
        	departmentName: name
        }
		Department.create(paramObj).then(department => {
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
 * 根据id修改部门信息
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.editDepartment = (req, res, next) => {
	try{
        let { id, name } = req.body;

        let paramObj = {
        	departmentName: name
        }

		Department.update(paramObj,{
			where: {id: parseInt(id)}
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
 * 获取部门列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getDepartmentList = (req, res, next) => {
	try{      
        let { pageNow, pageSize } = req.query;

		let queryConfig = {
			attributes: ['id','departmentName'],
			order: [['id', 'DESC']]
		}
		//如果有页数和条数限制
		if(pageSize && pageNow ){
			let limit = parseInt(pageSize);
            let offset = (parseInt(pageNow)-1) * limit;
            queryConfig.limit = limit;
            queryConfig.offset = offset;
		}

		Department.findAndCountAll(queryConfig).then(department => {
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






