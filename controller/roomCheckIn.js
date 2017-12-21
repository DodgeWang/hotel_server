let { logUtil, service, dataUtil } = require("../utils");
let { RoomCheckIn, RoomInfo } = require('../models');
const staticSetting = require("../config/staticSetting");
let { langConfig } = require("../config/lang_config");


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
        	checkOutTime: checkOutTime
        }
        
        RoomInfo.findOne({
        	where: {
        		id: parseInt(roomId)
        	},
        	order: [['id', 'DESC']]
        }).then(obj => {
        	if(obj && obj.roomStatus === 0){
	            RoomCheckIn.create(paramObj)
	            .then(result => {             
	                return RoomInfo.update({roomStatus:1},{
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
        let { roomId, checkOutTime } = req.body;
        let paramObj = {
            // roomId: parseInt(roomId),
            checkOutTime: checkOutTime
        }
        
        RoomInfo.findOne({
            where: {
                id: parseInt(roomId)
            },
            order: [['id', 'DESC']]
        }).then(obj => {
            if(obj && obj.roomStatus === 1){
                RoomInfo.update({roomStatus:0},{
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
                       checkOutTime: checkOutTime
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
 * 分页查询所有已经入住的房间
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
 exports.checkInRoomList = (req, res, next) => {
 	try{
        let { pageNow, pageSize } = req.query;
        let limit = parseInt(pageSize);
        let offset = (parseInt(pageNow)-1) * limit;

        RoomInfo.findAndCount({
        	where:{
        		roomStatus: 1
        	},
        	order: [['id', 'DESC']],
            limit: limit,
            offset: offset,
            include: [{
            	model: RoomCheckIn,
            	as: 'roomCheckIn',
            	limit: 1,
                offset: 0,
                order: [['id', 'DESC']]
            }]
        }).then(result => {
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

