/**
 * api
 * 
 */
const express = require('express');
const router = express.Router();

const { Employee, Department, Room, RoomArticle, Role, RoomCheckIn, Task, Event, WorkSchedule } = require('../controller');
const _ = require('lodash');
let { langConfig } = require("../config/lang_config");
const powerConfig = require('../config/powerConfig')();




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
  if(req.session.userInfo.isSuper == 1){ //如果是超级管理员直接不用判断
     return next();
  }
  
  let urlPath = url.parse(req.originalUrl).pathname;
  let powerCode = null;

  out: for(let i = 0; i < powerConfig.length; i++){
     let iterm = powerConfig[i].list;
       for(let x = 0; x < iterm.length; x++){
          if(iterm[x].path === urlPath){
              powerCode = powerConfig[i].code;
              break out;
          }
       }
  }

  if(powerCode == null){
    next();
  }else{
    let isPower = false;
        let userPowerList = req.session.userInfo.powerList;
        for(let i = 0; i < userPowerList.length; i++){
          if(powerCode == parseInt(userPowerList[i].powerCode)){
            isPower = true;
            break;
          }
        }

        if(isPower){
          next();
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




//添加员工
router.post('/employee/add', Employee.addEmployee);

//获取员工信息列表
router.get('/employee/list', Employee.getEmployeeList);

//编辑员工基本信息
router.post('/employee/basicinfo/edit',Employee.editBasicInfo);

//编辑员工个人信息
router.post('/employee/personalinfo/edit',Employee.editPersonalInfo)

//重置用户密码
router.post('/employee/resetpassword', Employee.resetPassword);

//禁止用户
router.post('/employee/forbid', Employee.forbidUser);


//根据id获取员工信息
// router.get('/employee/info', Employee.getEmployeeById);






//添加部门信息
router.post('/department/add', checkUserSession, Department.addDepartment);

//修改部门信息
router.post('/department/edit', checkUserSession, Department.editDepartment);

//删除部门信息
router.post('/department/delete', checkUserSession, Department.deleteDepartment);

//获取部门列表信息
// router.get('/department/list', checkUserSession, checkUserPower, Department.getDepartmentList);
router.get('/department/list', checkUserSession, Department.getDepartmentList);





//添加角色
router.post('/role/add', Role.addRole);

//根据id编辑角色
router.post('/role/edit', Role.editRole);

//根据id获取角色信息
router.get('/role/findbyid', Role.getRoleById);

//获取角色列表
router.get('/role/list', Role.getRoleList);

//根据id删除角色
router.post('/role/delete', Role.deleteRole);





//添加房间类型
router.post('/roomtype/add',Room.addRoomType);

//获取房间类型列表
router.get('/roomtype/list',Room.getRoomTypeList);

//根据id修改房间类型信息
router.post('/roomtype/edit',Room.editRoomType);

//根据id删除房间类型
router.post('/roomtype/delete',Room.deleteRoomType);






//添加房间物品
router.post('/roomarticle/add',RoomArticle.addArticle);

//根据id修改房间物品
router.post('/roomarticle/edit',RoomArticle.editArticle);

//根据id删除房间物品
router.post('/roomarticle/delete',RoomArticle.deleteArticle);

//获取物品列表
router.get('/roomarticle/list',RoomArticle.getArticleList);

//根据id获取物品详情
router.get('/roomarticle/info',RoomArticle.getArticleById);






//添加房间
router.post('/room/add', Room.addRoom);

//根据id编辑房间信息
router.post('/room/edit', Room.editRoomById);

//根绝id删除房间
router.post('/room/delete', Room.deleteRoom);

//分页房间列表
router.get('/room/list', Room.getRoomList);





//入住登记
router.post('/checkin/add', RoomCheckIn.addCheckIn);

//退房
router.post('/checkin/checkout', RoomCheckIn.roomCheckOut);

//分页获取所有入住房间信息
router.get('/checkin/list', RoomCheckIn.checkInRoomList);





//创建任务
router.post('/task/add', Task.addTask);

//查看任务列表
router.get('/task/list', Task.getTaskList);

//获取自己的任务
router.get('/task/self', Task.selfTaskList);



//获取任务类型链列表
router.get('/taskchain/list', Task.getTaskChainList);

//根据id编辑任务类型链
router.post('/taskchain/edit', Task.editTaskChain);




//获取事件类型列表
router.get('/eventtypes/list', Event.getEventTypeList);

//创建事件类型
router.post('/eventtype/add', Event.addEventType);

//根据id修改事件类型信息
router.post('/eventtype/edit',Event.editEventType);

//根据id删除事件类型
router.post('/eventtype/delete',Event.deleteEventType);





//创建事件
router.post('/event/create', Event.createEvent);

//分享事件给所有人
router.post('/event/share/all', Event.shareEventToAll);

//分享事件给指定的人
router.post('/event/share/point', Event.shareEventToPoint);

//获取自己发布的事件
router.get('/event/getshare/publish', Event.allPublishEvent);

//获取自己被分享的事件
router.get('/event/getshare/shared', Event.allSharedEvent);





//获取员工起止时间内所有的工作安排
router.get('/schedule/list', WorkSchedule.getSchedulelist)

//根据id删除工作安排
router.post('/schedule/delete',WorkSchedule.deleteSchedule)

//创建工作安排
router.post('/schedule/create',WorkSchedule.addSchedule)


module.exports = router;





