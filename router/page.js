/**
 * page
 * 
 */
const express = require('express');
const router = express.Router();


const { Employee, Room, Department, Role, RoomArticle, Task } = require('../controller');
const _ = require('lodash');
let langConfig = {};



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



//后台登录页面
router.get('/login', (req, res) => {
	res.render('login',{layout: null});
});

//员工管理页面
router.get('/employees', checkUserSession, Employee.page_Employees);

//创建员工页面
router.get('/employees/create', Employee.page_CreateEmployee);





//部门管理页面
router.get('/departments', checkUserSession, (req, res) => {
	res.render('departments');
});

//创建部门页面
router.get('/departments/create', (req, res) => {
	res.render('createDepartment');
});

//修改部门信息页面
router.get('/departments/edit', Department.page_EditDepartment);






//角色管理页面
router.get('/roles', (req, res) => {
	res.render('roles');
});

//创建角色页面
router.get('/roles/create', (req, res) => {
	res.render('createRole');
});

//修改角色信息页面
router.get('/roles/edit', Role.page_EditRole);








//客房管理页面
router.get('/rooms',Room.page_Rooms);

//添加客房页面
router.get('/rooms/create', Room.page_createRoom);

//编辑客房页面
router.get('/rooms/edit', Room.page_editRoom);






//客房类型管理页面
router.get('/roomtypes', (req, res) => {
	res.render('roomTypes');
});

//创建客房类型页面
router.get('/roomtypes/create', (req, res) => {
	res.render('createRoomType');
});

//编辑客房类型信息页面
router.get('/roomtypes/edit', Room.page_EditRoomType);






//物品管理页面
router.get('/articles', (req, res) => {
	res.render('articles');
});

//创建物品页面
router.get('/articles/create', (req, res) => {
	res.render('createArticle');
});

//修改物品信息页面
router.get('/articles/edit', RoomArticle.page_EditArticle);




//任务管理页面
router.get('/tasks', (req, res) => {
	res.render('tasks');
});

//创建任务页面
router.get('/tasks/create', Task.page_createTask);

//任务链管理页面
router.get('/taskchains', (req, res) => {
	res.render('taskChain');
});




module.exports = router;