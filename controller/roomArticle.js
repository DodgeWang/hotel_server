let { logUtil, service} = require("../utils");
let { RoomArticle } = require('../models');
const staticSetting = require("../config/staticSetting");
let { langConfig } = require("../config/lang_config");


/**
 * 添加房间物品
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.addArticle = (req, res, next) => {   	
	try{
        let paramObj = {
        	articleName: req.body.name,
        	articleCheck: req.body.check,
        	articleClean: req.body.clean
        }

		RoomArticle.create(paramObj).then(roomtype => { 
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
 * 根据id编辑物品详情
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.editArticle = (req, res, next) => {
	try{      
		let id = parseInt(req.body.id);
        let paramObj = {
        	articleName: req.body.name,
        	articleCheck: req.body.check,
        	articleClean: req.body.clean
        }

		RoomArticle.update(paramObj,{
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
 * 根据id获取物品详情
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getArticleById = (req, res, next) => {
	try{      
		let id = parseInt(req.body.id);
		RoomArticle.findOne(paramObj,{
			where: {id: id}
	 	    order: [['id', 'DESC']]
		}).then(roomtype => {
            res.json({
	    	  state: 1,
	    	  msg: langConfig(req).resMsg.success,
	    	  data: JSON.stringify(employee)
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
 * 获取物品列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getArticleList = (req, res, next) => {    	
	try{		
        let queryConfig = {
			attributes: ['id','articleName','articleCheck','articleClean'],
			order: [['id', 'DESC']]
		}
        //如果有页数和条数限制
		if(req.query.pageSize && req.query.pageNow ){
			let limit = parseInt(req.query.pageSize);
            let offset = (parseInt(req.query.pageNow)-1) * limit;
            queryConfig.limit = limit;
            queryConfig.offset = offset;
		}

		RoomArticle.findAndCountAll(queryConfig).then(getArticleList => { 
		    res.json({
	    	  state: 1,
	    	  msg: langConfig(req).resMsg.success,
	    	  data: JSON.stringify(getArticleList)
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