
/**
 * api
 * 
 */
const express = require('express');
const router = express.Router();

const { Employee } = require('../controller');
const _ = require('lodash');
let langConfig = {};
const apiPowerConfig = require('../config/apiPowerConfig')();




//登录判断
function checkUserSession(req, res, next) {
  if (!_.isEmpty(req.session.userInfo)) {
    next()
  } else {
    res.json({
        state: 0,
        msg: langConfig.resMsg.noLogin
    })
  }
}


//权限判断
function checkUserPower(req, res, next) {  
   let powerCode = null;
   out:
   for(let item of apiPowerConfig){
   	   for(let a of item.list){
   	   	console.log(1)
   	   	    console.log(a.path)
   	   	    console.log(req.path)
            if(a.path === req.path){
                powerCode = a.powerCode;
                break out;
            }
   	   }
   }
   
   console.log(powerCode)

   res.json({
   	  state: 0,
   	  msg: langConfig.resMsg.noPower
   })
}



// 该路由使用的中间件
router.use((req, res, next) => {
  langConfig = require("../config/lang_config")(req);
  next();
});


//员工登录测试接口（测试接口）
router.get('/login',Employee.loginTest);

//员工登录
router.post('/doLogin',Employee.loginAction);

//登录注销
router.get('/logOut', Employee.logOut);

//获取员工信息列表
router.get('/employee/list', checkUserSession, checkUserPower, Employee.getEmployeeList);




module.exports = router;