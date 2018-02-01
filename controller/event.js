let { logUtil, service, dataUtil} = require("../utils");
let { Event, EventType, EventShare} = require('../models');
const staticSetting = require("../config/staticSetting");
let { langConfig } = require("../config/lang_config");
let ProxyFunc = require('../proxy');
const async = require('async');



/**
 * 创建事件
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.createEvent = (req, res, next) => {   	
	try{
        let employeeId  = req.session.userInfo.id;
        let { typeId,content,isRemind,isReport } = req.body;
        let paramObj = {
        	typeId: typeId,
        	content: content,
        	isRemind: isRemind,
        	isReport: isReport,
        	employeeId: employeeId
        }

        Event.create(paramObj)
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
 * 获取自己发布的事件
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.allPublishEvent = (req, res, next) => {    
    try{
        let userId  = req.session.userInfo.id;
        Event.findAll({
            where: {
                employeeId: userId
            },
            order: [['id', 'DESC']]
        })
        .then(result => {
            res.json({
              state: 1,
              msg: langConfig(req).resMsg.success,
              data: result
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
 * 获取自己被分享的事件
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.allSharedEvent = (req, res, next) => {    
    try{
        let userId  = req.session.userInfo.id;
        EventShare.findAll({
            where: {
                $or: [{
                        sharedId: userId
                      },{
                        isShareAll: 1
                      }]
            },
            order: [['id', 'DESC']]
        })
        .then(result => {
            res.json({
              state: 1,
              msg: langConfig(req).resMsg.success,
              data: result
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
 * 分享事件给所有人
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.shareEventToAll = (req, res, next) => {    
    try{
        let { eventId } = req.body;
        let sharerId  = req.session.userInfo.id;
        let obj = {
            eventId: eventId,
            sharerId: sharerId,
            isShareAll: 1
        }
        Event.findById(eventId)
        .then(event => {
            EventShare.create(obj)
            .then(result => {
                return event.addEventShare(result)
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
 * 分享事件给指定的人
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.shareEventToPoint = (req, res, next) => {    
    try{
        let { eventId, userList } = req.body;
        userList = dataUtil.strToArray(userList);
        let sharerId  = req.session.userInfo.id;

        let dataList = [];
        for(let i = 0; i < userList.length; i++){
            let obj = {
                eventId: eventId,
                sharerId: sharerId,
                sharedId: userList[i],
                isShareAll: 0
            }
            dataList.push(obj)
        }
        
        Event.findById(eventId)
        .then(event => {
            EventShare.bulkCreate(dataList)
            .then(result => {
                return event.addEventShare(result)
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
 * 添加事件类型
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.addEventType = (req, res, next) => {     
    try{
        let name = req.body.name
        
        let paramObj = {
            name: name
        }

        EventType.findOne({
          where: { name: name},
          order: [['id', 'DESC']]
        })
        .then(result => {
            if(result) {
              return res.json({
                state: 0,
                msg: langConfig(req).resMsg.hasEventType
              })
            }
            EventType.create(paramObj)
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
 * 根据id删除事件类型
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.deleteEventType = (req, res, next) => {
  try{
    let id = req.body.id;

    EventType.destroy({
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
 * 根据id修改事件类型信息
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.editEventType = (req, res) => {
    try{       
        let id = parseInt(req.body.id);
    let { name } = req.body;
    let paramObj = {
      name: name
    }

    EventType.findOne({
      where: { name: name},
      order: [['id', 'DESC']]
    })
    .then(result => {
        if(result && result.dataValues.id != id) {
          return res.json({
            state: 0,
            msg: langConfig(req).resMsg.hasEventType
          })
        }
        EventType.update(paramObj,{
          where: {id: id}
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
 * 获取事件类型列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getEventTypeList = (req, res, next) => {     
    try{
        let { pageNow, pageSize } = req.query;

        let limit = pageSize ? parseInt(pageSize) : envConfig.dataLimit;
        let offset = pageNow ? (parseInt(pageNow)-1) * limit : 0;

        let queryCriteria = { //获取部门列表查询条件
           limit: limit,
           offset: offset
        }

        async.series({
            //查询的事件类型列表
            eventTypeList: cb => {
                ProxyFunc.Event.getEventTypeList(queryCriteria, (err,result) => {
                    if(err){
                       return cb(err,null)
                    }
                    cb(null,result)
                })
            },
            //所有事件类型总数
            allEventTypeCount: cb => {
                ProxyFunc.Event.allEventTypeCount((err,result) => {
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
                datalist: results.eventTypeList, //查询的事件类型列表
                allDataCount: results.allEventTypeCount  //所有事件类型总数
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
 * 事件类型管理页面
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.page_EventTypes = (req, res, next) => {
  try{
    res.render('eventTypes',{
        userInfo: req.session.userInfo   //登录者个人信息
    });
  }catch(err){
    logUtil.error(err, req);
    return res.render('page500',{layout: null});
  }
}



/**
 * 创建事件类型页面
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.page_CreateEventTypes = (req, res, next) => {
  try{
    res.render('createEventType',{
        userInfo: req.session.userInfo   //登录者个人信息
    });
  }catch(err){
    logUtil.error(err, req);
    return res.render('page500',{layout: null});
  }
}



/**
 * 进入编辑事件类型信息页面
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.page_EditEventType = (req, res, next) => {
    try{
        let id = req.query.id;
        async.series({
            //根据id查询房间类型信息
            eventTypeInfo: cb => {
                EventType.findById(id)
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
            res.render('editEventType',{
               userInfo: req.session.userInfo,   //登录者个人信息
               data: results.eventTypeInfo, //查询的房间类型信息
            });

        });
        
    }catch(err){
        logUtil.error(err, req);
        return res.render('page500',{layout: null});
    }
}









