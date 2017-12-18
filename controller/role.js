let { logUtil, service} = require("../utils");
let { Role, RolePower } = require('../models');
const staticSetting = require("../config/staticSetting");
let { langConfig } = require("../config/lang_config");


/**
 * 添加角色
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.addRole = (req, res, next) => {
	try{
        let roleName = req.body.roleName;
        let roleDes = req.body.roleDes;
        let powers = req.body.powers.split('_&_');

        let powerList  = [];
        for(let i=0; i<powers.length; i++){
        	let obj = {};
        	obj.powerCode = powers[i];
        	powerList.push(obj)
        }

        let paramObj = {
        	roleName: roleName,
        	roleDes: roleDes,
        	powers: powerList
        }
		Role.create(paramObj,{
			include: [{
               model: RolePower,
               as: 'powers'
            }]
		}).then(role => {
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
 * 根据id修改角色信息
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.editRole = (req, res, next) => {
	try{
        let { id, roleName, roleDes } = req.body;

        let paramObj = {
        	roleName: roleName,
        	roleDes: roleDes
        }

		Role.update(paramObj,{
			where: {id: parseInt(id)}
		}).then(role => {
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
 * 根据id获取角色信息
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getRoleById = (req, res, next) => {
	try{
        let { id } = req.query;

		Role.findOne({
			where: {id: parseInt(id)},
			include: [{
				model: RolePower,
				as: 'powers',
				attributes: ['id','powerCode']
			}]
		}).then(role => {
            res.json({
	    	  state: 1,
	    	  msg: langConfig(req).resMsg.success,
	    	  data: role
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
 * 获取角色列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getRoleList = (req, res, next) => {
	try{      
        let { pageNow, pageSize } = req.query;

		let queryConfig = {
			attributes: ['id','roleName','roleDes'],
			order: [['id', 'DESC']],
			include: [{
				model: RolePower,
				as: 'powers',
				attributes: ['id','powerCode']
			}]
		}
		//如果有页数和条数限制
		if(pageSize && pageNow ){
			let limit = parseInt(pageSize);
            let offset = (parseInt(pageNow)-1) * limit;
            queryConfig.limit = limit;
            queryConfig.offset = offset;
		}

		Role.findAndCountAll(queryConfig).then(role => {
              res.json({
	    	    state: 1,
	    	    msg: langConfig(req).resMsg.success,
	    	    data: role
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
