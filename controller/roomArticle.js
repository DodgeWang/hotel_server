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

		let { name, isCheck, isClean } = req.body;
        let paramObj = {
        	name: name,
        	isCheck: isCheck,
        	isClean: isClean
        }

		RoomArticle.create(paramObj).then(result => { 
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
        let {id, name, isCheck, isClean} = req.body;

        let paramObj = {
        	name: name,
        	isCheck: isCheck,
        	isClean: isClean
        }

		RoomArticle.update(paramObj,{
			where: {id: parseInt(id)}
		}).then(article => {
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
		let id = parseInt(req.query.id);

		RoomArticle.findOne({
			where: {id: id},
	 	    order: [['id', 'DESC']]
		}).then(article => {
            res.json({
	    	  state: 1,
	    	  msg: langConfig(req).resMsg.success,
	    	  data: JSON.stringify(article)
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

	    let { pageNow,pageSize } = req.query;

        let queryConfig = {
			attributes: ['id','name','isCheck','isClean'],
			order: [['id', 'DESC']]
		}
        //如果有页数和条数限制
		if(pageSize && pageNow ){
			let limit = parseInt(pageSize);
            let offset = (parseInt(pageNow)-1) * limit;
            queryConfig.limit = limit;
            queryConfig.offset = offset;
		}

		RoomArticle.findAndCountAll(queryConfig).then(result => { 
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