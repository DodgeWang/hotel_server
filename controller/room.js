let { logUtil, service} = require("../utils");
let { RoomType, RoomInfo,RoomArticle } = require('../models');
const staticSetting = require("../config/staticSetting");
let { langConfig } = require("../config/lang_config");



/**
 * 添加房间类型
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.addRoomType = (req, res, next) => {   	
	try{
		//判断是否有roomtype参数
		if(!req.body.roomtype){
		   return res.json({
	    	  state: 0,
	    	  msg: langConfig(req).resMsg.paramError
	       })  
		}
        
        let paramObj = {
        	roomtypeName: req.body.roomtype
        }

		RoomType.create(paramObj).then(roomtype => { 
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
 * 获取房间类型列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getRoomTypeList = (req, res, next) => {    	
	try{		
        let queryConfig = {
			attributes: ['id','roomtypeName'],
			order: [['id', 'DESC']]
		}

        //如果有页数和条数限制
		if(req.query.pageSize && req.query.pageNow ){
			let limit = parseInt(req.query.pageSize);
            let offset = (parseInt(req.query.pageNow)-1) * limit;
            queryConfig.limit = limit;
            queryConfig.offset = offset;
		}

		RoomType.findAndCountAll(queryConfig).then(roomtypelist => { 
		    res.json({
	    	  state: 1,
	    	  msg: langConfig(req).resMsg.success,
	    	  data: JSON.stringify(roomtypelist)
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
 * 根据id修改房间类型信息
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.editRoomType = (req, res) => {
	try{       
        //判断是否有roomtype参数
		if(!req.body.id || !req.body.roomtype){
		   return res.json({
	    	  state: 0,
	    	  msg: langConfig(req).resMsg.paramError
	       })  
		}

		let id = parseInt(req.body.id);
        let roomtype = req.body.roomtype;
        let paramObj = {
        	roomtypeName: roomtype
        }

		RoomType.update(paramObj,{
			where: {id: id}
		}).then(roomtype => {
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
 * 获取客房列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getRoomList = (req, res, next) => {    	
	try{
		let limit = req.query.limit ? parseInt(req.query.limit) : 20;
        let offset = req.query.pageNum ? (parseInt(req.query.pageNum)-1) * limit : 0;

		RoomInfo.findAndCountAll({
			include:[{
				model: RoomType,
				as: 'roomType',
				attributes: [['id','roomtypeId'],'roomtypeName']
			},{
				model: RoomArticle
			}],
			limit: limit,
			offset: offset,
			order: [['id', 'DESC']]
		}).then(roomlist => { 
		    res.json({
	    	  state: 1,
	    	  msg: langConfig(req).resMsg.success,
	    	  data: roomlist
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
 * 添加客房
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.addRoom = (req, res, next) => { 	
	try{
		// RoomInfo.create({roomNumber:'102', roomQrCode:'111',roomtypeId:1}).then(roominfo => { 
		// 	RoomArticle.findOne({
	 // 	       where: {id:1}
	 //        },function(roomarticle){
	 //        	roominfo.addRoomArticle(roomarticle)
	 //        	res.json({
	 //    	       state: 1,
	 //    	       msg: langConfig(req).resMsg.success
	 //            })
	 //        })

			
		    
	 //    }).catch(err => {
	 //       logUtil.error(err, req);
  //          return res.json({
	 //    	  state: 0,
	 //    	  msg: langConfig(req).resMsg.error
	 //       })  
	 //    })

Promise.all([
     RoomInfo.create({roomNumber:'102', roomQrCode:'111',roomtypeId:1}),
     RoomArticle.findAll()
])
     .then(function(results){
            var roominfo = results[0];
            var article= results[1];
            roominfo.addRoomArticles(article);
                   	res.json({
	    	       state: 1,
	    	       msg: langConfig(req).resMsg.success
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






