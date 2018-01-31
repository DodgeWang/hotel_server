let { logUtil, service, dataUtil} = require("../utils");
let { WorkSchedule, Employee, EmployeeInfo } = require('../models');
const staticSetting = require("../config/staticSetting");
let { langConfig } = require("../config/lang_config");


/**
 * 添加工作安排
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.addSchedule = (req, res, next) => {
 	try{
 		let { employeeId, startTime, endTime } = req.body;

 		let paramObj = {
 			employeeId: employeeId,
 			startTime: startTime,
 			endTime: endTime 
 		}
    if(startTime > endTime){
       return res.json({
         state: 0,
         msg: "起始时间不能大于结束时间"
       })
    }



 		WorkSchedule.create(paramObj)
 	    .then(result => {
          return res.json({
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
 	}catch(err){
        logUtil.error(err, req);
        return res.json({
	    	state: 0,
	    	msg: langConfig(req).resMsg.error
	    })  
 	} 	
}




/**
 * 获取某些员工起止时间内所有的工作安排
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
 exports.getSchedulelist = (req, res, next) => {
  try{
    let _StartTime = parseInt(req.query.startTime);
    let _EndTime = parseInt(req.query.endTime);
    // let _StartTime = 1514304000;
    // let _EndTime = 1514563200;
    Employee.findAll({
      order: [['id', 'DESC']],
      attributes: ['id','username'],
      include: [
          {
             model: EmployeeInfo,
             attributes: ['name']
          },{
             model: WorkSchedule,
             attributes: ['id','startTime','endTime'],
             where: {
               startTime: {
                  $gte: _StartTime
               },
               endTime: {
                  $lt: _EndTime
               }
             },
             required: false
          }]
    })
    .then(result => {
        let dataList = [];
        for(let i = 0; i < result.length; i++){
            let obj = {};
            obj.employeeId = result[i].id;
            obj.username = result[i].username;
            obj.name = result[i].EmployeeInfo?result[i].EmployeeInfo.name:'';
            obj.scheduleList = [];
            let schedule = result[i].WorkSchedules;
            for(let x = 0; x < schedule.length; x++){
               let item = {};
               item.id = schedule[x].id;
               item.startTime = schedule[x].startTime;
               item.endTime = schedule[x].endTime;
               item.day = getDay(schedule[x].startTime);
               item.startTimeStr = getTimeStr(schedule[x].startTime);
               item.endTimeStr = getTimeStr(schedule[x].endTime);
               obj.scheduleList.push(item)
            }
            dataList.push(obj);
        }
        return res.json({
          state: 1,
          msg: langConfig(req).resMsg.success,
          data: dataList
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




//根据时间戳获取星期几0~6
 function getDay(timestamp){
     let date = new Date(timestamp * 1000);
     return date.getDay();
 }


 //时间戳转时间 HH:MM
 function getTimeStr(timestamp){
     let date = new Date(timestamp * 1000);
     let hours = date.getHours() >= 10 ? ''+date.getHours() : '0'+date.getHours();
     let minutes = date.getMinutes() >= 10 ? ''+date.getMinutes() : '0'+date.getMinutes();
     return hours +':'+ minutes;
 }














/**
 * 获取起止时间内所有的工作安排
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
 exports.getScheduleByTime = (req, res, next) => {
 	try{
 		// let _StartTime = parseInt(req.query.startTime);
 		// let _EndTime = parseInt(req.query.endTime);
 		let _StartTime = 1514304000;
 		let _EndTime = 1514563200;

 		WorkSchedule.findAll({
            where: {
               startTime: {
                  $gte: _StartTime
               },
               endTime: {
                  $lte: _EndTime
               }
            },
            include: [{
            	model: Employee,
            	attributes: ['username'],
            	include: [{
            		model: EmployeeInfo,
            		attributes: ['name']
            	}]
            }],
 		})
 		.then(result => {
 			let dataList = [];
 			one: for(let i = 0; i < result.length; i++){				
 				let isHas = false;
 				two: for(let x = 0; x < dataList.length; x++){
 					if(result[i].employeeId === dataList[x].employeeId){
 						isHas = true;
 						break two;
 					}
 				}
 				if(isHas == false){
 					let obj = {
 					   employeeId: result[i].employeeId,
 					   employeeName: result[i].Employee.EmployeeInfo ? result[i].Employee.EmployeeInfo.name : null,
 					   list: []
 				    };
                    dataList.push(obj)
 				}
 			}

 			for(let i = 0; i < result.length; i++){
 				inside: for(let x = 0; x < dataList.length; x++){
 					if(result[i].employeeId === dataList[x].employeeId){
 						let obj = {
 							id: result[i].id,
 							startTime: result[i].startTime,
 							endTime: result[i].endTime,
 							dateTime: result[i].dateTime,
 							hourLong: (result[i].endTime - result[i].startTime)/60
 						}
 						dataList[x].list.push(obj)
 						break inside;
 					}
 				}
 			}

          return res.json({
	    	    state: 0,
	    	    msg: langConfig(req).resMsg.success,
	    	    data: dataList
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
 * 根据id删除工作安排
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
 exports.deleteSchedule = (req, res, next) => {
  try{
        let id = parseInt(req.body.id);
        WorkSchedule.destroy({
          where: {
            id: id
          }
        })
        .then(() => {
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
  }catch(err){
    logUtil.error(err, req);
        return res.json({
        state: 0,
        msg: langConfig(req).resMsg.error
      }) 
  }
 }







 /**
 * 工作排班管理页面
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.page_WorkSchedule = (req, res, next) => {
  try{
    res.render('workSchedule',{
        userInfo: req.session.userInfo   //登录者个人信息
    });
  }catch(err){
    logUtil.error(err, req);
    return res.render('page500',{layout: null});
  }
}

 




