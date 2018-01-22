let { logUtil, service, dataUtil} = require("../utils");
let { Department } = require('../models');
let ProxyFunc = require('../proxy');
const staticSetting = require("../config/staticSetting");
const async = require('async'); 
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
        	name: name
        }
        Department.findOne({
          where: { name: name},
          order: [['id', 'DESC']]
        })
        .then(result => {
           if(result) {
              return res.json({
                state: 0,
                msg: langConfig(req).resMsg.hasDepartment
              })
           }
           Department.create(paramObj)
           .then(obj => {
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
      name: name
    }

    Department.findOne({
      where: { name: name},
      order: [['id', 'DESC']]
    })
    .then(result => {
        if(result && result.dataValues.id != parseInt(id)) {
          return res.json({
            state: 0,
            msg: langConfig(req).resMsg.hasDepartment
          })
        }
        Department.update(paramObj,{
          where: {id: parseInt(id)}
        })
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

		    
	}catch(err){
		logUtil.error(err, req);
        return res.json({
	    	state: 0,
	    	msg: langConfig(req).resMsg.error
	    })   
	}
}




/**
 * 单个删除部门
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.deleteDepartment = (req, res, next) => {
	try{      
		let id = req.body.id;
		
		Department.destroy({
			where: {
				id: id
			}
		})
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
	}catch(err){
		logUtil.error(err, req);
        return res.json({
	    	state: 0,
	    	msg: langConfig(req).resMsg.error
	    })   
	}
}



/**
 * 批量删除部门
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
// exports.deleteDepartment = (req, res, next) => {
//   try{      
//     let id = req.body.id;
//     // let idList = dataUtil.strToArray(ids);
    
//     Department.destroy({
//       where: {
//         id: idList
//       }
//     })
//     .then(result => {
//        res.json({
//           state: 1,
//           msg: langConfig(req).resMsg.success
//        }) 
//     })
//     .catch(err => {
//        logUtil.error(err, req);
//        return res.json({
//           state: 0,
//           msg: langConfig(req).resMsg.error
//        })   
//     });
//   }catch(err){
//     logUtil.error(err, req);
//         return res.json({
//         state: 0,
//         msg: langConfig(req).resMsg.error
//       })   
//   }
// }






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

        let limit = pageSize ? parseInt(pageSize) : envConfig.dataLimit;
        let offset = pageNow ? (parseInt(pageNow)-1) * limit : 0;

		    let queryCriteria = { //获取部门列表查询条件
           limit: limit,
           offset: offset
        }

        async.series({
            //部门列表
            departmentList: cb => {
                ProxyFunc.Department.getDepartmentList(queryCriteria, (err,result) => {
                    if(err){
                       return cb(err,null)
                    }
                    cb(null,result)
                })
            },
            //所有部门总数
            allDepartmentCount: cb => {
                ProxyFunc.Department.allDepartmentCount((err,result) => {
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
                datalist: results.departmentList, //查询的部门列表
                allDataCount: results.allDepartmentCount  //所有符合条件部门总数
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





/**
 * 进入修改部门信息页面
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.page_EditDepartment = (req, res, next) => {
  try{
    let id = req.query.id;
    Department.findById(id)
    .then(result => {
        res.render('editDepartment',{
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
















