let { logUtil, service, dataUtil} = require("../utils");
let { RoomArticle } = require('../models');
const staticSetting = require("../config/staticSetting");
let { langConfig } = require("../config/lang_config");
let ProxyFunc = require('../proxy');
const async = require('async'); 


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

        RoomArticle.findOne({
          where: { name: name},
          order: [['id', 'DESC']]
        })
        .then(result => {
            if(result) {
              return res.json({
                state: 0,
                msg: langConfig(req).resMsg.hasRoomArticle
              })
            }
            RoomArticle.create(paramObj)
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
 * 根据物品id删除物品
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.deleteArticle = (req, res, next) => {
	try{      
		let id = req.body.id;
		
		RoomArticle.destroy({
			where: {
				id: id
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
 * 批量删除物品
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
// exports.deleteArticle = (req, res, next) => {
// 	try{      
// 		let ids = req.body.ids;
//         let idList = dataUtil.strToArray(ids);
		
// 		RoomArticle.destroy({
// 			where: {
// 				id: idList
// 			}
// 		}).then(result => {
//             res.json({
// 	    	  state: 1,
// 	    	  msg: langConfig(req).resMsg.success
// 	        }) 
//         }).catch(err => {
// 	       logUtil.error(err, req);
//            return res.json({
// 	    	  state: 0,
// 	    	  msg: langConfig(req).resMsg.error
// 	       })   
//         });
// 	}catch(err){
// 		logUtil.error(err, req);
//         return res.json({
// 	    	state: 0,
// 	    	msg: langConfig(req).resMsg.error
// 	    })   
// 	}
// }









/**
 * 获取物品列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.getArticleList = (req, res, next) => {    	
	try{	

		let { pageNow, pageSize } = req.query;

        let limit = pageSize ? parseInt(pageSize) : envConfig.dataLimit;
        let offset = pageNow ? (parseInt(pageNow)-1) * limit : 0;

		let queryCriteria = { //获取物品列表查询条件
           limit: limit,
           offset: offset
        }

        async.series({
            //查询的物品列表
            articleList: cb => {
                ProxyFunc.RoomArticle.getRoomArticleList(queryCriteria, (err,result) => {
                    if(err){
                       return cb(err,null)
                    }
                    cb(null,result)
                })
            },
            //所有物品总数
            allArticleCount: cb => {
                ProxyFunc.RoomArticle.allRoomArticleCount((err,result) => {
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
                datalist: results.articleList, //查询的物品列表
                allDataCount: results.allArticleCount  //所有符合条件物品总数
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