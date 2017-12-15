let { logUtil, service} = require("../utils");
let { Role, RolePower } = require('../models');
const staticSetting = require("../config/staticSetting");
let { langConfig } = require("../config/lang_config");


/**
 * 添加角色
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next func
 * @return {null}     
 */
exports.addRole = (req, res, next) => {
	try{
		let roleName = "管理员";
        let roleDes = "超级管理员";
        // let roleName = req.body.roleName;
        // let roleDes = req.body.roleDes;

        let paramObj = {
        	roleName: roleName,
        	roleDes: roleDes
        }
		Role.create(paramObj).then(role => {
			let s = RolePower.build({powerCode:'1002'});
			// console.log(s)
			role.setRolePower(s);
            res.json({
	    	  state: 1,
	    	  msg: langConfig(req).resMsg.success
	        }) 
        }).catch(err => {
	       logUtil.error(err, req);
           return res.json({
	    	  state: 0,
	    	  msg: langConfig(req).resMsg.error
	       })   
        });


        // let roleName = "管理员";
        // let roleDes = "超级管理员";

        // let paramObj = {
        // 	roleName: roleName,
        // 	roleDes: roleDes
        // }


        // async.series({
        //     role: cb => {
        //         Role.create(paramObj, (err, rows) => {
        //             cb(err, rows)
        //         })
        //     },
        //     powers: cb => {
        //         RolePowers.findAll({
        //         	where: {id:[1,2,3]}
        //         },(err, rows) => {
        //             cb(err, rows)
        //         })
        //     }
        // }, (err, results) => {
        // 	if(err){
        // 		logUtil.error(err, req);
        //         return res.json({
	    	  //      state: 0,
	    	  //      msg: langConfig(req).resMsg.error
	       //      })
        // 	}
        //     role.setRolePowerss(results.powers)

        // });
	}catch(err){
		logUtil.error(err, req);
        return res.json({
	    	state: 0,
	    	msg: langConfig(req).resMsg.error
	    })   
	}
}