/**
 * page
 * 
 */
const express = require('express');
const router = express.Router();
let url = require('url');


const { Employee, Room, Department, Role, RoomArticle, Task } = require('../controller');
const _ = require('lodash');
// let langConfig = {};
const powerConfig = require('../config/powerConfig')();



//登录判断
function checkUserSession(req, res, next) {
  if (!_.isEmpty(req.session.userInfo)) {
    next()
  } else {
    res.redirect('/admin/login')
  }
}
 

// 该路由使用的中间件
// router.use((req, res, next) => {
//   langConfig = require("../config/lang_config")(req);
//   next();
// });

//权限判断
function checkUserPower(req, res, next) {
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
        let userPowerList = req.session.powerList;
        for(let i = 0; i < userPowerList.length; i++){
        	if(powerCode == userPowerList[i]){
        		isPower = true;
        		break;
        	}
        }

        if(isPower){
        	next();
        }else{
        	res.render('nopower',{
               userInfo: req.session.userInfo   //登录者个人信息
            });
        }
	}
}



//后台登录页面
router.get('/login', (req, res) => {
	res.render('login',{layout: null});
});


//员工管理页面
router.get('/employees', checkUserSession, Employee.page_Employees);

//创建员工页面
router.get('/employees/create', Employee.page_CreateEmployee);





//部门管理页面
router.get('/departments', checkUserSession, checkUserPower, Department.page_Departments);

//创建部门页面
router.get('/departments/create', checkUserSession, checkUserPower, Department.page_CreateDepartment);

//修改部门信息页面
router.get('/departments/edit', checkUserSession, checkUserPower,Department.page_EditDepartment);






//角色管理页面
router.get('/roles', checkUserSession, Role.page_Roles);

//创建角色页面
router.get('/roles/create', checkUserSession, Role.page_CreateRole);

//修改角色信息页面
router.get('/roles/edit', checkUserSession, Role.page_EditRole);





//客房管理页面
router.get('/rooms', checkUserSession, Room.page_Rooms);

//添加客房页面
router.get('/rooms/create', checkUserSession, Room.page_createRoom);

//编辑客房页面
router.get('/rooms/edit', checkUserSession, Room.page_editRoom);





//客房类型管理页面
router.get('/roomtypes', checkUserSession, Room.page_RoomTypes);

//创建客房类型页面
router.get('/roomtypes/create', checkUserSession, Room.page_CreateRoomType);

//编辑客房类型信息页面
router.get('/roomtypes/edit', checkUserSession, Room.page_EditRoomType);






//物品管理页面
router.get('/articles', checkUserSession, RoomArticle.page_Articles);

//创建物品页面
router.get('/articles/create', checkUserSession, RoomArticle.page_CreateArticle);

//修改物品信息页面
router.get('/articles/edit', checkUserSession, RoomArticle.page_EditArticle);





//任务管理页面
router.get('/tasks', checkUserSession, Task.page_tasks);

//创建任务页面
router.get('/tasks/create', checkUserSession, Task.page_createTask);

//任务链管理页面
router.get('/taskchains', checkUserSession, Task.page_taskChain);




module.exports = router;