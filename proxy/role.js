let { logUtil, service, dataUtil } = require("../utils");
let { Role, RolePower } = require('../models');

/**
 * 根据条件获取角色列表
 * @param  {object}   queryCriteria  查询条件
 * @param  {Function} cb  回调函数
 * @return {null}     
 */
exports.getRoleList = (queryCriteria,cb) => {
	try{      
		let queryObj = {
			attributes: ['id','name','describe'],
			order: [['id', 'DESC']],
			include: [{
				model: RolePower,
				attributes: ['id','powerCode']
			}]
		}
		// 如果有页数和条数限制
        queryObj.limit = queryCriteria.limit;
        queryObj.offset = queryCriteria.offset;

		Role.findAll(queryObj)
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
 * 查询所有角色总数
 * @param  {Function} cb the next func
 * @return {null}     
 */
 exports.allRoleCount = cb => {
    try{
        let queryObj = {
            order: [['id', 'DESC']],
            where: {}
        }

        Role.count(queryObj)
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

