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
 		WorkSchedule.create(paramObj)
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

 




