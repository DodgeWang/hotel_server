

/**
 * api
 * 
 */
const express = require('express');
const router = express.Router();

const { Employee, Department } = require('../controller');
const _ = require('lodash');
let { langConfig } = require("../config/lang_config");
const apiPowerConfig = require('../config/apiPowerConfig')();




//登录判断
function checkUserSession(req, res, next) {
  if (!_.isEmpty(req.session.userInfo)) {
    next()
  } else {
    res.json({
        state: 0,
        msg: langConfig(req).resMsg.noLogin
    })
  }
}


//权限判断
function checkUserPower(req, res, next) { 
   let powerCode = null;
   out:
   for(let item of apiPowerConfig){
   	   for(let a of item.list){
            if(a.path === req.path){
                powerCode = a.powerCode;
                break out;
            }
   	   }
   }

   if(powerCode === null){
       next();
   }else{
   	   var isPower = false;
   	   for(let item of req.session.userInfo.powerList){
   	       if(item == powerCode){
               isPower = true;
               break;
   	       }
       }

       if(isPower){
       	   next()
       }else{
       	   return res.json({
   	          state: 0,
   	          msg: langConfig(req).resMsg.noPower
           })
       }
   }
}



// 该路由使用的中间件
// router.use((req, res, next) => {
//   next();
// });


//员工登录
router.post('/doLogin',Employee.loginAction);

//登录注销
router.get('/logOut', Employee.logOut);


//获取员工信息列表
router.get('/employee/list', checkUserSession, checkUserPower, Employee.getEmployeeList);
// router.get('/employee/list', Employee.getEmployeeList);


//根据id获取员工信息
router.get('/employee/info', Employee.getEmployeeById);






//添加员工信息
router.get('/employee/add', Employee.addEmployee);

//获取部门列表信息
router.get('/department/list', Department.getDepartmentList);

//添加部门信息
router.post('/department/add', Department.addDepartment);

//修改部门信息
router.post('/department/edit', Department.editDepartment);

//删除部门信息
router.post('/department/delete', Department.delDepartment);




module.exports = router;





