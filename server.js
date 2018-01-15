const isProd = process.env.NODE_ENV === 'production';
global.NODE_ENV = isProd;

const fs = require('fs');
const path = require('path')
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

let logUtil = require("./utils/logUtil");
const staticSetting = require("./config/staticSetting");
const hbsHelper = require('./utils/hbsHelper');



//引入api路由
const router_api = require('./router/api')
const router_page = require('./router/page')


module.exports = () => {
	console.log('int express...');
    let app = express();
    
    // 引用 handlebars 模板引擎
    let handlebars = require('express3-handlebars').create({ 
                    defaultLayout:'main' ,
                    helpers: hbsHelper
                 });
    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');

    app.use('/admin', express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'public')));
    






    // body 解析中间件
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    
    // cookie 解析中间件
    app.use(cookieParser(staticSetting.session_secret));
    // session配置
    app.use(session({
        secret: staticSetting.session_secret,  //服务器端生成session的签名,与cookieParser中的一致
        resave: true,   //(是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存,默认为true
        saveUninitialized: true  //初始化session时是否保存到存储,默认为true
    }));



    //api路由   
    app.use('/api',router_api);

    
    app.use('/admin',router_page);




    // 404 处理（api接口）
    app.get('/api/*', (req, res) => {
      res.status(404);
      res.send('404 - Not Found');
    }) 

    // 404 页面
    app.get('*', (req, res) => {
      res.render('page404',{layout: null})
    })

    // 定制 500 页面
    app.use((err, req, res, next) => {
        console.error(err.stack);     
        res.status(err.status || 500)
        // res.send(err.message)
        res.render('page500',{layout: null})
    });



    

    return app;
}