let { logUtil, service, dataUtil} = require("../utils");
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
		let name = req.body.name
        
        let paramObj = {
        	name: name
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
	    let { pageNow, pageSize } = req.query;

        let queryConfig = {
			attributes: ['id','name'],
			order: [['id', 'DESC']]
		}

        //如果有页数和条数限制
		if(pageSize && pageNow ){
			let limit = parseInt(pageSize);
            let offset = (parseInt(pageNow)-1) * limit;
            queryConfig.limit = limit;
            queryConfig.offset = offset;
		}

		RoomType.findAndCountAll(queryConfig).then(result => { 
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
		let id = parseInt(req.body.id);
        let { name } = req.body;
        let paramObj = {
        	name: name
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
 * 分页查询客房列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getRoomList = (req, res, next) => {    	
	try{
		let { pageSize,pageNow } = req.query;
		let limit = pageSize ? parseInt(pageSize) : 20;
        let offset = pageNow ? (parseInt(pageNow)-1) * limit : 0;

		RoomInfo.findAll({
		    limit: limit,
			offset: offset,
			order: [['id', 'DESC']],
			include:[{
				model: RoomType,
				as: 'roomType',
				attributes: ['id','name']
			}
			,{
				model: RoomArticle,
				as: 'articles',
				through: {
					attributes: []
				}
			  }
			],
			
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






