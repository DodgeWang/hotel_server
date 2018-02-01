let { logUtil, service, dataUtil } = require("../utils");
let { EventType } = require('../models');

/**
 * 根据条件获取事件类型列表
 * @param  {object}   queryCriteria  查询条件
 * @param  {Function} cb  回调函数
 * @return {null}     
 */
exports.getEventTypeList = (queryCriteria,cb) => {
	try{      
		let queryObj = {
			attributes: ['id','name'],
			order: [['id', 'DESC']]
		}
		// 如果有页数和条数限制
        queryObj.limit = queryCriteria.limit;
        queryObj.offset = queryCriteria.offset;

		EventType.findAll(queryObj)
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
 * 查询所有事件类型总数
 * @param  {Function} cb the next func
 * @return {null}     
 */
 exports.allEventTypeCount = cb => {
    try{
        let queryObj = {
            order: [['id', 'DESC']],
            where: {}
        }

        EventType.count(queryObj)
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