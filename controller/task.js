let { logUtil, service, dataUtil} = require("../utils");
let { Task,TaskType,WorkSchedule,Employee,TaskFlow } = require('../models');
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
        	// where: {},
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
 * 
 *
 *-------- 流程 ---------
 * 步骤一： 根据任务类型查找出分配人的角色id
 * 步骤二： 查询这个角色下的所有员工及符合条件的排班记录
 * 步骤三： 筛选出符合条件的分配者id
 * 步骤四： 创建任务
 * 步骤五： 创建分配者任务流程
 * 步骤六： 绑定任务和刚创建的分配者任务流程    
 */


 exports.addTask = (req, res, next) => {    
    try{
        let { roomId,
              tasktypeId,
              describe } = req.body;
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
                          $lte: nowDate
                       },
                       endTime: {
                          $gt: nowDate
                       }
                    }
                }]
            })
        })
        .then(result => {
            let allocatorId = 0;
            //筛选出符合分配的分配者id
            for(let i = 0; i < result.length; i++){
                if(result[i].WorkSchedules){
                    console.log("有")
                   allocatorId = result[i].id;
                   break;
                }
            }
            let paramObj = {
                roomId: roomId,
                tasktypeId: tasktypeId,
                describe: describe,
                status: 0
            }
            Task.create(paramObj)   //创建任务
            .then(task => {
                console.log('结果是：',allocatorId)
                let info = {             
                    employeeId: allocatorId,
                    type: 1,
                    status: 0
                }
                TaskFlow.create(info)
                .then(taskflow => {
                    return task.addTaskFlow(taskflow);
                })
                .then(() => {
                    res.json({
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
 * 获取自身的任务列表
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.selfTaskList = (req, res, next) => {
    try{
        let { status } = req.query;
        // let employeeId  = req.session.userInfo.id;
        let employeeId = 1;
        // let nowDate = Date.parse(new Date())/1000;
        let squeryObj = {
            employeeId: employeeId
        }

        //查询完成和未完成的
        if(status){//status为1时查询已经完成的  0时为未完成的
            squeryObj.status = parseInt(status)
        }
        TaskFlow.findAll({
            attributes: ['id','type','record','status'],
            where: squeryObj,
            include: [{
                model: Task,
                attributes: ['id','roomId','tasktypeId','describe','status']
            }],
            order: [['id', 'DESC']]
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







 /**
 * 分配任务
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}  
  * 
 *
 *-------- 流程 ---------
 * 步骤一： 根据任务id查找出分配人的角色id
 * 步骤二： 查询这个角色下的所有员工及符合条件的排班记录
 * 步骤三： 筛选出符合条件的执行者id
 * 步骤四： 改变分配者流程状态
 * 步骤五： 创建执行者任务流程
 * 步骤六： 绑定任务和刚创建的执行者任务流程   
 */
exports.assignTask = (req, res, next) => {
    try{
        
    }catch(err){
        logUtil.error(err, req);
        return res.json({
            state: 0,
            msg: langConfig(req).resMsg.error
        })  
    }
 }













