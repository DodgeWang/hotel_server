
/**
 * api
 * 
 */
const express = require('express');
const router = express.Router();

const {User} = require('../controller');



//用户登录
router.get('/users/doLogin',User.loginAction);

// 用户注销
router.get('/users/logOut', User.logOut);






module.exports = router;