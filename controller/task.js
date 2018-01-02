let { logUtil, service, dataUtil} = require("../utils");
let { Task,TaskType,WorkSchedule,Employee } = require('../models');
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
 * 创建任务
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.addTask = (req, res, next) => {   	
	try{
		let { submitterId,
			  roomId,
			  tasktypeId,
			  describe } = req.body;

		// let { submitterId,roomId,tasktypeId,describe } = {};
        let nowDate = Date.parse(new Date())/1000;
        
        TaskType.findById(tasktypeId)//查找任务链中分配人的角色
        .then(result => {
        	let allocatorRole = result.allocatorRole;
            return Employee.findAll({    //查询这个角色下所有员工信息
            	where: {
            		role_id: allocatorRole
            	},
            	include: [{
            		model: WorkSchedule,  
            		where: {   //查询符合条件的排班记录
            		   startTime: {
            		   	  $gte: nowDate
            		   },
            		   endTime: {
            		   	  $lt: nowDate
            		   }
            		}
            	}]
            })
        })
        .then(result => {
        	let allocatorId = 0;
        	//筛选出符合分配的分配者id
        	for(let i = 0; i < result.length; i++){
        		if(result.WorkSchedule){
                   allocatorId = result[i].id;
                   break;
        		}
        	}
        	let paramObj = {
			    submitterId: submitterId,
			    roomId: roomId,
			    tasktypeId: tasktypeId,
			    allocatorId: allocatorId,
			    describe: describe,
			    status: 1
		    }
		    return Task.create(paramObj)   //创建任务
        })       
        .then(result => {
            return res.json({
	    	    state: 0,
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
	}catch(err){
		logUtil.error(err, req);
        return res.json({
	    	state: 0,
	    	msg: langConfig(req).resMsg.error
	    })   
	}
}










/**
 * 获取自身的任务列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
 exports.selfTaskList = (req, res, next) => {
    try{
        // let employeeId  = req.session.userInfo.id;
        let employeeId = 2;
        // let nowDate = Date.parse(new Date())/1000;
        Task.findAll({
            attributes: ['id','roomId','tasktypeId','describe','status'],
            where: {
                ////未完成
                // $or: [{
                //         allocatorId: employeeId,
                //         status: 1
                //       },{
                //         executorId: employeeId,
                //         status: 2
                //       },{
                //         examinerId: employeeId,
                //         status: 3
                //       }],
                ////已完成
                // $or: [{
                //         allocatorId: employeeId,
                //         status: 2
                //       },{
                //         executorId: employeeId,
                //         status: 3
                //       },{
                //         examinerId: employeeId,
                //         status: 4
                //       }],
                //全部
                $or: [{
                        allocatorId: employeeId
                      },{
                        executorId: employeeId
                      },{
                        examinerId: employeeId
                      }]

            }
        })
        .then(result => {
            return res.json({
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










