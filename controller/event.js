let { logUtil, service, dataUtil} = require("../utils");
let { Event, EventType, EventShare} = require('../models');
const staticSetting = require("../config/staticSetting");
let { langConfig } = require("../config/lang_config");



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










