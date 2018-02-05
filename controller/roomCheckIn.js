let { logUtil, service, dataUtil } = require("../utils");
let { RoomCheckIn, RoomInfo, RoomType } = require('../models');
const staticSetting = require("../config/staticSetting");
let { langConfig } = require("../config/lang_config");
let ProxyFunc = require('../proxy');
const async = require('async');


/**
 * 入住登记
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
 exports.addCheckIn = (req, res, next) => {
 	try{
        let { roomId, guestName, guestPhone, checkInTime, checkOutTime } = req.body;
        let paramObj = {
        	roomId: parseInt(roomId),
        	guestName: guestName,
        	guestPhone: guestPhone,
        	checkInTime: checkInTime,
        	checkOutTime: checkOutTime,
            isCheckOut: 0
        }
        
        RoomInfo.findOne({
        	where: {
        		id: parseInt(roomId)
        	},
        	order: [['id', 'DESC']]
        }).then(obj => {
            console.log(obj)
        	if(obj && obj.status === 0){
	            RoomCheckIn.create(paramObj)
	            .then(result => {             
	                return RoomInfo.update({status:1},{
                        where:{
                    	    id: parseInt(roomId)
                        }
	                })
                })
                .then(roominfo => {
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
        	}else{
        		return res.json({
	    	       state: 0,
	    	       msg: langConfig(req).resMsg.roomHasCheckIn
	            })
        	}      	    

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
 * 退房
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
 exports.roomCheckOut = (req, res, next) => {
    try{
        let { roomId } = req.body;
        // let paramObj = {
        //     checkOutTime: checkOutTime
        // }
        var checkOutTime = Date.parse(new Date())/1000;

        RoomInfo.findOne({
            where: {
                id: parseInt(roomId)
            },
            order: [['id', 'DESC']]
        }).then(obj => {
            console.log(obj)
            if(obj && obj.status == 1){
                RoomInfo.update({status:0},{
                    where: {
                        id: parseInt(roomId)
                    }
                })
                .then(result => {
                    return RoomCheckIn.findOne({
                       where: {
                          roomId: parseInt(roomId)
                       },
                       order: [['id', 'DESC']] 
                    })
                })
                .then(result => {
                   return RoomCheckIn.update({
                       checkOutTime: checkOutTime,
                       isCheckOut: 1
                   },{
                       where: {
                           id: result.id
                       }
                   })
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
                
            }else{
                return res.json({
                   state: 0,
                   msg: langConfig(req).resMsg.error
                })
            }           

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
 * 分页查询所有入住记录
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
 exports.checkInRoomList = (req, res, next) => {
 	try{
        let { pageNow, pageSize, isCheckOut} = req.query;

        let limit = pageSize ? parseInt(pageSize) : envConfig.dataLimit;
        let offset = pageNow ? (parseInt(pageNow)-1) * limit : 0;
        

        let queryObj = { //获取列表查询条件

        }

        if(typeof isCheckOut != 'undefined'){
            queryObj.isCheckOut = isCheckOut;
        }

        // queryObj.isCheckOut = 0;

        async.series({
            //查询符合条件的记录列表
            checkInList: cb => {
                RoomCheckIn.findAll({
                    // attributes: ['id','name'],
                    order: [['id', 'DESC']],
                    limit: limit,
                    offset: offset,
                    where: queryObj,
                    include: [{
                        model: RoomInfo,
                        include: [{
                            model: RoomType
                        }]
                    }]
                })
                .then(result => {
                    return cb(null,result);
                })
                .catch(err => {
                    return cb(err,null);
                })
            },
            //所有符合条件的记录总数
            allCheckInCount: cb => {
                RoomCheckIn.count({
                    order: [['id', 'DESC']],
                    where: queryObj
                })
                .then(result => {
                    return cb(null,result)
                })
                .catch(err => {
                    return cb(err,null)
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

            let dataList = [];
            for(let i=0; i<results.checkInList.length; i++){
                let obj = results.checkInList[i];
                let iterm = {
                    id: obj.id,
                    roomId: obj.roomId,
                    roomNumber: obj.RoomInfo.number,
                    roomType: obj.RoomInfo.RoomType.name,
                    guestName: obj.guestName,
                    guestPhone: obj.guestPhone,
                    checkInTime: getTimeStr(obj.checkInTime),
                    checkOutTime: getTimeStr(obj.checkOutTime)
                }
                dataList.push(iterm)
            }

            res.json({
              state: 1,
              msg: langConfig(req).resMsg.success,
              data: {
                datalist: dataList, //查询的登记记录列表
                allDataCount: results.allCheckInCount  //所有符合条件的记录总数
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



 //时间戳转时间 yyyy-mm-dd HH:MM
 function getTimeStr(timestamp){
     let date = new Date(timestamp * 1000);
     var year = date.getFullYear();
     var month = date.getMonth() + 1 >= 10 ? ''+(date.getMonth()+1) : '0'+(date.getMonth()+1);
     var dateNum = date.getDate() >= 10 ? ''+date.getDate() : '0'+date.getDate();
     let hours = date.getHours() >= 10 ? ''+date.getHours() : '0'+date.getHours();
     let minutes = date.getMinutes() >= 10 ? ''+date.getMinutes() : '0'+date.getMinutes();
     return year+'/'+month+'/'+dateNum+' '+hours +':'+ minutes;
 }







 /**
 * 入住登记管理页面
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.page_CheckIn = (req, res, next) => {
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
            res.render('checkIn',{
               roomTypeList: results.allTypeList, //所有房间列表
               userInfo: req.session.userInfo   //登录者个人信息
            });

        });
        
    }catch(err){
        logUtil.error(err, req);
        return res.render('page500',{layout: null});
    }
}




 /**
 * 添加入住登页面
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.page_CreateCheckIn = (req, res, next) => {
    try{
        async.series({
            //全部未入住房间列表
            roomList: cb => {
                RoomInfo.findAll({
                    where: {
                        status: 0
                    }
                })
                .then(result => {
                   cb(null,result)
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
            res.render('createCheckIn',{
               roomList: results.roomList, //所有未入住房间列表
               userInfo: req.session.userInfo   //登录者个人信息
            });

        });
        
    }catch(err){
        logUtil.error(err, req);
        return res.render('page500',{layout: null});
    }
}

