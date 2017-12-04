const isProd = process.env.NODE_ENV === 'production';
global.NODE_ENV = isProd;

const fs = require('fs');
const path = require('path')
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

let logUtil = require("./utils/logUtil");



//引入api路由
const router_api = require('./router/api')
const router_manage = require('./router/manage')


module.exports = () => {
	console.log('int express...');
    let app = express();
    
    // 引用 handlebars 模板引擎
    // app.set('views', path.join(__dirname, 'dist'))
    // app.engine('.html', require('ejs').__express)
    // app.set('view engine', 'ejs')


    // let handlebars = require('express3-handlebars').create({ 
    //                 defaultLayout:'main' ,
    //                 helpers: hbsHelper
    //              });
    // app.engine('handlebars', handlebars.engine);
    // app.set('view engine', 'handlebars');


    app.use(express.static(path.join(__dirname, 'public')));


    // body 解析中间件
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    
    // cookie 解析中间件
    app.use(cookieParser('sessionHotel'));
    // session配置
    app.use(session({
        secret: 'sessionHotel',  //服务器端生成session的签名,与cookieParser中的一致
        resave: true,   //(是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存,默认为true
        saveUninitialized: true  //初始化session时是否保存到存储,默认为true
    }));
    
    

    //api路由
    app.use('/api',router_api);
    app.use('/manage',router_manage);

    // 404 处理（api接口）
    app.get('/api/*', (req, res) => {
      res.status(404);
      res.send('404 - Not Found');
    }) 

    // 404 页面
    app.get('*', (req, res) => {
      let Page404 = `
        <div style="text-align:center">
            <h3 style="width: 25%;font-size: 12rem;color: #409eff;margin: 0 auto;margin-top: 10%;">404</h3>
            <div style="font-size: 15px;color: #878d99;">太调皮辣，不过我喜欢...哼哼11111 😏👽 &nbsp;<a href="/">返回首页</a></div>
        </div>
      `
      res.send(Page404)
    })

    // 定制 500 页面
    app.use((err, req, res, next) => {
        console.error(err.stack);
        
        res.status(err.status || 500)
        res.send(err.message)
    });



    

    return app;
}