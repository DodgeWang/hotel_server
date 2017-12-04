/**
 * api
 * 
 */
const express = require('express');
const router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// 定义网站主页的路由
router.get('/', (req, res) => {
  res.send('manage home');
});
// 定义 about 页面的路由
router.get('/about', (req, res) => {
  res.send('About manage');
});

module.exports = router;