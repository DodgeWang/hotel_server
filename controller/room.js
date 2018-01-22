let { logUtil, service, dataUtil} = require("../utils");
let { RoomType, RoomInfo,RoomArticle } = require('../models');
const staticSetting = require("../config/staticSetting");
let { langConfig } = require("../config/lang_config");
let ProxyFunc = require('../proxy');
const async = require('async');



/**
 * 添加房间类型
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.addRoomType = (req, res, next) => {   	
	try{
		let name = req.body.name
        
        let paramObj = {
        	name: name
        }

        RoomType.findOne({
          where: { name: name},
          order: [['id', 'DESC']]
        })
        .then(result => {
            if(result) {
              return res.json({
                state: 0,
                msg: langConfig(req).resMsg.hasRoomType
              })
            }
            RoomType.create(paramObj)
            .then(roomtype => {
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
 * 根据id删除房间类型
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.deleteRoomType = (req, res, next) => {
  try{
    let id = req.body.id;

    RoomType.destroy({
          where: {
            id: id
          }
        })
    .then(roomtype => {
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
 * 批量删除房间类型
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
 // exports.deleteRoomType = (req, res, next) => {
 // 	try{
	// 	let ids = req.body.ids;
 //    let idList = dataUtil.strToArray(ids);

	// 	RoomType.destroy({
 //        	where: {
 //        		id: idList
 //        	}
 //        })
	// 	.then(roomtype => {
	// 	    res.json({
	//     	  state: 1,
	//     	  msg: langConfig(req).resMsg.success
	//         })
	//     })
	//     .catch(err => {
	//        logUtil.error(err, req);
 //           return res.json({
	//     	  state: 0,
	//     	  msg: langConfig(req).resMsg.error
	//        })  
	//     })
	// }catch(err){
	// 	logUtil.error(err, req);
 //        return res.json({
	//     	state: 0,
	//     	msg: langConfig(req).resMsg.error
	//     })   
	// }
 // }







/**
 * 获取房间类型列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getRoomTypeList = (req, res, next) => {    	
	try{
	    let { pageNow, pageSize } = req.query;

        let limit = pageSize ? parseInt(pageSize) : envConfig.dataLimit;
        let offset = pageNow ? (parseInt(pageNow)-1) * limit : 0;

		let queryCriteria = { //获取部门列表查询条件
           limit: limit,
           offset: offset
        }

        async.series({
            //查询的房间类型列表
            roomTypeList: cb => {
                ProxyFunc.Room.getRoomTypeList(queryCriteria, (err,result) => {
                    if(err){
                       return cb(err,null)
                    }
                    cb(null,result)
                })
            },
            //所有房间类型总数
            allRoomTypeCount: cb => {
                ProxyFunc.Room.allRoomTypeCount((err,result) => {
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
                datalist: results.roomTypeList, //查询的房间类型列表
                allDataCount: results.allRoomTypeCount  //所有房间类型总数
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
 * 根据id修改房间类型信息
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.editRoomType = (req, res) => {
	try{       
		let id = parseInt(req.body.id);
    let { name } = req.body;
    let paramObj = {
      name: name
    }

    RoomType.findOne({
      where: { name: name},
      order: [['id', 'DESC']]
    })
    .then(result => {
        if(result && result.dataValues.id != id) {
          return res.json({
            state: 0,
            msg: langConfig(req).resMsg.hasRoomType
          })
        }
        RoomType.update(paramObj,{
          where: {id: id}
        })
        .then(roomtype => {
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
 * 分页查询客房列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getRoomList = (req, res, next) => {    	
	try{
		let { pageNow, pageSize, typeId, status, cleanStatus } = req.query;

        let limit = pageSize ? parseInt(pageSize) : envConfig.dataLimit;
        let offset = pageNow ? (parseInt(pageNow)-1) * limit : 0;

		let queryCriteria = { //获取部门列表查询条件
           limit: limit,
           offset: offset
        }

        //如果要根据房间类型查询
        if(typeId){
           queryCriteria.typeId = parseInt(typeId);
        }

        //如果要根据入住状态查询
        if(status){
           queryCriteria.status = parseInt(status);
        }

        //如果要根据保洁状态查询
        if(cleanStatus){
           queryCriteria.cleanStatus = parseInt(cleanStatus);
        }

        async.series({
            //查询符合条件的房间列表
            roomList: cb => {
                ProxyFunc.Room.getRoomList(queryCriteria, (err,result) => {
                    if(err){
                       return cb(err,null)
                    }
                    cb(null,result)
                })
            },
            //所有符合条件的房间总数
            allRoomCount: cb => {
                ProxyFunc.Room.allRoomCount(queryCriteria,(err,result) => {
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
                datalist: results.roomList, //查询的房间列表
                allDataCount: results.allRoomCount  //所有符合条件的房间总数
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
 * 添加客房
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.addRoom = (req, res, next) => { 	
	try{    
     let { number, qrCode, typeId, articleList } = req.body;
     let artList = [];
     artList = dataUtil.strToArray(articleList)
     let paramObj = {
     	number: number,
     	qrCode: qrCode,
     	typeId: typeId
     }

     Promise.all([
         RoomInfo.create(paramObj),
         RoomArticle.findAll({
         	where:{
         		id: artList
         	}
         })
     ]).then(results => {
         let roominfo = results[0];
         let articles= results[1];
         roominfo.addArticles(articles);
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



/**
 * 根据id编辑客房
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
 exports.editRoomById = (req, res, next) => {
 	try{
 		let { id, number, qrCode, typeId, articleList } = req.body;
 		id = parseInt(req.body.id);
 		artList = dataUtil.strToArray(articleList);
        let paramObj = {
     	   number: number,
     	   qrCode: qrCode,
     	   typeId: typeId
        }

		RoomInfo.findById(id)
		.then(result => { 
			RoomInfo.update(paramObj,{
				where: {
					id: id
				}
			})
			.then(() => {
				return result.setArticles([]);
			})
			.then(() => {
				return RoomArticle.findAll({
         	       where:{
         		       id: artList
         	       }
                })
			})
			.then(articles => {
				return result.addArticles(articles);
			})
			.then(() => {
				res.json({
	    	      state: 1,
	    	      msg: langConfig(req).resMsg.success
	            })
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



 /**
 * 批量删除客房
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
 exports.deleteRoom = (req, res, next) => {
 	try{      
		let ids = req.body.ids;
        let idList = dataUtil.strToArray(ids);
		
		RoomInfo.destroy({
			where: {
				id: idList
			}
		}).then(result => {
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
 * 房间管理页面
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.page_Rooms = (req, res, next) => {
    try{
        async.series({
            //全部房间类型列表
            allTypeList: cb => {
                ProxyFunc.Room.getRoomTypeList({},(err, result) => {
                    if(err){
                       return cb(err, null)
                    }
                    cb(null,result)
                })
            }
            
        }, (err, results) => {
            if(err){
               logUtil.error(err, req);
               return res.render('page500',{layout: null});
            }
            res.render('rooms',{
               roomTypeList: results.allTypeList, //所有房间列表
            });

        });
        
    }catch(err){
        logUtil.error(err, req);
        return res.render('page500',{layout: null});
    }
}



/**
 * 进入编辑房间类型信息页面
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.page_EditRoomType = (req, res, next) => {
    try{
        let id = req.query.id;
        async.series({
            //根据id查询房间类型信息
            roomTypeInfo: cb => {
                RoomType.findById(id)
                .then(result => {
                    cb(null,result.dataValues)
                })
                .catch(err => {
                    cb(err,null)   
                });
            }
            
        }, (err, results) => {
            if(err){
               logUtil.error(err, req);
               return res.render('page500',{layout: null});
            }
            res.render('editRoomType',{
               data: results.roomTypeInfo, //查询的房间类型信息
            });

        });
        
    }catch(err){
        logUtil.error(err, req);
        return res.render('page500',{layout: null});
    }
}




