/**
 * page
 * 
 */
const express = require('express');
const router = express.Router();


const { Employee } = require('../controller');
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

//客房管理页面
router.get('/rooms', checkUserSession, (req, res) => {
	res.render('rooms');
});

//客房类型管理页面
router.get('/roomtypes', (req, res) => {
	res.render('roomTypes');
});

//物品管理页面
router.get('/articles', (req, res) => {
	res.render('articles');
});

//部门管理页面
router.get('/departments', (req, res) => {
	res.render('departments');
});




module.exports = router;