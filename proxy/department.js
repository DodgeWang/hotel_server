let { logUtil, service, dataUtil} = require("../utils");
let { Department } = require('../models');

/**
 * 根据条件获取部门列表
 * @param  {object}   queryCriteria  查询条件
 * @param  {Function} cb  回调函数
 * @return {null}     
 */
exports.getDepartmentList = (queryCriteria,cb) => {
	try{      
		console.log(queryCriteria)
		let queryObj = {
			attributes: ['id','name'],
			order: [['id', 'DESC']]
		}
		// 如果有页数和条数限制
        queryObj.limit = queryCriteria.limit;
        queryObj.offset = queryCriteria.offset;


		Department.findAll(queryObj)
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
 * 查询所有部门总数
 * @param  {Function} cb the next func
 * @return {null}     
 */
 exports.allDepartmentCount = cb => {
    try{
        let queryObj = {
            order: [['id', 'DESC']],
            where: {}
        }

        Department.count(queryObj)
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