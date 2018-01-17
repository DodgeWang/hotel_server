let { logUtil, service, dataUtil } = require("../utils");
let { RoomType, RoomInfo,RoomArticle } = require('../models');

/**
 * 根据条件获取房间类型列表
 * @param  {object}   queryCriteria  查询条件
 * @param  {Function} cb  回调函数
 * @return {null}     
 */
exports.getRoomTypeList = (queryCriteria,cb) => {
	try{      
		let queryObj = {
			attributes: ['id','name'],
			order: [['id', 'DESC']]
		}
		// 如果有页数和条数限制
        queryObj.limit = queryCriteria.limit;
        queryObj.offset = queryCriteria.offset;

		RoomType.findAll(queryObj)
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
 * 查询所有房间类型总数
 * @param  {Function} cb the next func
 * @return {null}     
 */
 exports.allRoomTypeCount = cb => {
    try{
        let queryObj = {
            order: [['id', 'DESC']],
            where: {}
        }

        RoomType.count(queryObj)
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





 /**
 * 根据条件获取房间列表
 * @param  {object}   queryCriteria  查询条件
 * @param  {Function} cb  回调函数
 * @return {null}     
 */
 exports.getRoomList = (queryCriteria, cb) => {
    try{
        let queryObj = {
            order: [['id', 'DESC']],
            where: {},
            include:[{
                model: RoomType,
                attributes: ['id','name']
            }
            ,{
                model: RoomArticle,
                as: 'articles',
                attributes: ['id','name','isCheck','isClean'],
                through: {
                    attributes: []
                }
              }
            ]
        }       

        
        queryObj.limit = queryCriteria.limit;   //查询限制条数
        queryObj.offset = queryCriteria.offset;  //查询起始位置

        //根据类型查询
        if(typeof queryCriteria.typeId != 'undefined'){
           queryObj.where.typeId = queryCriteria.typeId;
        }

        //如果要根据入住状态查询
        if(typeof queryCriteria.status != 'undefined'){
           queryObj.where.status = queryCriteria.status;
        }

        //如果要根据保洁状态查询
        if(typeof queryCriteria.cleanStatus != 'undefined'){
           queryObj.where.cleanStatus = queryCriteria.cleanStatus;
        }
        
        RoomInfo.findAll(queryObj)
        .then(result => {
            cb(null,result)
        })
        .catch(err => {
            cb(err,null)
        })
    }catch(err){
        cb(err,null);
    }
 }


 /**
 * 查询所有符合条件房间总数
 * @param  {Function} cb the next func
 * @return {null}     
 */
 exports.allRoomCount = (queryCriteria, cb) => {
    try{
        let queryObj = {
            order: [['id', 'DESC']],
            where: {}
        }

        //根据类型查询
        if(typeof queryCriteria.typeId != 'undefined'){
           queryObj.where.typeId = queryCriteria.typeId;
        }
        

        //如果要根据入住状态查询
        if(typeof queryCriteria.status != 'undefined'){
           queryObj.where.status = queryCriteria.status;
        }

        //如果要根据保洁状态查询
        if(typeof queryCriteria.cleanStatus != 'undefined'){
           queryObj.where.cleanStatus = queryCriteria.cleanStatus;
        }

        RoomInfo.count(queryObj)
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
