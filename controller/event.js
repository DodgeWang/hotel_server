let { logUtil, service, dataUtil} = require("../utils");
let { Event } = require('../models');
const staticSetting = require("../config/staticSetting");
let { langConfig } = require("../config/lang_config");



/**
 * 创建事件
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.addEvent = (req, res, next) => {   	
	try{
        let { typeId,content,isRemind,isReport,isShare,employeeId } = req.body;
        let paramObj = {
        	typeId: typeId,
        	content: content,
        	isRemind: isRemind,
        	isReport: isReport,
        	isShare: isShare,
        	employeeId: employeeId
        }

        Event.create(paramObj)
        .then(result => {
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
