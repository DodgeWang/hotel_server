let { logUtil, service, dataUtil} = require("../utils");
let { RoomArticle } = require('../models');

/**
 * 根据条件获取房间物品列表
 * @param  {object}   queryCriteria  查询条件
 * @param  {Function} cb  回调函数
 * @return {null}     
 */
exports.getRoomArticleList = (queryCriteria,cb) => {
	try{      
		let queryObj = {
			attributes: ['id','name','isCheck','isClean'],
			order: [['id', 'DESC']]
		}
		// 如果有页数和条数限制
        queryObj.limit = queryCriteria.limit;
        queryObj.offset = queryCriteria.offset;


		RoomArticle.findAll(queryObj)
		.then(result => {
            cb(null,result)

        })
        .catch(err => {
	        cb(err,null)   
        });
	}catch(err){
		cb(err,null)   
	}
}



/**
 * 查询所有物品总数
 * @param  {Function} cb the next func
 * @return {null}     
 */
 exports.allRoomArticleCount = cb => {
    try{
        let queryObj = {
            order: [['id', 'DESC']],
            where: {}
        }

        RoomArticle.count(queryObj)
        .then(result => {
            cb(null,result)
        })
        .catch(err => {
            cb(err,null)
        })
    }catch(err){
        cb(err,null)
    }
 }