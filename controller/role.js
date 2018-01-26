let { logUtil, service, dataUtil} = require("../utils");
let { Role, RolePower } = require('../models');
let ProxyFunc = require('../proxy');
const async = require('async');
const staticSetting = require("../config/staticSetting");
let { langConfig } = require("../config/lang_config");


/*** API接口start ****************/

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

        Role.findOne({
          where: { name: name},
          order: [['id', 'DESC']]
        })
        .then(result => {
            if(result) {
              return res.json({
                state: 0,
                msg: langConfig(req).resMsg.hasRole
              })
            }

            Role.create(paramObj,{
              include: [{
                      model: RolePower
                    }]
            })
            .then(role => {
                var newArray = [];
                for(var i = 0; i < powerList.length; i++){
                  newArray.push({
                      roleId: role.id,
                      powerCode: powerList[i]
                  })
                }
                RolePower.bulkCreate(newArray)
                .then(result => {
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

        Role.findOne({
          where: { name: name},
          order: [['id', 'DESC']]
        })
        .then(result => {
          console.log(result)
            if(result && result.dataValues.id !== roleId) {
              return res.json({
                state: 0,
                msg: langConfig(req).resMsg.hasRole
              })
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
                    let list = powerList.split("_&_")
                    let dataObj = [];
                    if(list.length > 0){
                      for(let i = 0; i < list.length; i++){
                         let obj = {
                             powerCode: list[i],
                         }
                         dataObj.push(obj)
                      } 
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
        let id = parseInt(req.body.id);
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

        let limit = pageSize ? parseInt(pageSize) : envConfig.dataLimit;
        let offset = pageNow ? (parseInt(pageNow)-1) * limit : 0;

		let queryCriteria = { //获取部门列表查询条件
           limit: limit,
           offset: offset
        }



        async.series({
            //角色列表
            roleList: cb => {
                ProxyFunc.Role.getRoleList(queryCriteria, (err,result) => {
                    if(err){
                       return cb(err,null)
                    }
                    cb(null,result)
                })
            },
            //所有角色总数
            allRoleCount: cb => {
                ProxyFunc.Role.allRoleCount((err,result) => {
                    if(err){
                       return cb(err,null)
                    }
                    cb(null,result)
                })
            },
            
        }, (err, results) => {
            if(err){
               logUtil.error(err, req);
               return res.json({
                 state: 0,
                 msg: langConfig(req).resMsg.error
               }) 
            }

            res.json({
              state: 1,
              msg: langConfig(req).resMsg.success,
              data: {
                datalist: results.roleList, //查询的角色列表
                allDataCount: results.allRoleCount  //所有角色总数
              }
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

/*** API接口end ****************/












/*** 页面start ****************/


/**
 * 角色管理页面
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.page_Roles = (req, res, next) => {
  try{
    res.render('roles',{
        userInfo: req.session.userInfo   //登录者个人信息
    });
  }catch(err){
    logUtil.error(err, req);
    return res.render('page500',{layout: null});
  }
}




/**
 * 创建角色页面
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.page_CreateRole = (req, res, next) => {
  try{
    res.render('createRole',{
        userInfo: req.session.userInfo   //登录者个人信息
    });
  }catch(err){
    logUtil.error(err, req);
    return res.render('page500',{layout: null});
  }
}







/**
 * 修改编辑角色信息页面
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.page_EditRole = (req, res, next) => {
  try{
    let id = req.query.id;
    Role.findById(id)
    .then(result => {
        res.render('editRole',{
            userInfo: req.session.userInfo,   //登录者个人信息
            data: result.dataValues
        })
    })
    .catch(err => {
        logUtil.error(err, req);
        return res.render('page500',{layout: null});   
    });
  }catch(err){
    logUtil.error(err, req);
    return res.render('page500',{layout: null});
  }
}






/*** 页面end ****************/
