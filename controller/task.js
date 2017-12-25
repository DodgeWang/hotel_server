let { logUtil, service, dataUtil} = require("../utils");
let { Task } = require('../models');
const staticSetting = require("../config/staticSetting");
let { langConfig } = require("../config/lang_config");



/**
 * 查看任务列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
 exports.getTaskList = (req, res, next) => {
 	try{
 		let { pageNow, pageSize, tasktypeId, status } = req.query;

        let queryConfig = {
        	where: {},
			order: [['id', 'DESC']]
		}

		//如果有页数和条数限制
		if(pageSize && pageNow ){
			let limit = parseInt(pageSize);
            let offset = (parseInt(pageNow)-1) * limit;
            queryConfig.limit = limit;
            queryConfig.offset = offset;
		}
        
        //如果要分任务类型查询
		if(tasktypeId){
			tasktypeId = parseInt(tasktypeId);
			queryConfig.where.tasktypeId = tasktypeId;
		}

		//如果要分任务状态查询
		if(status){
			status = parseInt(status);
			queryConfig.where.status = status;
		}

        Task.findAll(queryConfig)
        .then(result => {
            res.json({
	    	    state: 0,
	    	    msg: langConfig(req).resMsg.success,
	    	    data: result
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
 * 查看自己的任务列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
 // exports.getTaskList = (req, res, next) => {
 // 	try{
 // 		let { pageNow, pageSize, tasktypeId, status } = req.query;

 //        let queryConfig = {
 //        	where: {},
	// 		order: [['id', 'DESC']]
	// 	}

	// 	//如果有页数和条数限制
	// 	if(pageSize && pageNow ){
	// 		let limit = parseInt(pageSize);
 //            let offset = (parseInt(pageNow)-1) * limit;
 //            queryConfig.limit = limit;
 //            queryConfig.offset = offset;
	// 	}
        
 //        //如果要分任务类型查询
	// 	if(tasktypeId){
	// 		tasktypeId = parseInt(tasktypeId);
	// 		queryConfig.where.tasktypeId = tasktypeId;
	// 	}

	// 	//如果要分任务状态查询
	// 	if(status){
	// 		status = parseInt(status);
	// 		queryConfig.where.status = status;
	// 	}

 //        Task.findAll(queryConfig)
 //        .then(result => {
 //            res.json({
	//     	    state: 0,
	//     	    msg: langConfig(req).resMsg.error,
	//     	    data: result
	//         })
 //        })
 //        .catch(err => {
 //        	logUtil.error(err, req);
 //            return res.json({
	//     	    state: 0,
	//     	    msg: langConfig(req).resMsg.error
	//         })
 //        })
	// }catch(err){
	// 	logUtil.error(err, req);
 //        return res.json({
	//     	state: 0,
	//     	msg: langConfig(req).resMsg.error
	//     })   
	// }
 // }







/**
 * 创建任务
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.addTask = (req, res, next) => {   	
	try{

	}catch(err){
		logUtil.error(err, req);
        return res.json({
	    	state: 0,
	    	msg: langConfig(req).resMsg.error
	    })   
	}
}




