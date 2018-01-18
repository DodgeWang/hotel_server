/**
 * page
 * 
 */
const express = require('express');
const router = express.Router();


const { Employee, Room } = require('../controller');
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
router.get('/employees/create', (req, res) => {
	res.render('createEmployee');
});

//部门管理页面
router.get('/departments', (req, res) => {
	res.render('departments');
});

//创建部门页面
router.get('/departments/create', (req, res) => {
	res.render('createDepartment');
});

//角色管理页面
router.get('/roles', (req, res) => {
	res.render('roles');
});

//创建角色页面
router.get('/roles/create', (req, res) => {
	res.render('createRole');
});

//客房管理页面
// router.get('/rooms', checkUserSession, (req, res) => {
// 	res.render('rooms');
// });
router.get('/rooms', Room.page_Rooms);

//客房类型管理页面
router.get('/roomtypes', (req, res) => {
	res.render('roomTypes');
});

//创建客房类型页面
router.get('/roomtypes/create', (req, res) => {
	res.render('createRoomType');
});

//物品管理页面
router.get('/articles', (req, res) => {
	res.render('articles');
});






module.exports = router;