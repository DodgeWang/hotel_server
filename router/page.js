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
    res.redirect('/page/login')
  }
}
 

// 该路由使用的中间件
router.use((req, res, next) => {
  langConfig = require("../config/lang_config")(req);
  next();
});


//登录页面
router.get('/login', (req,res) => {
	res.send('login');
});

//获取员工信息列表
router.get('/list', checkUserSession, (req,res) => {
	res.send('/list');
});




module.exports = router;