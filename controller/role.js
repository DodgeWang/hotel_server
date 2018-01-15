let { logUtil, service, dataUtil} = require("../utils");
let { Role, RolePower } = require('../models');
let ProxyFunc = require('../proxy');
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
        let name = req.body.name;
        let describe = req.body.describe;
        let powerList = req.body.powerList.split('_&_');

        let newPowerList  = [];
        for(let i=0; i<powerList.length; i++){
        	let obj = {};
        	obj.powerCode = powerList[i];
        	newPowerList.push(obj)
        }

        let paramObj = {
        	name: name,
        	describe: describe,
        	powerList: newPowerList
        }
		Role.create(paramObj,{
			include: [{
               model: RolePower
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
        let { id, name, describe, powerList } = req.body;
        
        let roleId = parseInt(id);
        let paramObj = {
        	name: name,
        	describe: describe
        }


		Role.update(paramObj,{
			where: {id: roleId}
		})
		.then(() => {
			return Role.findById(roleId)
		})
		.then(role => {
            RolePower.destroy({
            	where: {
            		role_id: roleId
            	}
            })
            .then(() => {
            	let list = dataUtil.strToArray(powerList);
                let dataObj = [];
                for(let i = 0; i < list.length; i++){
                   let obj = {
                       powerCode: list[i],
                   }
                   dataObj.push(obj)
                } 
                return RolePower.bulkCreate(dataObj)
            })
            .then(result => {
                //绑定员工与新添加的权限关联
                return role.setRolePowers(result)
            })
            .then(() => {
            	res.json({
	    	      state: 1,
	    	      msg: langConfig(req).resMsg.success
	            }) 
            })
            .catch(err => {
	           logUtil.error(err, req);
               return res.json({
	    	      state: 0,
	    	      msg: langConfig(req).resMsg.error
	           })   
            }); 

        })
        .catch(err => {
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
				attributes: ['id','powerCode']
			}]
		}).then(result => {
            res.json({
	    	  state: 1,
	    	  msg: langConfig(req).resMsg.success,
	    	  data: result
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
 * 根据id删除角色
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
 exports.deleteRole = (req, res, next) => {
 	try{
        let id = parseInt(req.query.id);
        Role.destroy({
        	where: {
        		id: id
        	}
        })
        .then(() => {
        	res.json({
	    	  state: 1,
	    	  msg: langConfig(req).resMsg.success
	        }) 
        })
        .catch(err => {
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






/**
 * 分页获取角色列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getRoleList = (req, res, next) => {
	try{      
        let { pageNow, pageSize } = req.query;

		let queryConfig = {
			attributes: ['id','name','describe'],
			order: [['id', 'DESC']],
			include: [{
				model: RolePower,
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

		Role.findAll(queryConfig).then(result => {
              res.json({
	    	    state: 1,
	    	    msg: langConfig(req).resMsg.success,
	    	    data: result
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
